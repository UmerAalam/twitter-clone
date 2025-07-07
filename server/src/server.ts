import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { createTweet, deleteTweet, listTweets } from "./controllers/tweets.js";

const app = new Hono();

app.post("/api/tweets", createTweet);
app.get("/api/tweets", listTweets);
app.delete("/api/tweets/:id", deleteTweet)

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
