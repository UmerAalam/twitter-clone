import { Hono } from "hono";
import {
  createTweetSchema,
  updateTweetSchema,
  type UpdateTweet,
} from "./tweet.dto.js";

import { zValidator } from "@hono/zod-validator";
import {
  createTweetPostgres,
  findManyTweet,
  findOneTweet,
  deleteTweet,
  updateTweet,
} from "./tweet.service.js";
import { authMiddleware } from "../auth/AuthMiddleWare.js";
interface UserID {
  currentUserId: number;
}
export const tweetsRouter = new Hono()
  .basePath("tweets")
  .use(authMiddleware)
  .post("/", zValidator("json", createTweetSchema), async (c) => {
    const body = await c.req.json();
    const addedTweet = await createTweetPostgres(body);
    return c.json(addedTweet, 201);
  })
  .get("/", async (c) => {
    const tweets = await findManyTweet({});
    return c.json(tweets, 200);
  })
  .get("/:id", async (c) => {
    const id = parseInt(c.req.param("id"));
    const tweets = await findOneTweet({ id });
    return c.json(tweets, 200);
  })
  .delete("/:id", async (c) => {
    const id = parseInt(c.req.param("id"));
    const tweet = await deleteTweet({ id });
    if (!tweet) {
      return c.json({ message: "Tweet Not Found" }, 404);
    }

    return c.json(tweet);
  })
  .patch(
    "/:id",
    zValidator(
      "json",
      updateTweetSchema.pick({
        text: true,
      }),
    ),
    async (c) => {
      const id = parseInt(c.req.param("id"));
      const body: UpdateTweet = await c.req.json();
      const tweet = await updateTweet({ id, text: body.text });
      if (!tweet) {
        return c.json({ message: "Tweet Not Found" }, 404);
      }
      return c.json(tweet);
    },
  );
