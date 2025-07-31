import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import {
  signInSchema,
  signUpSchema,
  type SignIn,
  type SignUp,
  type UpdatedUser,
} from "../auth/auth.dto.js";
import {
  createUserPostgres,
  findUserEmail,
  updateUserPostgres,
} from "./auth.service.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const JWT_SECRET = process.env.SECRET_KEY || "";
export const authRouter = new Hono()
  .basePath("/auth")
  .get("/me", async (c) => {
    const authHeader = c.req.header("Authorization");
    if (!authHeader) return c.text("Missing token", 401);
    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, JWT_SECRET);
    if (typeof payload === "string") throw new Error("Invalid Payload");
    const email = payload.email as string;
    const user = await findUserEmail({ email });
    const userWithoutPassword = {
      id: user.id,
      email: user.email,
      name: user.name,
      bio: user.bio,
      avatar: user.avatar,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
    return c.json(userWithoutPassword);
  })
  .patch("/me", async (c) => {
    const body: UpdatedUser = await c.req.json();
    const updatedUser = updateUserPostgres(body);
    return c.json(updatedUser, 200);
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
    return c.json({ token, id: user.id });
  });
