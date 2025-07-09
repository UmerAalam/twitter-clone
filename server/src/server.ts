import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { createTweet, listTweets } from "./controllers/tweets.js";
import { cors } from "hono/cors";
import { createUser } from "./controllers/users.ts";
const app = new Hono();

app.use(
  "/api",
  cors({
    origin: "http://localhost:3000",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  }),
);
//Tweets
app.post("/api/tweets", createTweet);
app.get("/api/tweets", listTweets);
// app.delete("/api/tweets/:id", deleteTweet);
//Users
app.post("/api/users", createUser);
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
