import type { Context } from "hono";
import type { Tweet } from "../../../client/src/store/interfaces.ts";

let posts: Tweet[] = [
  {
    id: "1",
    name: "Umer Razzaq",
    username: "umerrazzaq2022",
    time: "Just Now",
    text: "This is just a tweet",
  },
];


export const createTweet = async (c: Context) => {
  const body = await c.req.json();
  posts.push(body);
  c.status(201);
  return c.json(body);
}

export const listTweets = (c: Context) => {
  return c.json(posts);
}

export const deleteTweet = (c: Context) => {
  const id = c.req.param('id');
  const postIndex = posts.findIndex((p) => p.id === id);

  if (postIndex === -1) {
    c.status(404);
    return c.json({
      message: 'Not Found',
    })
  }

  const post = posts[postIndex];

  posts.splice(postIndex);

  return c.json(post);
}
