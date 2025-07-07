import type { Context } from "hono";
import type { Tweet } from "../../../client/src/store/interfaces.ts";
import { Client } from "pg";

let posts: Tweet[] = [
  {
    id: "1",
    name: "Umer Razzaq",
    username: "umerrazzaq2022",
    time: "Just Now",
    text: "This is just a tweet",
  },
];

// const con = new Client({
//   port: 5432,
//   host: "localhost",
//   user: "postgres",
//   password: "password",
//   database: "tweets",
// })
//
// con.connect().then(() => console.log("connected"));
// const getTweets = async () => {
//   const tweetsList = con.query("Select * from tweets", (err, res) => {
//     if (!err) {
//       console.log(res.rows);
//     } else {
//       console.log(err.message)
//     }
//     con.end;
//   });
//   return tweetsList;
// }

export const createTweet = async (c: Context) => {
  const body = await c.req.json();
  posts.push(body);
  return c.json(body, 201);
}

export const listTweets = (c: Context) => {
  return c.json(posts);
}

export const deleteTweet = (c: Context) => {
  const id = c.req.param('id');
  const postIndex = posts.findIndex((p) => p.id === id);

  if (postIndex === -1) {
    return c.json({
      message: 'Not Found',
    }, 404)
  }

  const post = posts[postIndex];

  posts.splice(postIndex);

  return c.json(post);
}
