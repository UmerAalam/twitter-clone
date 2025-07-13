import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import z from "zod";
import { tweetsTable } from "../../db/schema.js";

export const tweetSchema = createSelectSchema(tweetsTable);

export const createTweetSchema = createInsertSchema(tweetsTable);
export const updateTweetSchema = createUpdateSchema(tweetsTable);

export const findOneTweetSchema = tweetSchema.pick({
  id: true,
});

export const deleteTweetSchema = findOneTweetSchema;

export const findManyTweetSchema = z.object({});

export type Tweet = typeof tweetSchema._input;
export type UpdateTweet = typeof updateTweetSchema._input;
export type CreateTweet = typeof createTweetSchema._input;
export type DeleteTweet = typeof deleteTweetSchema._input;
export type FindOneTweet = typeof findOneTweetSchema._input;
export type FindManyTweet = typeof findManyTweetSchema._input;
