import z from "zod";
export const tweetBookmarkSchema = z.object({
  tweetId: z.number(),
  createdAt: z.string(),
});

export const deleteBookmarkSchema = z.object({
  tweetId: z.number(),
});
export const listBookmarkByUserIDSchema = z.object({
  userId: z.number(),
});
export interface TweetBookmark extends z.infer<typeof tweetBookmarkSchema> {}
export interface DeleteBookmark extends z.infer<typeof deleteBookmarkSchema> {}
export interface ListUserBookmark
  extends z.infer<typeof listBookmarkByUserIDSchema> {}
