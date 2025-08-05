import { Hono } from "hono";

import { authMiddleware } from "../auth/AuthMiddleWare.js";

export const awsRouter = new Hono()
  .basePath("upload")
  .use(authMiddleware)
  .post("/", async (c) => {
    const body = await c.req.json();
    return c.json(body, 201);
  });
