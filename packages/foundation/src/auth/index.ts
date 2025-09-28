import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { initDatabase } from "@/db/setup";
import env from "@/env";
import { createBetterAuth } from "./setup";

let _auth: ReturnType<typeof createBetterAuth>;

/**
 * Default singleton `auth` instance
 * — imported directly everywhere in your app/services
 */
export const auth = (() => {
  _auth = createBetterAuth({
    database: drizzleAdapter(initDatabase(env.DATABASE_URL), {
      provider: "pg",
    }),
  });
  return _auth;
})();

/**
 * Re-initialize `auth` manually (useful in tests / custom bootstraps)
 */
export function setAuth(
  config: Omit<Parameters<typeof createBetterAuth>[0], "database"> & {
    adapter: {
      drizzleDb: ReturnType<typeof initDatabase>;
      provider: Parameters<typeof drizzleAdapter>[1]["provider"];
    };
  },
) {
  _auth = createBetterAuth({
    database: drizzleAdapter(config.adapter.drizzleDb, {
      provider: config.adapter.provider,
    }),
    ...config,
  });
  return _auth;
}

/**
 * Safe getter for the current `auth` instance
 */
export function getAuth() {
  if (!_auth) {
    throw new Error("Auth not initialized");
  }
  return _auth;
}

export type Auth = typeof auth;
export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
