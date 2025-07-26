import { Hono } from "hono";
import { authMiddleware } from "../auth/AuthMiddleWare.js";
import { zValidator } from "@hono/zod-validator";
import { tweetlikeSchema, type TweetLike } from "./likes.dto.js";
export const tweetLikesRouter = new Hono()
  .basePath("likes")
  .use(authMiddleware)
  .post("/", zValidator("json", tweetlikeSchema), async (c) => {
    const body: TweetLike = await c.req.json();
    return c.json(,200);
  })
  .get("/:id", async (c) => {
    const id = parseInt(c.req.param("id"));
    return c.json();
  });
