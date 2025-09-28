import type { BetterAuthOptions } from "better-auth";

import env from "@/env";

export const authOptions = {
  appName: "sass-kit",
  trustedOrigins: [],
  advanced: {
    database: {
      generateId: false,
    },
    defaultCookieAttributes: {
      sameSite: "lax",
      secure: env.NODE_ENV === "production",
      httpOnly: true,
    },
    cookiePrefix: "sass-app",
    useSecureCookies: env.NODE_ENV === "production",
    crossSubDomainCookies: {
      enabled: true,
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 8,
    requireEmailVerification: true,
  },
  socialProviders: {
    // google: {
    //   clientId: env.GOOGLE_CLIENT_ID,
    //   clientSecret: env.GOOGLE_CLIENT_SECRET,
    // },
  },
  user: {
    additionalFields: {},
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // cache duration in seconds
    },
  },
  account: {
    accountLinking: { enabled: true },
  },
} satisfies BetterAuthOptions;
