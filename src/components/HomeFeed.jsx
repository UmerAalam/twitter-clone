import React from "react";
import ComposedTweet from "./ComposedTweet";
import ComposeTweet from "./ComposeTweet";
const HomeFeed = () => {
  const feedTweets = [
    {
      name: "Umer Razzaq",
      username: "umerrazzaq2022",
      time: "7h",
      tweetText: `Lorem ipsum dolor sit amet consectetur adipisicing elit. A velit,
              doloribus corrupti alias, dolor cum blanditiis, mollitia debitis
              illo ea ut? Suscipit sint at explicabo quos deserunt ipsum eaque
              nulla.`,
    },
  ];
  return (
    <>
      <div className="bg-gray-50 rounded-2xl">
        <div className="font-bold pl-5 pt-3 text-xl text-gray-700">
          <span>Home</span>
        </div>
        <hr />
        <ComposeTweet />
        {feedTweets.map((tweet) => {
          return (
            <>
              <hr />
              <ComposedTweet
                name={tweet.name}
                username={tweet.username}
                tweetText={tweet.tweetText}
                time={tweet.time}
              />
            </>
          );
        })}
      </div>
    </>
  );
};

export default HomeFeed;
