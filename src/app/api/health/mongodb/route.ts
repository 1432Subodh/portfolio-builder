import { NextResponse } from "next/server";
import { getConnectionStatus, getDb } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const status = await getConnectionStatus();

    if (!status.connected) {
      return NextResponse.json(
        {
          ok: false,
          connected: false,
          message: "MongoDB connection is not established.",
          reason: status.reason ?? "Unknown MongoDB connection error",
        },
        { status: 503 }
      );
    }

    const db = await getDb();
    const result = await db.command({ ping: 1 });

    return NextResponse.json({
      ok: true,
      connected: true,
      database: db.databaseName,
      message: "MongoDB connection is working.",
      ping: result.ok,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown MongoDB error";

    return NextResponse.json(
      {
        ok: false,
        connected: false,
        message: "MongoDB connection failed.",
        reason: message,
      },
      { status: 500 }
    );
  }
}
