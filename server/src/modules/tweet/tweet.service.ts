import { desc, eq, SQL, sql, and } from "drizzle-orm";
import db from "../../db.js";
import {
  bookmarksTable,
  likesTable,
  tweetsTable,
  usersTable,
} from "../../db/schema.js";
import type {
  FindManyTweet,
  FindOneTweet,
  DeleteTweet,
  UpdateTweet,
  Tweet,
  CreateTweet,
} from "./tweet.dto.js";

type DbTweet = typeof tweetsTable.$inferSelect & {
  user: {
    id: number;
    name: string;
  } | null;
  likesCount: number;
  hasLiked?: boolean;
  hasBookmarked?: boolean;
};

const mapTweet = (tweet: DbTweet): Tweet => ({
  id: tweet.id,
  text: tweet.text,
  userId: tweet.userId,
  createdAt: tweet.createdAt.toISOString(),
  user: tweet.user,
  likesCount: tweet.likesCount,
  hasLiked: tweet.hasLiked ? tweet.hasLiked : false,
  hasBookmarked: tweet.hasBookmarked ? tweet.hasBookmarked : false,
});
export const findManyTweet = async (
  props: FindManyTweet & { loggedInUserId: number },
): Promise<Tweet[]> => {
  const conditions: SQL[] = [];
  if (props.userId) {
    conditions.push(eq(tweetsTable.userId, props.userId));
  }
  const results = await db
    .select({
      id: tweetsTable.id,
      text: tweetsTable.text,
      userId: tweetsTable.userId,
      createdAt: tweetsTable.createdAt,
      user: {
        id: usersTable.id,
        name: usersTable.name,
      },
      likesCount: sql<number>`(
        SELECT COUNT(${likesTable.id}) 
        FROM ${likesTable} 
        WHERE ${likesTable.tweetId} = ${tweetsTable.id}
      )`,
      hasLiked: sql<boolean>`(
        SELECT COUNT(*) > 0 
        FROM ${likesTable}
        WHERE ${likesTable.tweetId} = ${tweetsTable.id}
        AND ${likesTable.userId} = ${props.loggedInUserId}
      )`,
      hasBookmarked: sql<boolean>`(
        SELECT COUNT(*) > 0 
        FROM ${bookmarksTable}
        WHERE ${bookmarksTable.tweetId} = ${tweetsTable.id}
        AND ${bookmarksTable.userId} = ${props.loggedInUserId}
      )`,
    })
    .from(tweetsTable)
    .where(and(...conditions))
    .orderBy(desc(tweetsTable.createdAt))
    .leftJoin(usersTable, eq(usersTable.id, tweetsTable.userId));
  return results.map(mapTweet);
};
export const createTweetPostgres = async (
  props: CreateTweet,
): Promise<Tweet> => {
  const res = await db
    .insert(tweetsTable)
    .values({
      ...props,
      createdAt: props.createdAt ? new Date(props.createdAt) : undefined,
    })
    .returning();

  return findOneTweet({ id: res[0].id });
};
export const findOneTweet = async ({ id }: FindOneTweet): Promise<Tweet> => {
  const tweet = await db
    .select({
      id: tweetsTable.id,
      text: tweetsTable.text,
      userId: tweetsTable.userId,
      createdAt: tweetsTable.createdAt,
      user: {
        id: usersTable.id,
        name: usersTable.name,
      },
      likesCount: sql<number>`(SELECT COUNT(${likesTable.id}) FROM ${likesTable} WHERE ${likesTable.tweetId} = ${tweetsTable.id})`,
      hasLiked: sql<boolean>`(SELECT COUNT(${likesTable.id}) > 0 FROM ${likesTable} WHERE ${likesTable.tweetId} = ${tweetsTable.id} AND ${likesTable.userId} = ${tweetsTable.userId})`,
    })
    .from(tweetsTable)
    .where(eq(tweetsTable.id, id))
    .leftJoin(usersTable, eq(usersTable.id, tweetsTable.userId))
    .leftJoin(likesTable, eq(likesTable.tweetId, tweetsTable.id));
  return mapTweet(tweet[0]);
};

export const deleteTweet = async ({
  id,
}: DeleteTweet): Promise<Tweet | undefined> => {
  const exists = await findOneTweet({ id });
  if (!exists) {
    return;
  }

  const deleteTweet = await db
    .delete(tweetsTable)
    .where(eq(tweetsTable.id, id));

  return deleteTweet[0];
};

export const updateTweet = async ({
  id,
  text,
}: UpdateTweet): Promise<Tweet | undefined> => {
  const exists = await findOneTweet({ id });
  if (!exists) {
    return;
  }

  const updatedTweet = await db
    .update(tweetsTable)
    .set({
      text: text,
    })
    .where(eq(tweetsTable.id, id));

  return updatedTweet[0];
};
