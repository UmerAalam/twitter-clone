import z from "zod";
export const commentSchema = z.object({
  text: z.string(),
  tweetId: z.number(),
  createdAt: z.string(),
});

export interface TweetComment extends z.infer<typeof commentSchema> {}
