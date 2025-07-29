import { eq } from "drizzle-orm";
import db from "../../db.js";
import { usersTable } from "../../db/schema.js";

export const findUserById = async (props: { id: number }) => {
  const res = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, props.id));
  return res[0];
};
export const findUsersByCount = async (props: { userCount: number }) => {
  const res = await db
    .select({
      id: usersTable.id,
      name: usersTable.name,
      avatar: usersTable.avatar,
      created_at: usersTable.created_at,
      updated_at: usersTable.updated_at,
    })
    .from(usersTable)
    .limit(props.userCount);
  return res;
};
