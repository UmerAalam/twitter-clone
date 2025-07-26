import z from "zod";
export const tweetlikeSchema = z.object({
  like: z.boolean(),
  tweetId: z.number(),
  userId: z.number(),
  createdAt: z.string(),
});

export interface TweetLike extends z.infer<typeof tweetlikeSchema> {}
