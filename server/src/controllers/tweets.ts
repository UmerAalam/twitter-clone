import { Hono } from "hono";
import type { Tweet } from "../../../client/src/store/interfaces.ts";
import sql from "../db.js";

const getTweetsPostgres = async () => {
  const tweetList = await sql<Tweet[]>`SELECT * FROM tweet`;
  return tweetList;
};

const createTweetPostgres = async ({
  id,
  name,
  username,
  time,
  text,
  comments,
  reposts,
  likes,
  shares,
}: Tweet): Promise<Tweet> => {
  const tweet = await sql<Tweet[]>`
  INSERT INTO tweet
      (id, name, username, time, text,comments,reposts,likes,shares) 
      VALUES(${id},${name}, ${username}, ${time}, ${text},${comments},${reposts},${likes},${shares}) 
  RETURNING *;
`;

  return tweet[0];
};

export const tweetsRouter = new Hono()
  .basePath("tweets")
  .post("/", async (c) => {
    const body = await c.req.json();
    const addedTweet = await createTweetPostgres(body);
    return c.json(addedTweet, 201);
  })
  .get("/", async (c) => {
    const tweets = await getTweetsPostgres();
    return c.json(tweets, 200);
  });
