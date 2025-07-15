import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import {
  signInSchema,
  signUpSchema,
  type SignIn,
  type SignUp,
} from "../auth/auth.dto.js";
import { createUserPostgres, findUser } from "./auth.service.js";

export const authRouter = new Hono()
  .basePath("/auth")
  .post("/sign-up", zValidator("json", signUpSchema), async (c) => {
    const body: SignUp = await c.req.json();
    const createUser = await createUserPostgres(body);
    console.log(body);
    return c.json(createUser, 201);
  })
  .post("/sign-in", zValidator("json", signInSchema), async (c) => {
    const body: SignIn = await c.req.json();
    const user = await findUser(body);
    console.log(body);
    return c.json(user, 200);
  });
