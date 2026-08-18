import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import { auth, isAdminRole } from "@/lib/auth";
import { getDb } from "@/lib/db";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user || !isAdminRole(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const body = await req.json();
  const db = await getDb();

  const existing = await db.collection("admin").findOne({ _id: new ObjectId(id) });
  if (!existing) {
    return NextResponse.json({ error: "Admin not found" }, { status: 404 });
  }

  const isSuper = existing.role === "superadmin";
  const patch: Record<string, unknown> = {};

  if (typeof body.name === "string" && body.name.trim()) {
    patch.name = body.name.trim();
  }
  if (typeof body.email === "string" && body.email.trim()) {
    patch.email = body.email.trim();
  }
  if (typeof body.isActive === "boolean") {
    if (isSuper && body.isActive === false) {
      return NextResponse.json(
        { error: "A superadmin cannot be deactivated" },
        { status: 400 }
      );
    }
    patch.isActive = body.isActive;
  }
  if (body.role === "admin" || body.role === "superadmin") {
    if (isSuper && body.role !== "superadmin") {
      return NextResponse.json(
        { error: "The last superadmin role cannot be downgraded" },
        { status: 400 }
      );
    }
    patch.role = body.role;
  }
  if (typeof body.password === "string" && body.password.trim()) {
    if (body.password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }
    patch.password = await bcrypt.hash(body.password, 12);
  }

  if (!Object.keys(patch).length) {
    return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
  }

  patch.updatedAt = new Date();
  await db.collection("admin").updateOne({ _id: new ObjectId(id) }, { $set: patch });

  const updated = await db.collection("admin").findOne({ _id: new ObjectId(id) });
  if (!updated) {
    return NextResponse.json({ error: "Admin not found" }, { status: 404 });
  }

  const { _id, ...rest } = updated;
  delete rest.password;
  return NextResponse.json({ id: String(_id), ...rest });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user || !isAdminRole(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const db = await getDb();
  const target = await db.collection("admin").findOne({ _id: new ObjectId(id) });
  if (!target) {
    return NextResponse.json({ error: "Admin not found" }, { status: 404 });
  }

  if (target.role === "superadmin") {
    const superAdmins = await db
      .collection("admin")
      .countDocuments({ role: "superadmin" });
    if (superAdmins <= 1 || session.user.id === id) {
      return NextResponse.json(
        { error: "The last superadmin cannot be deleted" },
        { status: 400 }
      );
    }
  }

  await db.collection("admin").deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ ok: true });
}