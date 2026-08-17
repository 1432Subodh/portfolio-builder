import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = await getDb();
  const projects = await db
    .collection("projects")
    .find({ userId: new ObjectId(session.user.id) })
    .sort({ updatedAt: -1 })
    .toArray();

  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, template } = body;

  if (!name) {
    return NextResponse.json({ error: "Project name is required" }, { status: 400 });
  }

  const db = await getDb();
  const now = new Date();
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const result = await db.collection("projects").insertOne({
    userId: new ObjectId(session.user.id),
    name,
    slug: `${slug}-${Date.now()}`,
    template: template || "blank",
    sections: [],
    settings: {},
    published: false,
    createdAt: now,
    updatedAt: now,
  });

  return NextResponse.json({ _id: result.insertedId }, { status: 201 });
}
