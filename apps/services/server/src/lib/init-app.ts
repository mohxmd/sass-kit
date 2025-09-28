import { type Context, type Env, Hono } from "hono";
import { cors } from "hono/cors";
import { poweredBy } from "hono/powered-by";
import { prettyJSON } from "hono/pretty-json";
import { auth, type Session } from "@repo/foundation/auth/index";
import type { AppLogger } from "@repo/foundation/utils/logger";

import { emojiFavicon, logger, notFound, onError, rateLimiter } from "@/middlewares";

export type AppEnv = Env & {
  Bindings: { _: "" };
  Variables: {
    logger: AppLogger;
    user: Session["user"] | null;
    session: Session["session"] | null;
  };
};

export type AppContext = Context<AppEnv>;

export function createRouter() {
  return new Hono<AppEnv>();
}

export default function createApp() {
  const app = createRouter();

  app
    .use(poweredBy())
    .use(prettyJSON())
    .use(emojiFavicon("🚁"))
    .use(logger())
    .use(
      rateLimiter({
        windowMs: 15 * 60 * 1000,
        limit: 100,
        standardHeaders: "draft-6",
        message: "Take a coffee break ☕ — you're clicking too fast!",
        keyGenerator: (c) => c.req.header("x-real-ip") || "anonymous",
      }),
    )
    .use(
      "*",
      cors({
        origin: (origin, c) => {
          const url = new URL(c.req.url);
          const sameOrigin = `${url.protocol}//${url.host}`;
          if (origin === sameOrigin) return origin;
          c.var.logger.error("CORS blocked origin", { origin });
          return null;
        },
        allowMethods: ["GET", "POST", "OPTIONS"],
        allowHeaders: ["Content-Type", "Authorization"],
        credentials: true,
      }),
    );

  app.on(["POST", "GET"], "/api/auth/*", async (c) => {
    await auth.handler(c.req.raw);
  });

  app.notFound(notFound);
  app.onError(onError);

  return app;
}

/**
 * Creates a test app instance with the provided router mounted at root.
 * Used for testing individual routers in isolation.
 */
export function createTestApp(router: Hono<AppEnv>) {
  return createApp().route("/", router);
}
