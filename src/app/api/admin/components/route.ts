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

export async function GET() {
  const g = await guard();
  if (g) return g;

  const db = await getDb();
  const categories = await db.collection("component_categories").find({}).toArray();
  const catMap = new Map(
    categories.map((c) => [String(c._id), { id: String(c._id), name: c.name }])
  );

  const components = await db
    .collection("components")
    .find({})
    .sort({ sortOrder: 1, name: 1 })
    .toArray();

  const rows = components.map((comp) => {
    const { _id, categoryId, ...rest } = comp;
    const cid = categoryId ? String(categoryId) : null;
    return {
      id: String(_id),
      categoryId: cid,
      category: cid ? (catMap.get(cid) ?? null) : null,
      ...rest,
    };
  });

  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const g = await guard();
  if (g) return g;

  const body = await req.json();
  const name = typeof body.name === "string" ? body.name.trim() : "";
  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const categoryId =
    typeof body.categoryId === "string" && ObjectId.isValid(body.categoryId)
      ? body.categoryId
      : null;
  if (!categoryId) {
    return NextResponse.json(
      { error: "A valid component category is required" },
      { status: 400 }
    );
  }

  const db = await getDb();
  const category = await db
    .collection("component_categories")
    .findOne({ _id: new ObjectId(categoryId) });
  if (!category) {
    return NextResponse.json({ error: "Component category not found" }, { status: 404 });
  }

  const slug = slugify(name);
  const existing = await db.collection("components").findOne({ slug });
  if (existing) {
    return NextResponse.json(
      { error: "A component already exists with this name" },
      { status: 409 }
    );
  }

  const now = new Date();
  const type = typeof body.type === "string" ? body.type.trim() : "";
  const doc = {
    categoryId: new ObjectId(categoryId),
    name,
    slug,
    componentSlug:
      typeof body.componentSlug === "string" && body.componentSlug.trim()
        ? slugify(body.componentSlug)
        : slugify(type || name),
    type,
    description: typeof body.description === "string" ? body.description.trim() : "",
    isActive: body.isActive === false ? false : true,
    content: isPlainObject(body.content) ? body.content : {},
    theme: isPlainObject(body.theme) ? body.theme : {},
    createdAt: now,
    updatedAt: now,
  };

  const result = await db.collection("components").insertOne(doc);
  const created = await db.collection("components").findOne({ _id: result.insertedId });
  const row = (created ?? {}) as Record<string, unknown>;
  const { _id, categoryId: storedCategoryId, ...rest } = row;
  return NextResponse.json(
    {
      id: String(_id),
      categoryId: storedCategoryId ? String(storedCategoryId) : null,
      category: { id: String(category._id), name: category.name },
      ...rest,
    },
    { status: 201 }
  );
}
