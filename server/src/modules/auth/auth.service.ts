import type { SignIn, SignUp, UserEmail } from "./auth.dto.js";
import db from "../../db.js";
import { usersTable } from "../../db/schema.js";
import { eq } from "drizzle-orm";

export const createUserPostgres = async (props: SignUp): Promise<SignUp> => {
  const res = await db.insert(usersTable).values(props).returning();
  return res[0];
};

export const findUser = async (props: SignIn) => {
  const res = await db
    .select()
    .from(usersTable)
    .where(
      eq(usersTable.email, props.email) &&
        eq(usersTable.password, props.password),
    );
  return res[0];
};

export const findUserEmail = async ({ email }: UserEmail) => {
  const res = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));
  return res[0];
};
