import { Hono } from "hono";
import { authMiddleware } from "../auth/AuthMiddleWare.js";
import { zValidator } from "@hono/zod-validator";
import { followSchema, type Follow } from "./follow.dto.js";
import { findFollowers, postFollow } from "./follow.service.js";

interface MyVariables {
  user: {
    id: number;
  };
}

export const followRouter = new Hono<{
  Variables: MyVariables;
}>()
  .basePath("follows")
  .use(authMiddleware)
  .post("/", zValidator("json", followSchema), async (c) => {
    const loggedInUser = c.get("user");
    console.log(loggedInUser);
    const { followerId, createdAt }: Follow = await c.req.json();
    const post = await postFollow({
      followerId,
      followingId: loggedInUser.id,
      createdAt,
    });
    return c.json(post, 201);
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
