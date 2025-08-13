import { and, eq, sql } from "drizzle-orm";
import db from "../../db.js";
import { followTable } from "../../db/schema.js";
//Check current user is following the target user or not
const checkFollowing = async (currentUserId: number, targetUserId: number) => {
  const [row] = await db
    .select({ exists: sql<boolean>`1` })
    .from(followTable)
    .where(
      and(
        eq(followTable.followingId, currentUserId),
        eq(followTable.followerId, targetUserId),
      ),
    )
    .limit(1);

  return !!row; // true if exists, false otherwise
};
// Get all followers of a user
const findFollowersCount = async (userId: number) => {
  const [count] = await db
    .select({
      followersCount: sql<number>`count(*)`,
    })
    .from(followTable)
    .where(eq(followTable.followerId, userId));
  return count.followersCount;
};
// Get all people a user follows
const findFollowingsCount = async (userId: number) => {
  const [count] = await db
    .select({
      followingCount: sql<number>`count(*)`,
    })
    .from(followTable)
    .where(eq(followTable.followingId, userId));
  return count.followingCount;
};
// Get all followers and followings
export const findFollows = async (loggindInUser: number, userId: number) => {
  if (loggindInUser === userId) {
    return new Error("You can't follow yourself");
  }
  const getFollowersCount = await findFollowersCount(userId);
  const getFollowingsCount = await findFollowingsCount(userId);
  const isFollowing = await checkFollowing(loggindInUser, userId);
  return {
    getFollowersCount,
    getFollowingsCount,
    isFollowing,
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
