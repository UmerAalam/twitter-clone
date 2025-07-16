import { zValidator } from "@hono/zod-validator";
import { type Context, Hono } from "hono";
import {
  signInSchema,
  signUpSchema,
  userSchema,
  type SignIn,
  type SignUp,
} from "../auth/auth.dto.js";
import { createUserPostgres, findUserEmail } from "./auth.service.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const JWT_SECRET = process.env.SECRET_KEY || "";

export const authRouter = new Hono()
  .basePath("/auth")
  .get("/me", async (c) => {
    const authHeader = c.req.header("Authorization");
    console.log("Token Found");
    console.log(authHeader);
    if (!authHeader) return c.text("Missing token", 401);
    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, JWT_SECRET);
    console.log(payload);
    if (typeof payload === "string") throw new Error("Invalid Payload");
    const user = findUserEmail(email);
    return c.json(user);
  })
  .post("/sign-up", zValidator("json", signUpSchema), async (c) => {
    const body: SignUp = await c.req.json();
    const userEmail = await findUserEmail({ email: body.email });
    if (userEmail) {
      return c.json("User with this email already exists.", 400);
    }
    const hashed = await bcrypt.hash(body.password, 10);
    body.password = hashed;
    const createUser = await createUserPostgres(body);
    return c.json(createUser, 201);
  })
  .post("/sign-in", zValidator("json", signInSchema), async (c) => {
    const { email, password }: SignIn = await c.req.json();
    const user = await findUserEmail({ email });
    if (!user) return c.json({ error: "User doesn't exist!" }, 401);
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return c.json({ error: "invalid credentials" }, 401);
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });
    return c.json({ token });
  });
