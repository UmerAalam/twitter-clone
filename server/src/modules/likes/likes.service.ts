import { and, count, eq } from "drizzle-orm";
import db from "../../db.js";
import { likesTable } from "../../db/schema.js";
import type { TweetLike } from "./likes.dto.js";

export const findLikes = async (props: { id: number }) => {
  const res = await db
    .select({ count: count() })
    .from(likesTable)
    .where(and(eq(likesTable.tweetId, props.id), eq(likesTable.like, true)));
  return res[0].count;
};
export const updateLike = async (props: { tweetId: number; like: boolean }) => {
  return await db
    .update(likesTable)
    .set({ like: props.like })
    .where(eq(likesTable.tweetId, props.tweetId))
    .returning();
};
export const postLike = async ({ like, tweetId, userId }: TweetLike) => {
  return await db
    .insert(likesTable)
    .values({ like, tweetId, userId })
    .returning();
};
