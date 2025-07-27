import { Hono } from "hono";
import { authMiddleware } from "../auth/AuthMiddleWare.js";
import { findUserById, findUsersByCount } from "./user.service.js";
import { zValidator } from "@hono/zod-validator";
import {
  userWithoutPasswordScheme,
  type UserWithoutPassword,
} from "../auth/auth.dto.js";

export const usersRouter = new Hono()
  .basePath("users")
  .use(authMiddleware)
  .get("/:id", async (c) => {
    const paramId = c.req.param("id");
    const { id, avatar, created_at, email, name, updated_at } =
      await findUserById({ id: Number(paramId) });

    const userWithoutPassword = {
      id,
      avatar,
      created_at,
      email,
      name,
      updated_at,
    };

    return c.json(userWithoutPassword);
  })
  .get("/", zValidator("json", userWithoutPasswordScheme), async (c) => {
    const { usersCount } = await c.req.json();
    const users = await findUsersByCount({
      usersCount,
    });

    return c.json(users, 200);
  });
