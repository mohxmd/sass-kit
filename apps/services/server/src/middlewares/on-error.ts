import type { ErrorHandler } from "hono";
import { HTTPException } from "hono/http-exception";
import { logger } from "@repo/foundation/utils/logger";

import env from "@/env";
import type { ErrorResponse } from "@/types";

export const onError: ErrorHandler = (err, c) => {
  const isFormError =
    err.cause && typeof err.cause === "object" && "form" in err.cause
      ? err.cause.form === true
      : false;

  logger.error("Error occurred:", {
    message: err.message,
    stack: err.stack,
    url: c.req.url,
    method: c.req.method,
    timestamp: new Date().toISOString(),
    ...(err instanceof HTTPException && {
      status: err.status,
      cause: err.cause,
      isFormError,
    }),
  });

  if (err instanceof HTTPException) {
    return (
      err.res ??
      c.json<ErrorResponse>(
        {
          success: false,
          error: err.message,
        },
        err.status,
      )
    );
  }

  return c.json<ErrorResponse>(
    {
      success: false,
      error: env.NODE_ENV === "production" ? "Internal server error" : (err.stack ?? err.message),
    },
    500,
  );
};
