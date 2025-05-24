import React from "react";
import IconButton from "./IconButton";
import { MdOutlineMoreHoriz } from "react-icons/md";

const TrendingTweet = ({
  tag = "SQUID",
  tweetCount = 2066,
  country = "Turkey",
}) => {
  return (
    <>
      <div className="cursor-pointer py-2 px-3 text-gray-400 font-medium rounded-2xl hover:bg-gray-200 ">
        <div className="flex justify-between">
          <span>Trending in {country}</span>
          <IconButton icon={<MdOutlineMoreHoriz size={20} />} />
        </div>
        <div className="text-gray-700 text-lg font-semibold">{"#" + tag}</div>
        <div className="text-gray-400 py-0.5">{tweetCount}</div>
      </div>
    </>
  );
};

export default TrendingTweet;
