import createApp from "@/lib/init-app";
import index from "@/routes/index.routes.ts";

const app = createApp();

const routes = [index] as const;

routes.forEach((route) => {
  app.route("/", route);
});

export type AppType = (typeof routes)[number];

export default app;
