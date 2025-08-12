import db from "../../db.js";
import { usersTable } from "../../db/schema.js";
import { eq } from "drizzle-orm";

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
}) => {
  const tweetsCount = props.userCount ?? 10;
  const page = props.page ?? 1;
  const offset = (page - 1) * tweetsCount;
  const res = await db
    .select({
      id: usersTable.id,
      name: usersTable.name,
      avatar: usersTable.avatar,
      created_at: usersTable.created_at,
      updated_at: usersTable.updated_at,
      bio: usersTable.bio,
    })
    .from(usersTable)
    .limit(tweetsCount)
    .offset(offset);
  return res;
};
