import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import ws from "ws";

import env from "@/env";

neonConfig.webSocketConstructor = ws;

let _db: ReturnType<typeof drizzle>;

/**
 * Lazily initialize the DB if not already done.
 */
export function initDatabase(dbUrl: string) {
  if (_db) {
    return _db;
  }
  const sql = neon(dbUrl);
  _db = drizzle(sql);
  return _db;
}

/**
 * Get the current DB instance safely.
 */
export function getDb() {
  if (!_db) {
    throw new Error("Database not initialized");
  }
  return _db;
}

export type DB = ReturnType<typeof getDb>;

/**
 * Eager singleton for convenience in apps/services.
 * This runs once at module load using env.DATABASE_URL.
 */
export const db: DB = initDatabase(env.DATABASE_URL);
