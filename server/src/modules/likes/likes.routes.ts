import { Hono } from "hono";
import { authMiddleware } from "../auth/AuthMiddleWare.js";
import { zValidator } from "@hono/zod-validator";
import {
  tweetlikeSchema,
  updateLikeSchema,
  type TweetLike,
  type UpdateLike,
} from "./likes.dto.js";
import { findLikes, postLike, updateLike } from "./likes.service.js";
export const tweetLikesRouter = new Hono()
  .basePath("likes")
  .use(authMiddleware)
  .post("/", zValidator("json", tweetlikeSchema), async (c) => {
    const body: TweetLike = await c.req.json();
    const post = postLike(body);
    return c.json(post, 201);
  })
  .patch("/", zValidator("json", updateLikeSchema), async (c) => {
    const { like, tweetId }: UpdateLike = await c.req.json();
    const update = await updateLike({ like, tweetId });
    return c.json(update, 201);
  })
  .get("/", async (c) => {
    const { tweetId }: TweetLike = await c.req.json();
    const likesCount = await findLikes({ id: tweetId });
    return c.json(likesCount, 200);
  });
