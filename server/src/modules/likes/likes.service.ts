import { and, count, eq } from "drizzle-orm";
import db from "../../db.js";
import { likesTable } from "../../db/schema.js";
import type { TweetLike } from "./likes.dto.js";

export const findLikes = async (props: { id: number }) => {
  const res = await db
    .select({ count: count() })
    .from(likesTable)
    .where(eq(likesTable.tweetId, props.id));
  return res[0].count;
};
export const deleteLike = async (props: {
  tweetId: number;
  userId: number;
}) => {
  return await db
    .delete(likesTable)
    .where(
      and(
        eq(likesTable.tweetId, props.tweetId),
        eq(likesTable.userId, props.userId),
      ),
    )
    .returning();
};
export const postLike = async ({
  tweetId,
  userId,
}: TweetLike & { userId: number }) => {
  return await db.insert(likesTable).values({ tweetId, userId }).returning();
};
