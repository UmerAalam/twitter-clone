import React from "react";
import SearchBar from "./SearchBar";
import TrendingForYou from "./TrendingForYou";
const TrendsBar = () => {
  return (
    <div className=" flex flex-col gap-5 items-center bg-gray-50 rounded-2xl">
      <SearchBar />
      <TrendingForYou />
    </div>
  );
};

export default TrendsBar;
