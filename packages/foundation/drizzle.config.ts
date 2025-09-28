import type { Config } from "drizzle-kit";

import env from "./src/env";

const config: Config = {
  out: "./src/db/migrations",
  schema: "./src/db/schema/*",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  casing: "snake_case",
  strict: true,
  verbose: true,

  // extensionsFilters: ["postgis"],
};

export default config satisfies Config;
