import type { BetterAuthOptions } from "better-auth";
import { admin, openAPI, organization } from "better-auth/plugins";

// ORGANIZATION PLUGIN
const organizationPlugin = organization({});

// ADMIN PLUGIN
const adminPlugin = admin({
  bannedUserMessage: "You have been banned from this application",
});

// OPENAPI PLUGIN
const openAPIPlugin = openAPI();

export const plugins: BetterAuthOptions["plugins"] = [
  organizationPlugin,
  adminPlugin,
  openAPIPlugin,
];
