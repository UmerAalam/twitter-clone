import z from "zod";

export const baseTweetSchema = z.object({
  text: z.string(),
  createdAt: z.string().optional(),
  userId: z.number(),
});

export const tweetSchema = baseTweetSchema.merge(
  z.object({
    id: z.number(),
  }),
);

export const createTweetSchema = baseTweetSchema;

export const updateTweetSchema = z.object({
  id: z.number(),
  text: z.string(),
});

export const deleteTweetSchema = z.object({
  id: z.number(),
});

export const findOneTweetSchema = z.object({
  id: z.number(),
});
export const findManyTweetSchema = z.object({
  userId: z.coerce.number().optional(),
});
export interface BaseTweet extends z.infer<typeof baseTweetSchema> {}
export interface Tweet extends z.infer<typeof tweetSchema> {
  user: {
    id: number;
    name: string;
  } | null;
  likesCount: number;
  hasLiked?: boolean;
  hasBookmarked?: boolean;
}
export interface CreateTweet extends z.infer<typeof createTweetSchema> {}
export interface UpdateTweet extends z.infer<typeof updateTweetSchema> {}
export interface DeleteTweet extends z.infer<typeof deleteTweetSchema> {}
export interface FindOneTweet extends z.infer<typeof findOneTweetSchema> {}
export interface FindManyTweet extends z.infer<typeof findManyTweetSchema> {}
