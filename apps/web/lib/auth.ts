import type { ClientOptions } from "better-auth";
import { createAuthClient } from "better-auth/react";
import { toast } from "sonner";

export const authClient = createAuthClient({
  fetchOptions: {
    onError: (ctx) => {
      if (ctx.error.status === 429) {
        toast.error("Too many requests. Please try again later.");
      }
      console.error("BETTER AUTH ERROR", ctx.error);
    },
  },
}) as ClientOptions;
