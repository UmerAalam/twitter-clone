import { Hono } from "hono";
import { authMiddleware } from "../auth/AuthMiddleWare.js";
import { zValidator } from "@hono/zod-validator";
import {
  tweetBookmarkSchema,
  deleteBookmarkSchema,
  type TweetBookmark,
  type DeleteBookmark,
} from "./bookmarks.dto.js";
import type { Variables } from "../../types.js";
import {
  deleteBookmark,
  findBookmarkedTweetsByUserId,
  postBookmark,
} from "./bookmarks.service.js";

export const tweetBookmarksRouter = new Hono<{
  Variables: Variables;
}>()
  .basePath("bookmarks")
  .use(authMiddleware)
  .get("/", async (c) => {
    const page = c.req.query("page");
    const loggedInUser = c.get("user");
    const bookmarks = await findBookmarkedTweetsByUserId({
      userId: loggedInUser.id,
      page: Number(page),
    });
    return c.json(bookmarks, 200);
  })
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
  });
