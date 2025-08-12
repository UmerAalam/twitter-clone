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
  .get("/", async (c) => {
    const followerId = c.req.query("followerId");
    const followingId = c.req.query("followingId");
    if (followerId === undefined) {
      return c.text("Follower Id is undefined");
    } else if (followingId === undefined) {
      return c.text("Following Id is undefined");
    }
    const followers = await findFollowers({
      followerId: Number(followerId),
      followingId: Number(followingId),
    });
    return c.json(followers, 200);
  });
