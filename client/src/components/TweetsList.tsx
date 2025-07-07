import React from "react";
import ComposedTweet from "./ComposedTweet";
import { useGetPostsQuery } from "../store/apis/tweetsSlice";
import type { Tweet } from "../store/interfaces";

const TweetList = () => {
  const { data, isLoading } = useGetPostsQuery(undefined);
  console.log(data);
  const renderedTweets = data.map((tweet: Tweet) => {
    return <ComposedTweet tweet={tweet} />
  })
  if (isLoading) {
    return <div>Loading...</div>
  }
  return <div>{renderedTweets}</div>
}
export default TweetList;
