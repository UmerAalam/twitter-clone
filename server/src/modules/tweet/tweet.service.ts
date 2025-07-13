import sql from "../../db.js";
import type {
  FindManyTweet,
  Tweet,
  CreateTweet,
  FindOneTweet,
  DeleteTweet,
  UpdateTweet,
} from "./tweet.dto.js";

export const findManyTweet = async (
  _props: FindManyTweet,
): Promise<Tweet[]> => {
  const tweetList = await sql<
    Tweet[]
  >`SELECT * FROM tweets ORDER BY created_at  DESC`;
  return tweetList;
};

export const createTweetPostgres = async (
  props: CreateTweet,
): Promise<Tweet> => {
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

export const findOneTweet = async ({ id }: FindOneTweet): Promise<Tweet> => {
  const tweet = await sql<Tweet[]>`SELECT * FROM tweets WHERE id = ${id}`;
  return tweet[0];
};

export const deleteTweet = async ({
  id,
}: DeleteTweet): Promise<Tweet | undefined> => {
  const exists = await findOneTweet({ id });
  if (!exists) {
    return;
  }

  const deletedTweet = await sql<
    Tweet[]
  >`DELETE FROM tweets WHERE id = ${id} RETURNING *`;

  return deletedTweet[0];
};

export const updateTweet = async ({
  id,
  text,
}: UpdateTweet): Promise<Tweet | undefined> => {
  const exists = await findOneTweet({ id });
  if (!exists) {
    return;
  }

  const updatedTweet = await sql<
    Tweet[]
  >`UPDATE tweets SET text=${text} WHERE id = ${id} RETURNING *`;

  return updatedTweet[0];
};
