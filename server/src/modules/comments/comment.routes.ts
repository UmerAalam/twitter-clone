import { Hono } from "hono";
import { authMiddleware } from "../auth/AuthMiddleWare.js";
import { findComments } from "./comment.service.js";
export const commentsRouter = new Hono()
  .basePath("comments")
  .use(authMiddleware)
  .get("/:id", async (c) => {
    const id = parseInt(c.req.param("id"));
    const comments = await findComments({ id });
    return c.json(comments);
  });
