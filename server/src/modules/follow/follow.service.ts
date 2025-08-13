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
        eq(followTable.currentUser, currentUserId),
        eq(followTable.targetUser, targetUserId),
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
    .where(eq(followTable.targetUser, userId));
  return count.followersCount;
};
// Get all people a user follows
const findFollowingsCount = async (loggedInUserId: number) => {
  const [count] = await db
    .select({
      followingCount: sql<number>`count(*)`,
    })
    .from(followTable)
    .where(eq(followTable.currentUser, loggedInUserId));
  return count.followingCount;
};
// Get all followers and followings
export const findFollows = async (
  loggedInUser: number,
  targetUserId: number,
) => {
  // if (loggedInUser === userId) {
  //   return new Error("You can't follow yourself");
  // }
  const getFollowersCount = await findFollowersCount(targetUserId);
  const getFollowingsCount = await findFollowingsCount(targetUserId);
  const isFollowing = await checkFollowing(loggedInUser, targetUserId);
  return {
    getFollowersCount,
    getFollowingsCount,
    isFollowing,
  };
};
export const postFollow = async (props: {
  loggedInUserId: number;
  targetUserId: number;
}) => {
  return await db
    .insert(followTable)
    .values({
      currentUser: props.loggedInUserId,
      targetUser: props.targetUserId,
    })
    .returning();
};
export const deleteFollow = async (props: {
  currentUserId: number;
  targetUserId: number;
}) => {
  return await db
    .delete(followTable)
    .where(
      and(
        eq(followTable.currentUser, props.currentUserId),
        eq(followTable.targetUser, props.targetUserId),
      ),
    )
    .returning();
};
