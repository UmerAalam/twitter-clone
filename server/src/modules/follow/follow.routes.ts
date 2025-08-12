import { Hono } from "hono";
import { authMiddleware } from "../auth/AuthMiddleWare.js";
import { zValidator } from "@hono/zod-validator";
import { followSchema, type Follow } from "./follow.dto.js";
import { findFollowers, postFollow } from "./follow.service.js";
export const followsRouter = new Hono()
  .basePath("follows")
  .use(authMiddleware)
  .post("/", zValidator("json", followSchema), async (c) => {
    const { followerId, followingId, createdAt }: Follow = await c.req.json();
    const post = await postFollow({ followerId, followingId, createdAt });
    return c.json(post);
  })
  .get("/", zValidator("query", followSchema), async (c) => {
    const { followerId, createdAt, followingId }: Follow =
      c.req.query("follow");
    const followers = await findFollowers({ followerid });
    return c.json(followers);
  });
