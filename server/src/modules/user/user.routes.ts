import { Hono } from "hono";
import { authMiddleware } from "../auth/AuthMiddleWare.js";
import { findUserById, findUsersByCount } from "./user.service.js";
import { zValidator } from "@hono/zod-validator";
import {
  userWithoutEmailScheme,
  userWithoutPasswordScheme,
  type UserWithoutEmail,
  type UserWithoutPassword,
} from "../auth/auth.dto.js";
import { userCountScheme } from "./user.dto.js";

export const usersRouter = new Hono()
  .basePath("users")
  .use(authMiddleware)
  .get("/:id", async (c) => {
    const paramId = c.req.param("id");
    const { id, avatar, created_at, name, updated_at }: UserWithoutPassword =
      await findUserById({ id: Number(paramId) });

    const userWithoutPassword = {
      id,
      avatar,
      created_at,
      name,
      updated_at,
    };

    return c.json(userWithoutPassword);
  })
  .get("/", zValidator("json", userCountScheme), async (c) => {
    const { userCount } = await c.req.json();
    const users: UserWithoutEmail[] = await findUsersByCount({ userCount });
    return c.json(users, 200);
  });
