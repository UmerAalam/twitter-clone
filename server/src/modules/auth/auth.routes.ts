import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { signUpSchema, type SignUp } from "../auth/auth.dto.js";
import { createUserPostgres } from "./auth.service.js";
export const authRouter = new Hono()
  .basePath("auth")
  .post("/sign-up", zValidator("json", signUpSchema), async (c) => {
    const body: SignUp = await c.req.json();
    const createUser = await createUserPostgres(body);
    console.log(body);
    return c.json(createUser, 201);
  })
  .get("/sign-in", async (c) => {});
