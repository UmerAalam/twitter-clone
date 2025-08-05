import { and, count, eq, sql } from "drizzle-orm";
import db from "../../db.js";
import {
  bookmarksTable,
  likesTable,
  tweetsTable,
  usersTable,
} from "../../db/schema.js";
import type { TweetBookmark } from "./bookmarks.dto.js";

export const findBookmarkedTweetsByUserId = async (props: {
  userId: number;
}) => {
  const res = await db
    .select({
      id: tweetsTable.id,
      text: tweetsTable.text,
      userId: tweetsTable.userId,
      createdAt: tweetsTable.createdAt,
      likesCount: sql<number>`(
        SELECT COUNT(${likesTable.id}) 
        FROM ${likesTable} 
        WHERE ${likesTable.tweetId} = ${tweetsTable.id}
      )`,
      hasLiked: sql<boolean>`(
        SELECT COUNT(*) > 0 
        FROM ${likesTable}
        WHERE ${likesTable.tweetId} = ${tweetsTable.id}
        AND ${likesTable.userId} = ${props.userId}
      )`,
      hasBookmarked: sql<boolean>`(
        SELECT COUNT(*) > 0 
        FROM ${bookmarksTable}
        WHERE ${bookmarksTable.tweetId} = ${tweetsTable.id}
        AND ${bookmarksTable.userId} = ${props.userId}
      )`,
    })
    .from(bookmarksTable)
    .innerJoin(tweetsTable, eq(tweetsTable.id, bookmarksTable.tweetId))
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
