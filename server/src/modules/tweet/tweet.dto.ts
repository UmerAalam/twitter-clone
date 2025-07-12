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

export const tweetSchema = baseTweetSchema.merge(
  z.object({
    id: z.string(),
  }),
);

export const createTweetSchema = baseTweetSchema;

export const updateTweetSchema = z.object({
  id: z.string(),
  text: z.string(),
});

export const deleteTweetSchema = z.object({
  id: z.string(),
});

export const findOneTweetSchema = z.object({
  id: z.string(),
});

export const findManyTweetSchema = z.object({});

export interface BaseTweet extends z.infer<typeof baseTweetSchema> {}
export interface Tweet extends z.infer<typeof tweetSchema> {}
export interface CreateTweet extends z.infer<typeof createTweetSchema> {}
export interface UpdateTweet extends z.infer<typeof updateTweetSchema> {}
export interface DeleteTweet extends z.infer<typeof deleteTweetSchema> {}
export interface FindOneTweet extends z.infer<typeof findOneTweetSchema> {}
export interface FindManyTweet extends z.infer<typeof findManyTweetSchema> {}
