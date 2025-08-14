import { Hono } from "hono";
import { authMiddleware } from "../auth/AuthMiddleWare.js";
import { zValidator } from "@hono/zod-validator";
import {
  deleteFollowSchema,
  followersFollowingCountScheme,
  followSchema,
  type Follow,
} from "./follow.dto.js";
import { deleteFollow, findFollows, postFollow } from "./follow.service.js";

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
    const { targetUser }: Follow = await c.req.json();
    const post = await postFollow({
      targetUserId: Number(targetUser),
      loggedInUserId: loggedInUser.id,
    });
    return c.json(post, 201);
  })
  .get("/", zValidator("query", followersFollowingCountScheme), async (c) => {
    const userId = c.req.query("userId");
    const loggedInUser = c.get("user").id;
    const followers = await findFollows(loggedInUser, Number(userId));
    return c.json(followers, 200);
  })
  .delete("/", zValidator("query", deleteFollowSchema), async (c) => {
    const targetUser = c.req.query("targetUser");
    const loggedInUser = c.get("user").id;
    const followers = await deleteFollow({
      currentUserId: loggedInUser,
      targetUserId: Number(targetUser),
    });
    return c.json(followers, 200);
  });
// .get("/", zValidator("query", findfollowersSchema), async (c) => {
//   const userId = c.req.query("userId");
//   const followers = await findFollowers(Number(userId));
//   return c.json(followers, 200);
// })
// .get("/", zValidator("query", findfollowingsSchema), async (c) => {
//   const userId = c.req.query("userId");
//   const followers = await findFollowings(Number(userId));
//   return c.json(followers, 200);
// });
