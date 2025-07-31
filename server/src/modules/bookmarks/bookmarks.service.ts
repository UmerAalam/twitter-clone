import { and, count, eq } from "drizzle-orm";
import db from "../../db.js";
import { bookmarksTable } from "../../db/schema.js";
import type { TweetBookmark } from "./bookmarks.dto.js";

export const findBookmark = async (props: { id: number }) => {
  const res = await db
    .select({ count: count() })
    .from(bookmarksTable)
    .where(eq(bookmarksTable.tweetId, props.id));
  return res[0].count;
};
export const deleteBookmark = async (props: {
  tweetId: number;
  userId: number;
}) => {
  return await db
    .delete(bookmarksTable)
    .where(
      and(
        eq(bookmarksTable.tweetId, props.tweetId),
        eq(bookmarksTable.userId, props.userId),
      ),
    )
    .returning();
};
export const postBookmark = async ({
  tweetId,
  userId,
}: TweetBookmark & { userId: number }) => {
  return await db
    .insert(bookmarksTable)
    .values({ tweetId, userId })
    .returning();
};
