import { Hono } from "hono";

export const authRouter = new Hono().basePath("auth");
// .post("/sign-up", async (c) => {})
// .get("/sign-in", async (c) => {});
