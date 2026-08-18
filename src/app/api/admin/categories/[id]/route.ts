import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
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

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const g = await guard();
  if (g) return g;

  const { id } = await params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const body = await req.json();
  const db = await getDb();
  const existing = await db
    .collection("component_categories")
    .findOne({ _id: new ObjectId(id) });
  if (!existing) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  const patch: Record<string, unknown> = {};

  if (typeof body.name === "string" && body.name.trim()) {
    const name = body.name.trim();
    const slug = slugify(name);
    const clash = await db.collection("component_categories").findOne({
      slug,
      _id: { $ne: new ObjectId(id) },
    });
    if (clash) {
      return NextResponse.json(
        { error: "A category already exists with this name" },
        { status: 409 }
      );
    }
    patch.name = name;
    patch.slug = slug;
  }
  if (typeof body.description === "string") {
    patch.description = body.description.trim();
  }
  if (typeof body.isActive === "boolean") {
    patch.isActive = body.isActive;
  }

  if (!Object.keys(patch).length) {
    return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
  }

  patch.updatedAt = new Date();
  await db
    .collection("component_categories")
    .updateOne({ _id: new ObjectId(id) }, { $set: patch });

  const updated = await db
    .collection("component_categories")
    .findOne({ _id: new ObjectId(id) });
  if (!updated) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }
  return NextResponse.json(serialize(updated));
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const g = await guard();
  if (g) return g;

  const { id } = await params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const db = await getDb();
  const target = await db
    .collection("component_categories")
    .findOne({ _id: new ObjectId(id) });
  if (!target) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  const components = await db
    .collection("components")
    .countDocuments({ categoryId: new ObjectId(id) });
  if (components > 0) {
    return NextResponse.json(
      { error: `Category has ${components} component(s); reassign or delete them first` },
      { status: 400 }
    );
  }

  await db.collection("component_categories").deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ ok: true });
}
