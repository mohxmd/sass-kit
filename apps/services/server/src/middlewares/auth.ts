import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";
import { auth } from "@repo/foundation/auth/index";

import type { AppEnv } from "@/lib/init-app";

export const requireAuth = createMiddleware<AppEnv>(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!session) {
    c.set("user", null);
    c.set("session", null);
    throw new HTTPException(401, {
      message: "Unauthorized",
    });
  }
  c.set("user", session.user);
  c.set("session", session.session);
  return next();
});
