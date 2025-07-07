import React from "react";
import ComposedTweet from "./ComposedTweet";
import ComposeTweet from "./ComposeTweet";
import TweetList from "./TweetsList";
const HomeFeed = () => {
  return (
    <>
      <div className="bg-gray-50 rounded-2xl">
        <div className="font-bold pl-5 pt-3 text-xl text-gray-700">
          <span>Home</span>
        </div>
        <hr />
        <ComposeTweet />
        <TweetList />
      </div>
    </>
  );
};

export default HomeFeed;
