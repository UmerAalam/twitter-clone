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
  return user.rows[0];
};
const listPostgresUsers = async () => {
  const usersList = await con.query<SignUpUser>("Select * from users");
  return usersList.rows;
};
const createUser = async (c: Context) => {
  const body = await c.req.json();
  const addUser = await createUserPostgres(body);
  return c.json(addUser, 201);
};
interface UserData {
  email: string;
  password: string;
}

const findUser = async (c: Context) => {
  const { email, password } = await c.req.json();
  console.log(email, password);
  if (!email || !password) {
    return c.json({ error: "Email and password are required" }, 400);
  }
  try {
    const user = await findUserPostgres({ email, password });
    if (!user) {
      return c.json({ error: "User not found or invalid credentials" }, 404);
    }

    return c.json(user, 200);
  } catch (error) {
    return c.json({ error: "Internal server error" }, 500);
  }
};
const findUserPostgres = async ({ email, password }: UserData) => {
  console.log(email, password);
  const user = await con.query<SignUpUser>(
    `SELECT * FROM users WHERE email = $1 AND password = $2`,
    [email, password],
  );
  return user.rows[0];
};
const listUsers = async (c: Context) => {
  const users = await listPostgresUsers();
  return c.json(users, 200);
};
export { createUser, listUsers, findUser };
