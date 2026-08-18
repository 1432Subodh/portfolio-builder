import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  const db = await getDb();
  const categories = await db
    .collection("component_categories")
    .find({ isActive: { $ne: false } })
    .toArray();
  const catMap = new Map(
    categories.map((c) => [String(c._id), { id: String(c._id), name: c.name }])
  );

  const components = await db
    .collection("components")
    .find({ isActive: { $ne: false } })
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
