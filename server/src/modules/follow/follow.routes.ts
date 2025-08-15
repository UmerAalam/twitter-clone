import { Hono } from "hono";
import { authMiddleware } from "../auth/AuthMiddleWare.js";
import { zValidator } from "@hono/zod-validator";
import {
  deleteFollowSchema,
  findfollowersSchema,
  findfollowingSchema,
  followersFollowingCountScheme,
  followSchema,
  type Follow,
} from "./follow.dto.js";
import {
  deleteFollow,
  findFollowersByUserID,
  findFollowingByUserID,
  findFollows,
  postFollow,
} from "./follow.service.js";

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
  .get("/followers", zValidator("query", findfollowersSchema), async (c) => {
    const { targetUser, page } = c.req.valid("query");
    const loggedInUser = c.get("user").id;
    const users = await findFollowersByUserID({
      targetUser: Number(targetUser),
      loggedInUser,
      page: page ? page : 1,
    });
    return c.json(users, 200);
  })
  .get("/following", zValidator("query", findfollowingSchema), async (c) => {
    const { targetUserId, page } = c.req.valid("query");
    const loggedInUser = c.get("user").id;
    const users = await findFollowingByUserID({
      targetUserId: Number(targetUserId),
      loggedInUser,
      page: page ? page : 1,
    });
    return c.json(users, 200);
  })
  .post("/", zValidator("json", followSchema), async (c) => {
    const loggedInUser = c.get("user");
    const { targetUser }: Follow = await c.req.json();
    if (loggedInUser.id === Number(targetUser)) {
      return c.json("You can't follow yourself", 400);
    }
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
