import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { authMiddleware } from "../auth/AuthMiddleWare.js";
import { userIdScheme, type UserID } from "./user.dto.js";
import { findUserById } from "./user.service.js";
export const usersRouter = new Hono()
  .basePath("users")
  .use(authMiddleware)
  .get("/", zValidator("json", userIdScheme), async (c) => {
    const body: UserID = await c.req.json();
    const { id, avatar, created_at, email, name, updated_at } =
      await findUserById({ id: body.id });
    console.log("User data fetched");
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
