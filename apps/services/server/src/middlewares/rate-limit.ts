import type { Context } from "hono";
import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";

const RATE_LIMIT_PASSED_KEY = "rate_limit_passed";
const store = new Map<string, { count: number; resetTime: number }>();

type RateLimiterOptions = {
  windowMs: number;
  limit: number;
  standardHeaders?: "draft-6" | "draft-7";
  message?: string;
  keyGenerator?: (c: Context) => string;
};

const defaultKeyGenerator = (c: Context): string => {
  return c.req.header("x-forwarded-for") || c.req.header("x-real-ip") || "anonymous";
};

export const rateLimiter = ({
  windowMs,
  limit,
  standardHeaders,
  message = "Too many requests",
  keyGenerator = defaultKeyGenerator,
}: RateLimiterOptions) => {
  return createMiddleware(async (c, next) => {
    const key = keyGenerator(c);

    if (!key) {
      throw new HTTPException(400, { message: "Missing rate limit key" });
    }

    const now = Date.now();
    let rateLimitData = store.get(key);

    // Reset if window expired
    if (!rateLimitData || now > rateLimitData.resetTime) {
      rateLimitData = { count: 0, resetTime: now + windowMs };
      store.set(key, rateLimitData);
    }

    rateLimitData.count++;

    // Set standard headers
    if (standardHeaders) {
      c.res.headers.set("X-RateLimit-Limit", limit.toString());
      c.res.headers.set(
        "X-RateLimit-Remaining",
        Math.max(0, limit - rateLimitData.count).toString(),
      );
      c.res.headers.set("X-RateLimit-Reset", new Date(rateLimitData.resetTime).toISOString());
    }

    const success = rateLimitData.count <= limit;
    c.set(RATE_LIMIT_PASSED_KEY, success);

    if (!success) {
      throw new HTTPException(429, { message });
    }

    await next();
  });
};

export const hasPassedRateLimit = (c: Context): boolean => {
  return c.get(RATE_LIMIT_PASSED_KEY) ?? false;
};
