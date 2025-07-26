import z from "zod";
export const tweetlikeSchema = z.object({
  like: z.boolean(),
  tweetId: z.number(),
  userId: z.number(),
  createdAt: z.string(),
});
export const updateLikeSchema = z.object({
  tweetId: z.number(),
  like: z.boolean(),
});
export interface TweetLike extends z.infer<typeof tweetlikeSchema> {}
export interface UpdateLike extends z.infer<typeof tweetlikeSchema> {}
