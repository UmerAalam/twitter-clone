import { Hono } from "hono";
import { authMiddleware } from "../auth/AuthMiddleWare.js";
import { findUserById, findUsersByCount } from "./user.service.js";
import { zValidator } from "@hono/zod-validator";
import {
  type UserWithoutEmail,
  type UserWithoutPassword,
} from "../auth/auth.dto.js";
import { userCountScheme } from "./user.dto.js";
import { findFollows } from "../follow/follow.service.js";

export const usersRouter = new Hono()
  .basePath("users")
  .use(authMiddleware)
  .get("/:id", async (c) => {
    const paramId = c.req.param("id");
    const getFollows = findFollows(Number(paramId));
    const {
      id,
      bio,
      avatar,
      created_at,
      name,
      updated_at,
    }: UserWithoutPassword = await findUserById({ id: Number(paramId) });

    const userWithoutPassword = {
      id,
      avatar,
      created_at,
      name,
      bio,
      updated_at,
      followersCount: (await getFollows).getFollowersCount,
      followingsCount: (await getFollows).getFollowingsCount,
    };

    return c.json(userWithoutPassword);
  })
  .get("/", zValidator("query", userCountScheme), async (c) => {
    const { userCount, page } = c.req.valid("query");
    const users: UserWithoutEmail[] = await findUsersByCount({
      userCount,
      page,
    });
    return c.json(users, 200);
  });
