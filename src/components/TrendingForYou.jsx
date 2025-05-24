import React from "react";
import { FiSettings } from "react-icons/fi";
import IconButton from "./IconButton";
import TrendingTweet from "../components/TrendingTweet";
import WhoToFollow from "./WhoToFollow";
const TrendingForYou = () => {
  return (
    <>
      <div className="select-none w-9/10 rounded-2xl bg-gray-100">
        <div className="flex justify-between">
          <div className="font-bold inline-flex p-3 text-lg text-gray-700">
            Trends For You
          </div>
          <IconButton
            containerCss={"p-3"}
            icon={<FiSettings fontWeight={100} size={20} />}
          />
        </div>
        <TrendingTweet />
        <TrendingTweet tag="Gamerz" country="Japan" tweetCount={1245} />
        <TrendingTweet tag="Dramas" country="Pakistan" tweetCount={4801} />
      </div>
      <WhoToFollow />
    </>
  );
};

export default TrendingForYou;
