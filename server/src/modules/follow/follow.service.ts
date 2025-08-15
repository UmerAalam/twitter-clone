import { and, desc, eq, sql } from "drizzle-orm";
import db from "../../db.js";
import { followTable, usersTable } from "../../db/schema.js";
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
export const findFollowersByUserID = async (props: {
  followId: number;
  userCount?: number;
  loggedInUser: number;
  page?: number;
}) => {
  const usersCount = props.userCount ?? 10;
  const page = props.page ?? 1;
  const offset = (page - 1) * usersCount;
  const isFollowing = sql<boolean>`
    EXISTS (
      SELECT 1
      FROM ${followTable} f
      WHERE follower_id = ${props.loggedInUser}
        AND following_id = ${usersTable.id}
    )
  `.as("isFollowing");
  const res = await db
    .select({
      id: usersTable.id,
      name: usersTable.name,
      avatar: usersTable.avatar,
      created_at: usersTable.created_at,
      updated_at: usersTable.updated_at,
      bio: usersTable.bio,
      isFollowing,
    })
    .from(followTable)
    .innerJoin(usersTable, eq(usersTable.id, followTable.currentUser))
    .where(eq(followTable.targetUser, props.followId))
    .orderBy(desc(followTable.createdAt))
    .limit(usersCount)
    .offset(offset);
  return res;
};
export const deleteFollow = async (props: {
  currentUserId: number;
  targetUserId: number;
}) => {
  console.log(props.currentUserId, props.targetUserId);
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
