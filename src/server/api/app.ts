import { Elysia } from "elysia";
import { errorPlugin } from "./errors";
import { healthRoute } from "./routes/health";

export const app = new Elysia({ prefix: "/api", aot: false })
  .use(errorPlugin)
  .use(healthRoute);

export type App = typeof app;
