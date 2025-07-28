import { Hono } from "hono";
import { authMiddleware } from "../auth/AuthMiddleWare.js";
import { zValidator } from "@hono/zod-validator";
import {
  tweetlikeSchema,
  deleteLikeSchema,
  type DeleteLike,
  type TweetLike,
} from "./likes.dto.js";
import { findLikes, postLike, deleteLike } from "./likes.service.js";
import type { Variables } from "../../types.js";

export const tweetLikesRouter = new Hono<{
  Variables: Variables;
}>()
  .basePath("likes")
  .use(authMiddleware)
  .post("/", zValidator("json", tweetlikeSchema), async (c) => {
    const body: TweetLike = await c.req.json();
    const userId = c.get("user").id;
    const post = postLike({ ...body, userId });
    return c.json(post, 201);
  })
  .delete("/", zValidator("json", deleteLikeSchema), async (c) => {
    const { tweetId }: DeleteLike = await c.req.json();
    const userId = c.get("user").id;
    const update = await deleteLike({ userId, tweetId });
    return c.json(update, 201);
  })
  .get("/", async (c) => {
    const { tweetId }: TweetLike = await c.req.json();
    const likesCount = await findLikes({ id: tweetId });
    return c.json(likesCount, 200);
  });
