import type { Context as HonoContext } from "hono";
import { getAuth } from "@repo/foundation/auth/index";

export type CreateContextOptions = {
  context: HonoContext;
};

export async function createContext({ context }: CreateContextOptions) {
  const auth = getAuth();
  const session = await auth.api.getSession({
    headers: context.req.raw.headers,
  });
  return {
    session,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
