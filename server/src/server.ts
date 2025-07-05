import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { Client } from "pg";
import type { Tweet } from "../../client/src/store/interfaces.js";
const app = new Hono();

const con = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "password",
  database: "tweets",
});

const addTweet = ({ id, name, username, time, text }: Tweet) => {
  con.query(
    `INSERT INTO tweets (id, name, username, time, text) VALUES (?, ?, ?, ?, ?)`,
    [id, name, username, time, text]
  );
};
con.connect().then(() => console.log("connected"));
app.get("/tweets", async (c) => {
  const result = await con.query("Select * from tweet");

  return c.json(result.rows);
});

serve(
  {
    fetch: app.fetch,
    port: 8000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);

export { addTweet };
