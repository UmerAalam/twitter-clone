import type { Context } from "hono";
import { Client } from "pg";
import type { Tweet } from "../../../client/src/store/interfaces.ts";

let posts: Tweet[] = [];

const con = new Client({
  port: 5432,
  host: "localhost",
  user: "postgres",
  password: "password",
  database: "tweets",
});

con.connect().then(() => console.log("connected"));
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
    `INSERT INTO tweet (id, name, username, time, text) VALUES($1, $2, $3, $4, $5,$6,$7,$8,$9) RETURNING *;`,
    [id, name, username, time, text, comments, reposts, likes, shares],
  );
  return tweet.rows[0];
};

export const createTweet = async (c: Context) => {
  const body = await c.req.json();
  console.log(body);
  const addedTweet = await createTweetPostgres(body);
  return c.json(addedTweet, 201);
};

export const listTweets = async (c: Context) => {
  const tweets = await getTweetsPostgres();
  console.log(tweets);
  return c.json(tweets, 200);
};

export const deleteTweet = (c: Context) => {
  const id = c.req.param("id");
  const postIndex = posts.findIndex((p) => p.id === id);

  if (postIndex === -1) {
    return c.json(
      {
        message: "Not Found",
      },
      404,
    );
  }

  const post = posts[postIndex];

  posts.splice(postIndex);

  return c.json(post);
};
