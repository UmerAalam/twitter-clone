import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { authMiddleware } from "../auth/AuthMiddleWare.js";
import { userIdScheme, type UserID } from "./user.dto.js";
import { findUserById } from "./user.service.js";
export const usersRouter = new Hono()
  .basePath("users")
  .use(authMiddleware)
  .get("/", zValidator("json", userIdScheme), async (c) => {
    const { id }: UserID = await c.req.json();
    const userData = await findUserById({ id });
    console.log(userData);
    return c.json(userData);
  });
