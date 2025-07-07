import React from "react";
import SearchBar from "./SearchBar";
import TrendingForYou from "./TrendingForYou";
import WhoToFollow from "./WhoToFollow";

const TrendsBar = () => {
  return (
    <div className="flex flex-col h-screen w-full p-3 gap-3 bg-gray-50 rounded-2xl">
      <SearchBar />
      <TrendingForYou />
      <WhoToFollow />
    </div>
  );
};

export default TrendsBar;
