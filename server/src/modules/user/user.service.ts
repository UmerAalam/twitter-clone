import db from "../../db.js";
import { followTable, usersTable } from "../../db/schema.js";
import { eq, sql } from "drizzle-orm";

export const findUserById = async (props: { id: number }) => {
  const res = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, props.id));
  return res[0];
};
export const findUsersByCount = async (props: {
  userCount?: number;
  page?: number;
  loggedInUser: number;
}) => {
  const tweetsCount = props.userCount ?? 10;
  const page = props.page ?? 1;
  const offset = (page - 1) * tweetsCount;
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
    .from(usersTable)
    .limit(tweetsCount)
    .offset(offset);
  return res;
};
