import z from "zod";
export const tweetlikeSchema = z.object({
  tweetId: z.number(),
  userId: z.number(),
  createdAt: z.string(),
});
export const deleteLikeSchema = z.object({
  tweetId: z.number(),
  userId: z.number(),
});
export interface TweetLike extends z.infer<typeof tweetlikeSchema> {}
export interface DeleteLike extends z.infer<typeof deleteLikeSchema> {}
