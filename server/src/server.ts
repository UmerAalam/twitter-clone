import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { tweetsRouter } from "./controllers/tweets.js";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { authRouter } from "./controllers/auth.js";

const app = new Hono()
  .use(logger())
  .use(
    "/api",
    cors({
      origin: "http://localhost:3000",
      allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowHeaders: ["Content-Type", "Authorization"],
    }),
  )
  .route("/api", tweetsRouter)
  .route("/api", authRouter);

serve(
  {
    fetch: app.fetch,
    port: 8000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);

export default app;
