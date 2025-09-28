import type { BetterAuthOptions } from "better-auth";

export const hooks = {
  hooks: {},

  databaseHooks: {
    user: {},
    session: {},
  },
} satisfies BetterAuthOptions;
