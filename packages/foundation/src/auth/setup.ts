import { type BetterAuthOptions, betterAuth } from "better-auth";

import { hooks } from "./hooks";
import { authOptions } from "./options";
import { plugins } from "./plugins";

export const createBetterAuth = (config: {
  database: BetterAuthOptions["database"];
}): ReturnType<typeof betterAuth> => {
  return betterAuth({
    database: config.database,
    ...authOptions,
    ...hooks,
    ...plugins,
  });
};
