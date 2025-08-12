import { and, eq } from "drizzle-orm";
import db from "../../db.js";
import type { Follow } from "./follow.dto.js";
import { followTable } from "../../db/schema.js";
export const findFollowers = async (props: {
  followerId: number;
  followingId: number;
}) => {
  const res = await db
    .select()
    .from(followTable)
    .where(
      and(
        eq(followTable.followerId, props.followerId),
        eq(followTable.followingId, props.followingId),
      ),
    );
  return res;
};
export const postFollow = async ({ followerId, followingId }: Follow) => {
  return await db
    .insert(followTable)
    .values({
      followerId,
      followingId,
    })
    .returning();
};
