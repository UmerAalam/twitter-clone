import { Client } from "pg";
import type { Context } from "hono";
import type { SignUpUser } from "../../../client/src/store/interfaces.js";
const con = new Client({
  port: 5432,
  host: "localhost",
  user: "postgres",
  database: "users",
  password: "password",
});
con.connect().then(() => console.log("connected"));

const createTweetPostgres = async ({
  id,
  firstName,
  lastName,
  email,
  password,
}: SignUpUser): Promise<SignUpUser> => {
  const user = await con.query<SignUpUser>(
    `INSERT INTO users (id ,firstName, lastName,email,password ) VALUES($1, $2, $3, $4, $5,$6) RETURNING *;`,
    [id, firstName, lastName, email, password],
  );
  return user.rows[0];
};

export const createUser = async (c: Context) => {
  const body = await c.req.json();
  const addUser = await createTweetPostgres(body);
  return c.json(addUser, 201);
};
// export const deleteUser = (c: Context) => {
//   const id = c.req.param("id");
//   return c.json();
// };
