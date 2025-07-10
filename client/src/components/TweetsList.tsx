import ComposedTweet from "./ComposedTweet";
import { useGetPostsQuery } from "../store/apis/tweetsSlice";
import type { Tweet } from "../store/interfaces";
import { useState } from "react";
import axios from "axios";

const TweetList = () => {
  const { data, isLoading } = useGetPostsQuery(null);
  if (isLoading) {
    return <div className="flex justify-center">Loading data...</div>;
  }
  const renderedTweets = data.map((tweet: Tweet) => {
    return (
      <div key={tweet.username}>
        <hr />
        <ComposedTweet tweet={tweet} />
      </div>
    );
  });

  return <div>{renderedTweets}</div>;
};
export default TweetList;
