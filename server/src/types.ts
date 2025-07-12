import z from "zod";

export const baseTweetSchema = z.object({
  name: z.string().min(1),
  username: z.string(),
  time: z.string(),
  text: z.string(),
  comments: z.number(),
  reposts: z.number(),
  likes: z.number(),
  shares: z.number(),
});

export interface BaseTweet extends z.infer<typeof baseTweetSchema> {}

export const tweetSchema = baseTweetSchema.merge(
  z.object({
    id: z.string(),
  }),
);

export interface Tweet extends z.infer<typeof tweetSchema> {}

export const createTweetSchema = baseTweetSchema;

export interface CreateTweet extends z.infer<typeof createTweetSchema> {}

export const updateTweetSchema = z.object({
  id: z.string(),
  text: z.string(),
});

export interface UpdateTweet extends z.infer<typeof updateTweetSchema> {}

export const deleteTweetSchema = z.object({
  id: z.string(),
});

export interface DeleteTweet extends z.infer<typeof deleteTweetSchema> {}

export const findOneTweetSchema = z.object({
  id: z.string(),
});

export interface FindOneTweet extends z.infer<typeof findOneTweetSchema> {}

export const findManyTweetSchema = z.object({});

export interface FindManyTweet extends z.infer<typeof findManyTweetSchema> {}
