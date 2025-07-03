import React from "react";
import SearchBar from "./SearchBar";
import TrendingForYou from "./TrendingForYou";
import WhoToFollow from "./WhoToFollow";

const TrendsBar = () => {
  return (
    <div className="flex flex-col gap-3 items-center bg-gray-50 rounded-2xl">
      <SearchBar />
      <TrendingForYou />
      <WhoToFollow />
    </div>
  );
};

export default TrendsBar;
