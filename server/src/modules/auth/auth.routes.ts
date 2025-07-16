import { zValidator } from "@hono/zod-validator";
import { type Context, Hono } from "hono";
import {
  signInSchema,
  signUpSchema,
  type SignIn,
  type SignUp,
  type User,
} from "../auth/auth.dto.js";
import { createUserPostgres, findUser, findUserEmail } from "./auth.service.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { authMiddleware } from "./AuthMiddleWare.js";
const JWT_SECRET = process.env.SECRET_KEY || "";

export const authRouter = new Hono()
  .basePath("/auth")
  .post("/sign-up", zValidator("json", signUpSchema), async (c) => {
    const body: SignUp = await c.req.json();
    const userEmail = await findUserEmail({ email: body.email });
    if (userEmail) return c.text("User with this email already exists.");
    const hashed = await bcrypt.hash(body.password, 10);
    body.password = hashed;
    const createUser = await createUserPostgres(body);
    return c.json(createUser, 201);
  })
  .post(
    "/sign-in",
    authMiddleware,
    zValidator("json", signInSchema),
    async (c) => {
      const { email, password }: SignIn = await c.req.json();
      const user = await findUser({ email, password });
      if (!user) return c.text("User doesn't exist!", 401);
      const valid = await bcrypt.hash(password, user.password);
      if (!valid) return c.text("invalid credentials", 401);
      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: "1h",
      });
      return c.json({ token });
    },
  );
