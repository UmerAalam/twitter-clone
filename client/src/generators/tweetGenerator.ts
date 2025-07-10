import { nanoid } from "@reduxjs/toolkit";
import type { Tweet } from "../store/interfaces";
import { faker } from "@faker-js/faker";
let newTweet: Tweet = {
  id: nanoid(),
  name: faker.person.fullName(),
  username:
    faker.person.firstName().toLowerCase() +
    Math.floor(Math.random() * 100).toString(),
  time: "Just Now",
  text: "",
  comments: Math.floor(Math.random() * 100),
  shares: Math.floor(Math.random() * 100),
  reposts: Math.floor(Math.random() * 100),
  likes: Math.floor(Math.random() * 100),
};

export { newTweet };
