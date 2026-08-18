import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { auth, isAdminRole } from "@/lib/auth";
import { getDb } from "@/lib/db";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function requireAdmin() {
  const session = await auth();
  if (!session?.user || !isAdminRole(session.user.role)) {
    return { error: "Unauthorized" as const, status: 401 as const };
  }
  return { session };
}

function serialize(admin: Record<string, unknown>) {
  const { _id, ...rest } = admin;
  delete rest.password;
  return {
    id: String(_id),
    ...rest,
  };
}

export async function GET() {
  const guard = await requireAdmin();
  if ("error" in guard) {
    return NextResponse.json({ error: guard.error }, { status: guard.status });
  }

  const db = await getDb();
  const admins = await db
    .collection("admin")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json(admins.map(serialize));
}

export async function POST(req: NextRequest) {
  const guard = await requireAdmin();
  if ("error" in guard) {
    return NextResponse.json({ error: guard.error }, { status: guard.status });
  }

  const { name, email, password, role } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }
  if (!EMAIL_RE.test(email.trim())) {
    return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
  }
  const nextRole = role === "admin" ? "admin" : "superadmin";

  const db = await getDb();
  const existing = await db.collection("admin").findOne({ email: email.trim() });
  if (existing) {
    return NextResponse.json({ error: "Admin already exists with this email" }, { status: 409 });
  }

  const hashed = await bcrypt.hash(password, 12);
  const now = new Date();

  const result = await db.collection("admin").insertOne({
    name: name.trim(),
    email: email.trim(),
    password: hashed,
    role: nextRole,
    isActive: true,
    createdAt: now,
    updatedAt: now,
  });

  const created = await db.collection("admin").findOne({ _id: result.insertedId });
  return NextResponse.json(serialize(created ?? {}), { status: 201 });
}