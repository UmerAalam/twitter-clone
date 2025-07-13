import { faker } from "@faker-js/faker";
import { CreateTweet } from "../../../server/src/modules/tweet/tweet.dto";

let newTweet: CreateTweet = {
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
