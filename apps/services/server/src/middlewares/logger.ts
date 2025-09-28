import type { MiddlewareHandler } from "hono";
import { createLogger, type LoggerOptions } from "@repo/foundation/utils/logger";

export const logger = (options: LoggerOptions = {}): MiddlewareHandler => {
  const log = createLogger(options);

  return async (c, next) => {
    const start = Date.now();
    const { method, url } = c.req;

    log.info(`→ ${method} ${url}`);

    c.set("logger", log);
    await next();

    const time = Date.now() - start;
    const status = c.res.status;

    if (status >= 500) {
      log.error(`← ${method} ${url} ${status} ${time}ms`);
    } else if (status >= 400) {
      log.warn(`← ${method} ${url} ${status} ${time}ms`);
    } else {
      log.success(`← ${method} ${url} ${status} ${time}ms`);
    }
  };
};
