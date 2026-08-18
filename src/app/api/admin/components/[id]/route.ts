import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { auth, isAdminRole } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { slugify } from "@/lib/slug";

async function guard() {
  const session = await auth();
  if (!session?.user || !isAdminRole(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
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
  const existing = await db.collection("components").findOne({ _id: new ObjectId(id) });
  if (!existing) {
    return NextResponse.json({ error: "Component not found" }, { status: 404 });
  }

  const patch: Record<string, unknown> = {};

  if (typeof body.name === "string" && body.name.trim()) {
    const name = body.name.trim();
    const slug = slugify(name);
    const clash = await db.collection("components").findOne({
      slug,
      _id: { $ne: new ObjectId(id) },
    });
    if (clash) {
      return NextResponse.json(
        { error: "A component already exists with this name" },
        { status: 409 }
      );
    }
    patch.name = name;
    patch.slug = slug;
  }
  if (typeof body.categoryId === "string") {
    if (!ObjectId.isValid(body.categoryId)) {
      return NextResponse.json({ error: "Invalid category id" }, { status: 400 });
    }
    const category = await db
      .collection("component_categories")
      .findOne({ _id: new ObjectId(body.categoryId) });
    if (!category) {
      return NextResponse.json({ error: "Component category not found" }, { status: 404 });
    }
    patch.categoryId = new ObjectId(body.categoryId);
  }
  if (typeof body.description === "string") {
    patch.description = body.description.trim();
  }
  if (typeof body.type === "string") {
    patch.type = body.type.trim();
  }
  if (typeof body.componentSlug === "string" && body.componentSlug.trim()) {
    patch.componentSlug = slugify(body.componentSlug);
  }
  if ("content" in body) {
    if (!isPlainObject(body.content)) {
      return NextResponse.json(
        { error: "Content must be a JSON object" },
        { status: 400 }
      );
    }
    patch.content = body.content;
  }
  if ("theme" in body) {
    if (!isPlainObject(body.theme)) {
      return NextResponse.json(
        { error: "Theme must be a JSON object" },
        { status: 400 }
      );
    }
    patch.theme = body.theme;
  }
  if (typeof body.isActive === "boolean") {
    patch.isActive = body.isActive;
  }

  if (!Object.keys(patch).length) {
    return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
  }

  patch.updatedAt = new Date();
  await db.collection("components").updateOne({ _id: new ObjectId(id) }, { $set: patch });

  const updated = await db.collection("components").findOne({ _id: new ObjectId(id) });
  if (!updated) {
    return NextResponse.json({ error: "Component not found" }, { status: 404 });
  }

  const categories = await db.collection("component_categories").find({}).toArray();
  const catMap = new Map(
    categories.map((c) => [String(c._id), { id: String(c._id), name: c.name }])
  );
  const { _id, categoryId, ...rest } = updated;
  const cid = categoryId ? String(categoryId) : null;
  return NextResponse.json({
    id: String(_id),
    categoryId: cid,
    category: cid ? (catMap.get(cid) ?? null) : null,
    ...rest,
  });
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
  const target = await db.collection("components").findOne({ _id: new ObjectId(id) });
  if (!target) {
    return NextResponse.json({ error: "Component not found" }, { status: 404 });
  }

  await db.collection("components").deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ ok: true });
}
