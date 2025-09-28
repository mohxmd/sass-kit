import type { NotFoundHandler } from "hono";

export const notFound: NotFoundHandler = (c) => {
  return c.json({ message: `Not found - ${c.req.path}` }, 404);
};
