import React from "react";
import { FiSettings } from "react-icons/fi";
import IconButton from "./IconButton";
import TrendingTweet from "./TrendingTweet";
const TrendingForYou = () => {
  return (
    <>
      <div className="w-full rounded-2xl bg-gray-100">
        <div className="flex justify-between">
          <div className="pl-3 pt-3 font-bold inline-flex text-lg text-gray-700">
            Trends For You
          </div>
          <IconButton
            containerCss={"p-3"}
            iconCss={"hover:text-gray-600"}
            icon={<FiSettings fontWeight={100} size={20} />}
          />
        </div>
        <TrendingTweet />
        <TrendingTweet tag="Gamerz" country="Japan" tweetCount={1245} />
        <TrendingTweet tag="Dramas" country="Pakistan" tweetCount={4801} />
        <span className="flex text-gray-700 hover:text-gray-400 cursor-pointer pl-3 pb-3 font-bold">
          Show more
        </span>
      </div>
    </>
  );
};

export default TrendingForYou;
