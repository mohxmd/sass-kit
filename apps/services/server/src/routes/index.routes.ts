import { createRouter } from "@/lib/init-app";

export default createRouter()
  .get("/", (c) => {
    return c.text("OK");
  })
  .get("/hello", (c) => {
    c.var.logger.info("Hello");
    return c.json({ message: "Hello Hono!" }, 200);
  });
