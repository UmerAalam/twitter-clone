import z from "zod";
export const tweetlikeSchema = z.object({
  like: z.boolean(),
  tweetId: z.number(),
  userId: z.number(),
  createdAt: z.string(),
});
export const deleteLikeSchema = z.object({
  likeId: z.number(),
});
export interface TweetLike extends z.infer<typeof tweetlikeSchema> {}
export interface DeleteLike extends z.infer<typeof deleteLikeSchema> {}
