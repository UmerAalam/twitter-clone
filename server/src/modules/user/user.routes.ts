import { Hono } from "hono";
import { authMiddleware } from "../auth/AuthMiddleWare.js";
import { findUserById } from "./user.service.js";

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
  });
