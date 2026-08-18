import { NextRequest, NextResponse } from "next/server";
import { auth, isAdminRole } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { slugify } from "@/lib/slug";

function serialize(doc: Record<string, unknown>) {
  const { _id, ...rest } = doc;
  return { id: String(_id), ...rest };
}

async function guard() {
  const session = await auth();
  if (!session?.user || !isAdminRole(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export async function GET() {
  const g = await guard();
  if (g) return g;

  const db = await getDb();
  const categories = await db
    .collection("component_categories")
    .find({})
    .sort({ sortOrder: 1, name: 1 })
    .toArray();

  return NextResponse.json(categories.map(serialize));
}

export async function POST(req: NextRequest) {
  const g = await guard();
  if (g) return g;

  const body = await req.json();
  const name = typeof body.name === "string" ? body.name.trim() : "";
  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const slug = slugify(name);
  const db = await getDb();
  const existing = await db.collection("component_categories").findOne({ slug });
  if (existing) {
    return NextResponse.json(
      { error: "A category already exists with this name" },
      { status: 409 }
    );
  }

  const now = new Date();
  const doc = {
    name,
    slug,
    description: typeof body.description === "string" ? body.description.trim() : "",
    isActive: body.isActive === false ? false : true,
    createdAt: now,
    updatedAt: now,
  };

  const result = await db.collection("component_categories").insertOne(doc);
  const created = await db.collection("component_categories").findOne({ _id: result.insertedId });
  return NextResponse.json(serialize(created ?? {}), { status: 201 });
}
