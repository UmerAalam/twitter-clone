import { Hono } from "hono";
import { serve } from "@hono/node-server";
import type { Tweet } from "../../client/src/store/interfaces.ts";
import { prettyJSON } from "hono/pretty-json";
import { cors } from "hono/cors";

const app = new Hono();

app.use(prettyJSON());
app.use(
  "/api/*",
  cors({
    origin: "http://localhost:8000",
    allowMethods: ["POST", "GET", "OPTIONS"],
  }),
);

const posts: Tweet[] = [
  {
    id: "1",
    name: "Umer Razzaq",
    username: "umerrazzaq2022",
    time: "Just Now",
    text: "This is just a tweet",
  },
];

app.post("/api/tweets", async (c) => {
  const body = await c.req.json();
  posts.push(body);
  return c.json(body);
});

app.get("/api/tweets", (c) => {
  return c.json(posts);
});

serve(
  {
    fetch: app.fetch,
    port: 8000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
export default app;
// const con = new Client({
//   host: "localhost",
//   user: "postgres",
//   port: 5432,
//   password: "password",
//   database: "tweets",
// });

// const addTweet = ({ id, name, username, time, text }: Tweet) => {
//   con.query(
//     `INSERT INTO tweets (id, name, username, time, text) VALUES (?, ?, ?, ?, ?)`,
//     [id, name, username, time, text]
//   );
// };
// con.connect().then(() => console.log("connected"));
