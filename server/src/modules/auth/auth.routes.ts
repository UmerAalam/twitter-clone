import { zValidator } from "@hono/zod-validator";
import { type Context, Hono } from "hono";
import {
  signInSchema,
  signUpSchema,
  type SignIn,
  type SignUp,
} from "../auth/auth.dto.js";
import { createUserPostgres, findUser, findUserEmail } from "./auth.service.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const JWT_SECRET = process.env.SECRET_KEY || "";

export const authRouter = new Hono()
  .basePath("/auth")
  .post("/sign-up", zValidator("json", signUpSchema), async (c) => {
    const body: SignUp = await c.req.json();
    const userEmail = await findUserEmail({ email: body.email });
    if (userEmail) return c.text("User with this email already exists.");
    const hashed = bcrypt.hash(body.password, 10);
    const createUser = await createUserPostgres(body);
    return c.json(createUser, 201);
  })
  .post("/sign-in", zValidator("json", signInSchema), async (c) => {
    const { email, password }: SignIn = await c.req.json();
    const user = await findUser({ email, password });
    if (!user) return c.text("User doesn't exist!", 404);
    return c.json(user);
  });
