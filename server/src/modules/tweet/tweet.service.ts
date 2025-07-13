import { eq } from "drizzle-orm";
import db from "../../db.js";
import { tweetsTable } from "../../db/schema.js";
import type {
  FindManyTweet,
  FindOneTweet,
  DeleteTweet,
  UpdateTweet,
} from "./tweet.dto.js";

type Tweet = typeof tweetsTable.$inferSelect;
type CreateTweet = typeof tweetsTable.$inferInsert;

export const findManyTweet = async (
  _props: FindManyTweet,
): Promise<Tweet[]> => {
  return db.select().from(tweetsTable);
};

export const createTweetPostgres = async (
  props: CreateTweet,
): Promise<Tweet> => {
  const res = await db.insert(tweetsTable).values(props).returning();
  return res[0];
};

export const findOneTweet = async ({ id }: FindOneTweet): Promise<Tweet> => {
  const tweet = await db
    .select()
    .from(tweetsTable)
    .where(eq(tweetsTable.id, id));
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
