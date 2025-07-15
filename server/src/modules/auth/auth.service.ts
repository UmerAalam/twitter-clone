import type { SignIn, SignUp, User } from "./auth.dto.js";
import db from "../../db.js";
import { usersTable } from "../../db/schema.js";

export const createUserPostgres = async (props: SignUp): Promise<SignUp> => {
  const res = await db.insert(usersTable).values(props).returning();
  return res[0];
};
