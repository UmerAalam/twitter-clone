import { count, eq } from "drizzle-orm";
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
export const postLike = async ({ like, tweetId, userId }: TweetLike) => {
  return await db
    .insert(likesTable)
    .values({ like, tweetId, userId })
    .returning();
};
