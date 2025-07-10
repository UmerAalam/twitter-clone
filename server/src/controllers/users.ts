import { Client } from "pg";
import type { Context } from "hono";
import type { SignUpUser } from "../../../client/src/store/interfaces.js";
import { create } from "domain";

const con = new Client({
  port: 5432,
  host: "localhost",
  user: "postgres",
  database: "users",
  password: "password",
});
con.connect().then(() => console.log("connected users"));

const createUserPostgres = async ({
  id,
  firstName,
  lastName,
  email,
  password,
}: SignUpUser): Promise<SignUpUser> => {
  const user = await con.query<SignUpUser>(
    `INSERT INTO users (id ,firstName, lastName,email,password ) VALUES($1, $2, $3, $4, $5) RETURNING *;`,
    [id, firstName, lastName, email, password],
  );
  console.log(user.rows[0]);
  return user.rows[0];
};

const listPostgresUsers = async () => {
  const usersList = await con.query<SignUpUser>("Select * from users");
  return usersList.rows;
};
const createUser = async (c: Context) => {
  const body = await c.req.json();
  console.log(body);
  const addUser = await createUserPostgres(body);
  console.log(addUser);
  return c.json(addUser, 201);
};
const listUsers = async (c: Context) => {
  const users = await listPostgresUsers();
  return c.json(users, 200);
};

export { createUser, listUsers };
