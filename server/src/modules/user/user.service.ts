import { desc, eq } from "drizzle-orm";
import db from "../../db.js";
import { usersTable } from "../../db/schema.js";
export const findUserById = async (props: { id: number }) => {
  const res = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, props.id));
  return res[0];
};
