import { desc, eq } from "drizzle-orm";
import db from "../../db.js";
import { commentsTable } from "../../db/schema.js";

export const findComments = async (props: { id: number }) => {
  const res = await db
    .select()
    .from(commentsTable)
    .where(eq(commentsTable.tweetId, props.id));
  return res;
};
