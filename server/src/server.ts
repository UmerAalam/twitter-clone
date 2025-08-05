import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { authRouter } from "./modules/auth/auth.routes.js";
import { tweetsRouter } from "./modules/tweet/tweet.routes.js";
import { usersRouter } from "./modules/user/user.routes.js";
import { commentsRouter } from "./modules/comments/comment.routes.js";
import { tweetLikesRouter } from "./modules/likes/likes.routes.js";
import { tweetBookmarksRouter } from "./modules/bookmarks/bookmarks.routes.js";
import { awsRouter } from "./modules/upload/upload.routes.js";
const app = new Hono()
  .use(logger())
  .use(
    "/api",
    cors({
      origin: "http://localhost:3000",
      allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowHeaders: ["Content-Type", "Authorization"],
    }),
  )
  .route("/api", tweetsRouter)
  .route("/api", authRouter)
  .route("/api", commentsRouter)
  .route("/api", usersRouter)
  .route("/api", tweetLikesRouter)
  .route("/api", tweetBookmarksRouter)
  .route("/api", awsRouter);

export type AppType = typeof app;
serve(
  {
    fetch: app.fetch,
    port: 8000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);

export default app;
