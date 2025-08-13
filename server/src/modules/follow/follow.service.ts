import { eq, sql } from "drizzle-orm";
import db from "../../db.js";
import { followTable } from "../../db/schema.js";

// Get all followers of a user
const findFollowersCount = async (userId: number) => {
  return await db
    .select({
      followersCount: sql<number>`count(*)`,
    })
    .from(followTable)
    .where(eq(followTable.followingId, userId));
};
// Get all people a user follows
const findFollowingsCount = async (userId: number) => {
  return await db
    .select({
      followingCount: sql<number>`count(*)`,
    })
    .from(followTable)
    .where(eq(followTable.followerId, userId));
};
// Get all followers and followings
export const findFollows = async (userId: number) => {
  const getFollowersCount = await findFollowersCount(userId);
  const getFollowingsCount = await findFollowingsCount(userId);
  return {
    getFollowersCount,
    getFollowingsCount,
  };
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
