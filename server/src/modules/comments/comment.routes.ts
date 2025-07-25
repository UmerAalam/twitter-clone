import { Hono } from "hono";
import { authMiddleware } from "../auth/AuthMiddleWare.js";
import { findComments, postComment } from "./comment.service.js";
import { commentSchema, type TweetComment } from "./comment.dto.js";
import { zValidator } from "@hono/zod-validator";
export const commentsRouter = new Hono()
  .basePath("comments")
  .use(authMiddleware)
  .post("/", zValidator("json", commentSchema), async (c) => {
    const { text, tweetId, createdAt }: TweetComment = await c.req.json();
    const post = await postComment({ text, tweetId, createdAt });
    return post;
  })
  .get("/:id", async (c) => {
    const id = parseInt(c.req.param("id"));
    const comments = await findComments({ id });
    return c.json(comments);
  });
