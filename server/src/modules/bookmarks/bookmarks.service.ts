import { and, count, eq } from "drizzle-orm";
import db from "../../db.js";
import { bookmarksTable, tweetsTable } from "../../db/schema.js";
import type { TweetBookmark } from "./bookmarks.dto.js";

export const findBookmarkedTweetsByUserId = async (props: {
  userId: number;
}) => {
  const res = db
    .select()
    .from(bookmarksTable)
    .innerJoin(tweetsTable, eq(tweetsTable.userId, bookmarksTable.userId))
    .where(eq(bookmarksTable.userId, props.userId));
  return res;
};
export const findBookmarks = async (props: { id: number }) => {
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
