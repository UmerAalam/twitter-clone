import { Hono } from "hono";
import { authMiddleware } from "../auth/AuthMiddleWare.js";
import { zValidator } from "@hono/zod-validator";
import {
  tweetBookmarkSchema,
  deleteBookmarkSchema,
  type TweetBookmark,
  type DeleteBookmark,
} from "./bookmarks.dto.js";
// import { findLikes, postLike, deleteLike } from "./likes.service.js";
import type { Variables } from "../../types.js";
import {
  deleteBookmark,
  findBookmark,
  postBookmark,
} from "./bookmarks.service.js";

export const tweetBookmarksRouter = new Hono<{
  Variables: Variables;
}>()
  .basePath("bookmarks")
  .use(authMiddleware)
  .post("/", zValidator("json", tweetBookmarkSchema), async (c) => {
    const body: TweetBookmark = await c.req.json();
    const userId = c.get("user").id;
    const post = postBookmark({ ...body, userId });
    return c.json(post, 201);
  })
  .delete("/", zValidator("json", deleteBookmarkSchema), async (c) => {
    const { tweetId }: DeleteBookmark = await c.req.json();
    const userId = c.get("user").id;
    const update = await deleteBookmark({ userId, tweetId });
    return c.json(update, 201);
  })
  .get("/", async (c) => {
    const { tweetId }: TweetBookmark = await c.req.json();
    const likesCount = await findBookmark({ id: tweetId });
    return c.json(likesCount, 200);
  });
