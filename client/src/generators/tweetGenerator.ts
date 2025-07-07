import { nanoid } from "@reduxjs/toolkit";
import { Tweet } from "../store/interfaces";
import { faker } from "@faker-js/faker";
const newTweet: Tweet = {
  id: nanoid(),
  name: faker.person.fullName(),
  username:
    faker.person.firstName().toLowerCase() +
    Math.floor(Math.random() * 100).toString(),
  time: "Just Now",
  text: faker.lorem.paragraph(3),
};

export { newTweet };
