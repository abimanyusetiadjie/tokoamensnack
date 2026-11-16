import { Pool, type QueryResultRow } from "pg";

declare global {
  var __amenSnackPgPool: Pool | undefined;
}

function getConnectionString(): string {
  return (process.env.DATABASE_URL || "").trim();
}

export function isDatabaseConfigured(): boolean {
  return Boolean(getConnectionString());
}

function getPool(): Pool {
  if (!globalThis.__amenSnackPgPool) {
    const connectionString = getConnectionString();
    if (!connectionString) {
      throw new Error("DATABASE_URL is not configured.");
    }
    const isLocal =
      connectionString.includes("localhost") ||
      connectionString.includes("127.0.0.1");

    globalThis.__amenSnackPgPool = new Pool({
      connectionString,
      ssl: isLocal ? false : { rejectUnauthorized: false },
      max: 10,
      idleTimeoutMillis: 20_000,
      connectionTimeoutMillis: 8_000,
    });

    globalThis.__amenSnackPgPool.on("error", (err) => {
      console.error("[Next.js PG Pool Error]", err.message);
    });
  }
  return globalThis.__amenSnackPgPool;
}

/**
 * Executes a parameterized PostgreSQL query against the shared Supabase Pooler.
 * Intended strictly for server-side Route Handlers and Server Components.
 */
export async function queryDb<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params: unknown[] = []
): Promise<T[]> {
  const client = await getPool().connect();
  try {
    const result = await client.query<T>(text, params);
    return result.rows;
  } finally {
    client.release();
  }
}
