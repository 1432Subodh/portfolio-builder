/**
 * Seeds the initial superadmin into the "admin" collection.
 *
 * Usage: npm run seed:admin
 *
 * Reads MONGODB_URI / MONGODB_DB from .env.local (falls back to process.env)
 * and upserts the superadmin account created with (test@subodh.com / Admin@123).
 */
import dns from "node:dns";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Resolver } from "node:dns/promises";
import bcrypt from "bcryptjs";
import { MongoClient, ServerApiVersion } from "mongodb";

dns.setServers(["8.8.8.8", "1.1.1.1", "8.8.4.4"]);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

function loadEnv() {
  const envPath = path.join(ROOT, ".env.local");
  const env = {};
  if (fs.existsSync(envPath)) {
    for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
      if (m && !(m[1] in env)) {
        let val = m[2].trim();
        if (
          (val.startsWith('"') && val.endsWith('"')) ||
          (val.startsWith("'") && val.endsWith("'"))
        ) {
          val = val.slice(1, -1);
        }
        env[m[1]] = val;
      }
    }
  }
  return { ...env, ...process.env };
}

const env = loadEnv();
const RAW_URI = env.MONGODB_URI;
const MONGODB_DB = env.MONGODB_DB || "profilio";

if (!RAW_URI) {
  console.error("[seed] ERROR: MONGODB_URI not found in .env.local");
  process.exit(1);
}

async function resolveUri(srvUri) {
  if (!srvUri.startsWith("mongodb+srv://")) return srvUri;

  const parsed = new URL(srvUri);
  const hostname = parsed.hostname;
  const resolver = new Resolver();
  resolver.setServers(["8.8.8.8:53", "1.1.1.1:53", "8.8.4.4:53"]);

  const srvRecords = await resolver.resolveSrv(`_mongodb._tcp.${hostname}`);
  if (!srvRecords.length) throw new Error(`No SRV records for ${hostname}`);

  let replicaSet = "";
  let authSource = "admin";
  try {
    const txtRecords = await resolver.resolveTxt(hostname);
    for (const parts of txtRecords) {
      const p = new URLSearchParams(parts.join(""));
      replicaSet = p.get("replicaSet") ?? replicaSet;
      authSource = p.get("authSource") ?? authSource;
    }
  } catch {
    /* TXT is optional */
  }

  const hosts = srvRecords
    .sort((a, b) => a.priority - b.priority || a.weight - b.weight)
    .map((r) => `${r.name}:${r.port}`)
    .join(",");

  const auth = parsed.username
    ? `${encodeURIComponent(parsed.username)}:${encodeURIComponent(parsed.password)}@`
    : "";

  const qs = new URLSearchParams({
    tls: "true",
    authSource,
    retryWrites: parsed.searchParams.get("retryWrites") ?? "true",
    w: parsed.searchParams.get("w") ?? "majority",
  });
  if (replicaSet) qs.set("replicaSet", replicaSet);
  if (parsed.searchParams.get("appName")) {
    qs.set("appName", parsed.searchParams.get("appName"));
  }

  return `mongodb://${auth}${hosts}/${MONGODB_DB}?${qs.toString()}`;
}

async function main() {
  const uri = await resolveUri(RAW_URI);
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
    connectTimeoutMS: 20000,
    socketTimeoutMS: 45000,
    serverSelectionTimeoutMS: 20000,
  });

  await client.connect();
  const db = client.db(MONGODB_DB);

  const email = "test@subodh.com";
  const password = "Admin@123";
  const name = "Subodh";

  const existing = await db.collection("admin").findOne({ email });
  const hashed = await bcrypt.hash(password, 12);
  const now = new Date();

  if (existing) {
    await db.collection("admin").updateOne(
      { email },
      {
        $set: {
          name,
          role: "superadmin",
          isActive: true,
          updatedAt: now,
          ...(existing.password ? {} : { password: hashed }),
        },
      }
    );
    console.log(`[seed] Updated superadmin: ${email}`);
  } else {
    await db.collection("admin").insertOne({
      email,
      name,
      password: hashed,
      role: "superadmin",
      isActive: true,
      createdAt: now,
      updatedAt: now,
    });
    console.log(`[seed] Created superadmin: ${email}`);
  }

  console.log(`[seed] Password: Admin@123 (change it after first login)`);
  await client.close();
}

main().catch((err) => {
  console.error("[seed] Failed:", err.message);
  process.exit(1);
});