import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { Client } from "pg";
const app = new Hono();

const con = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "password",
  database: "users",
});
con.connect().then(() => console.log("connected"));
con.query(
  "INSERT INTO demotable (name,id) VALUES ('razzaq',2)",
  [],
  (err, res) => {}
);
con.query("Select * from demotable", (err, res) => {
  if (!err) {
    console.log(res.rows);
  } else {
    console.log(err.message);
  }
  con.end;
});
app.get("/", (c) => {
  return c.text("Hello Hono!");
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
