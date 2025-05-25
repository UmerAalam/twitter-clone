import React from "react";
import ComposeTweet from "./ComposeTweet";
import IconButton from "./IconButton";
import ComposedTweet from "./ComposedTweet";
const HomeFeed = () => {
  return (
    <>
      <div className="bg-gray-50 rounded-2xl">
        <div className="font-bold pl-5 pt-3 text-xl text-gray-700">
          <span>Home</span>
        </div>
        <hr />
        <ComposeTweet />
        <hr />
        <ComposedTweet />
      </div>
    </>
  );
};

export default HomeFeed;
