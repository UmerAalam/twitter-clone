import { Hono } from "hono";
import type { Tweet } from "../../../client/src/store/interfaces.ts";
import sql from "../db.js";
import type {
  CreateTweet,
  DeleteTweet,
  FindManyTweet,
  FindOneTweet,
  UpdateTweet,
} from "../types.js";

const findManyTweet = async (_props: FindManyTweet) => {
  const tweetList = await sql<Tweet[]>`SELECT * FROM tweets`;
  return tweetList;
};

const createTweetPostgres = async (props: CreateTweet): Promise<Tweet> => {
  const { name, username, time, text, comments, reposts, likes, shares } =
    props;

  const id = crypto.randomUUID();
  const tweet = await sql<Tweet[]>`
  INSERT INTO tweets
      (id, name, username, time, text,comments,reposts,likes,shares) 
      VALUES(${id},${name}, ${username}, ${time}, ${text},${comments},${reposts},${likes},${shares}) 
  RETURNING *;
`;

  return tweet[0];
};

const findOneTweet = async ({ id }: FindOneTweet) => {
  const tweet = await sql`SELECT * FROM tweets WHERE id = ${id}`;
  return tweet[0];
};

const deleteTweet = async ({ id }: DeleteTweet) => {
  const exists = await findOneTweet({ id });
  if (!exists) {
    return;
  }

  const deletedTweet =
    await sql`DELETE FROM tweets WHERE id = ${id} RETURNING *`;

  return deletedTweet[0];
};

const updateTweet = async ({ id, text }: UpdateTweet) => {
  const exists = await findOneTweet({ id });
  if (!exists) {
    return;
  }

  const updatedTweet =
    await sql`UPDATE tweets SET text=${text} WHERE id = ${id} RETURNING *`;

  return updatedTweet[0];
};

export const tweetsRouter = new Hono()
  .basePath("tweets")
  .post("/", async (c) => {
    const body = await c.req.json();
    const addedTweet = await createTweetPostgres(body);
    return c.json(addedTweet, 201);
  })
  .get("/", async (c) => {
    const tweets = await findManyTweet({});
    return c.json(tweets, 200);
  })
  .delete("/:id", async (c) => {
    const id = c.req.param("id");
    const tweet = await deleteTweet({ id });
    if (!tweet) {
      return c.json({ message: "Tweet Not Found" }, 404);
    }

    return c.json(tweet);
  })
  .patch("/:id", async (c) => {
    const id = c.req.param("id");
    const body: UpdateTweet = await c.req.json();
    const tweet = await updateTweet({ id, text: body.text });
    if (!tweet) {
      return c.json({ message: "Tweet Not Found" }, 404);
    }
    return c.json(tweet);
  });
