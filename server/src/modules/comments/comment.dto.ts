import z from "zod";
export const commentSchema = z.object({
  text: z.string(),
  createdAt: z.string(),
  tweetId: z.string(),
});
export interface TweetComment extends z.infer<typeof commentSchema> {}
