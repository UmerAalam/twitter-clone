import { Hono } from "hono";
import { authMiddleware } from "../auth/AuthMiddleWare.js";
import { zValidator } from "@hono/zod-validator";
import {
  findfollowersSchema,
  findfollowingsSchema,
  followSchema,
  type Follow,
} from "./follow.dto.js";
import { findFollowers, findFollowings, postFollow } from "./follow.service.js";

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
    const { followerId }: Follow = await c.req.json();
    const post = await postFollow({
      followerId: Number(followerId),
      followingId: loggedInUser.id,
    });
    return c.json(post, 201);
  })
  .get("/", zValidator("query", findfollowersSchema), async (c) => {
    const userId = c.req.query("userId");
    const followers = await findFollowers(Number(userId));
    return c.json(followers, 200);
  })
  .get("/", zValidator("query", findfollowingsSchema), async (c) => {
    const userId = c.req.query("userId");
    const followers = await findFollowings(Number(userId));
    return c.json(followers, 200);
  });
