import { eq } from "drizzle-orm";
import db from "../../db.js";
import { followTable } from "../../db/schema.js";

// Get all followers of a user
export const findFollowers = async (userId: number) => {
  return await db
    .select()
    .from(followTable)
    .where(eq(followTable.followingId, userId));
};
// Get all people a user follows
export const findFollowings = async (userId: number) => {
  return await db
    .select()
    .from(followTable)
    .where(eq(followTable.followerId, userId));
};

export const postFollow = async (props: {
  followerId: number;
  followingId: number;
}) => {
  return await db
    .insert(followTable)
    .values({
      followerId: props.followerId,
      followingId: props.followingId,
    })
    .returning();
};
