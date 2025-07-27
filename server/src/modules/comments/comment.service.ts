import { eq } from "drizzle-orm";
import db from "../../db.js";
import { commentsTable } from "../../db/schema.js";
import type { TweetComment } from "./comment.dto.js";

export const findComments = async (props: { id: number }) => {
  const res = await db
    .select()
    .from(commentsTable)
    .where(eq(commentsTable.tweetId, props.id));
  return res;
};
export const postComment = async ({ text, tweetId }: TweetComment) => {
  return await db
    .insert(commentsTable)
    .values({
      text,
      tweetId,
    })
    .returning();
};
