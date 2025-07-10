import type { Context } from "hono";
import { Client } from "pg";
import type { Tweet } from "../../../client/src/store/interfaces.ts";
import { timeStamp } from "console";

const con = new Client({
  port: 5432,
  host: "localhost",
  user: "postgres",
  password: "password",
  database: "tweets",
});
con.connect().then(() => console.log("connected tweets"));
const getTweetsPostgres = async () => {
  const tweetsList = await con.query<Tweet>("Select * from tweet");
  return tweetsList.rows;
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
  const tweet = await con.query<Tweet>(
    `INSERT INTO tweet (id, name, username, time, text,comments,reposts,likes,shares) VALUES($1, $2, $3, $4, $5,$6,$7,$8,$9) RETURNING *;`,
    [id, name, username, time, text, comments, reposts, likes, shares],
  );
  console.log(tweet.rows[0]);
  return tweet.rows[0];
};
export const createTweet = async (c: Context) => {
  const body = await c.req.json();
  const addedTweet = await createTweetPostgres(body);
  return c.json(addedTweet, 201);
};

export const listTweets = async (c: Context) => {
  const tweets = await getTweetsPostgres();
  return c.json(tweets, 200);
};
