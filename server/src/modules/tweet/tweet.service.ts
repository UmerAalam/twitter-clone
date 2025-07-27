import { desc, eq, sql } from "drizzle-orm";
import db from "../../db.js";
import { likesTable, tweetsTable, usersTable } from "../../db/schema.js";
import type {
  FindManyTweet,
  FindOneTweet,
  DeleteTweet,
  UpdateTweet,
} from "./tweet.dto.js";

type Tweet = typeof tweetsTable.$inferSelect & {
  user: {
    id: number;
    name: string;
  } | null;
};
type CreateTweet = typeof tweetsTable.$inferInsert;

export const findManyTweet = async (
  _props: FindManyTweet,
): Promise<Tweet[]> => {
  return db
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
      like: likesTable.like,
      likeId: likesTable.id,
    })
    .from(tweetsTable)
    .orderBy(desc(tweetsTable.createdAt))
    .leftJoin(usersTable, eq(usersTable.id, tweetsTable.userId))
    .leftJoin(likesTable, eq(likesTable.tweetId, tweetsTable.id));
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
    })
    .from(tweetsTable)
    .where(eq(tweetsTable.id, id))
    .leftJoin(usersTable, eq(usersTable.id, tweetsTable.userId))
    .leftJoin(likesTable, eq(likesTable.tweetId, tweetsTable.id));

  return tweet[0];
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
