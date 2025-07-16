import type { MiddlewareHandler } from "hono";
import jwt from "jsonwebtoken";

const JWT_SECRET = "super-secret-key";

export const authMiddleware: MiddlewareHandler = async (c, next) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader) return c.text("Missing token", 401);

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === "string") throw new Error("Invalid token");

    c.set("user", decoded);
    await next();
  } catch {
    return c.text("Invalid or expired token", 403);
  }
};
