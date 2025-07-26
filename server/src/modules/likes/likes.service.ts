import { eq } from "drizzle-orm";
import db from "../../db.js";
import { likesTable, tweetsTable } from "../../db/schema.js";
import type { TweetLike } from "./likes.dto.js";
export const findLikes = async (props: { id: number }) => {
  const res = await db
    .select()
    .from(likesTable)
    .where(eq(tweetsTable.id, likesTable.tweetId));
  return res;
};
interface LikeProps {
  tweetLike: TweetLike;
}
export const postComment = async (): LikeProps => {
  return await db.insert(likesTable).values(tweetLike).returning();
};
