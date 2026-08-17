/**
 * Unified MongoDB connection — db.ts
 *
 * The standard mongodb+srv:// URI requires a DNS SRV record lookup that some
 * ISP/network configurations refuse (ECONNREFUSED on the SRV query).
 *
 * Fix: manually resolve the SRV + TXT records with a custom DNS Resolver
 * pointed at Google (8.8.8.8) and build a plain mongodb:// URI so the driver
 * never touches the system DNS for SRV lookups.
 */
import dns from "node:dns";
import { Resolver } from "node:dns/promises";
import { MongoClient, ServerApiVersion, type Db } from "mongodb";

// ── Override system-wide DNS resolver ───────────────────────────────────────
// This affects Node's built-in dns module but NOT the custom Resolver below.
// We set it anyway as a safety net.
dns.setServers(["8.8.8.8", "1.1.1.1", "8.8.4.4"]);

const RAW_MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || "profilio";

if (!RAW_MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable in .env.local"
  );
}

// ── SRV resolver ─────────────────────────────────────────────────────────────

/**
 * If the URI is mongodb+srv://, manually resolve the SRV + TXT records using
 * Google's public DNS and return a standard mongodb:// URI.
 *
 * This completely sidesteps the system DNS and the driver's own SRV handling,
 * eliminating "querySrv ECONNREFUSED" errors.
 */
async function resolveUri(srvUri: string): Promise<string> {
  if (!srvUri.startsWith("mongodb+srv://")) {
    return srvUri; // already a standard URI — use as-is
  }

  const parsed = new URL(srvUri);
  const hostname = parsed.hostname; // e.g. cluster0.vl0vvmw.mongodb.net
  const dbName = parsed.pathname.replace(/^\//, "") || MONGODB_DB;

  // Custom resolver → Google DNS (bypasses ISP DNS)
  const resolver = new Resolver();
  resolver.setServers(["8.8.8.8:53", "1.1.1.1:53", "8.8.4.4:53"]);

  // 1. Resolve SRV records (_mongodb._tcp.<hostname>)
  const srvRecords = await resolver.resolveSrv(`_mongodb._tcp.${hostname}`);
  if (!srvRecords.length) {
    throw new Error(`No SRV records returned for ${hostname}`);
  }

  // 2. Resolve TXT records (optional — Atlas uses these for replicaSet + authSource)
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
    // TXT records are optional; keep defaults
  }

  // 3. Build the resolved standard URI
  const hosts = srvRecords
    .sort((a, b) => a.priority - b.priority || a.weight - b.weight)
    .map((r) => `${r.name}:${r.port}`)
    .join(",");

  const auth =
    parsed.username
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
    qs.set("appName", parsed.searchParams.get("appName")!);
  }

  const resolvedUri = `mongodb://${auth}${hosts}/${dbName}?${qs.toString()}`;
  console.log("[db] Resolved SRV → standard URI (hosts redacted for security)");
  return resolvedUri;
}

// ── MongoClient singleton ─────────────────────────────────────────────────────

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

async function createClientPromise(): Promise<MongoClient> {
  const uri = await resolveUri(RAW_MONGODB_URI!);

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
    connectTimeoutMS: 20000,
    socketTimeoutMS: 45000,
    serverSelectionTimeoutMS: 20000,
    maxPoolSize: 10,
    minPoolSize: 1,
  });

  return client.connect();
}

// Persist across HMR in development; fresh promise per cold-start in production
const clientPromise: Promise<MongoClient> =
  globalThis._mongoClientPromise ?? createClientPromise();

if (process.env.NODE_ENV !== "production") {
  globalThis._mongoClientPromise = clientPromise;
}

// ── Public helpers ────────────────────────────────────────────────────────────

/** Returns the connected MongoClient — used by the NextAuth adapter. */
export async function getClient(): Promise<MongoClient> {
  return clientPromise;
}

/** Returns the application database. Use this in API routes. */
export async function getDb(): Promise<Db> {
  const client = await clientPromise;
  return client.db(MONGODB_DB);
}

/** Alias for backwards compatibility with routes that called connectDb(). */
export async function connectDb(): Promise<MongoClient> {
  return clientPromise;
}

/** Returns connection status — used by the health-check endpoint. */
export async function getConnectionStatus(): Promise<{
  connected: boolean;
  database?: string;
  reason?: string;
}> {
  try {
    const client = await clientPromise;
    await client.db("admin").command({ ping: 1 });
    return { connected: true, database: MONGODB_DB };
  } catch (error) {
    return {
      connected: false,
      reason:
        error instanceof Error ? error.message : "Unknown connection error",
    };
  }
}

export default clientPromise;
