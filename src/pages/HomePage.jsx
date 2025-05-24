import React from "react";
import MenuBar from "../components/MenuBar";
import HomeFeed from "../components/HomeFeed";
import TrendsBar from "../components/TrendsBar";
const HomePage = () => {
  return (
    <>
      <div className="grid grid-cols-[1fr_2fr_1fr] gap-3 w-full h-screen p-5 rounded-2xl">
        <MenuBar />
        <HomeFeed />
        <TrendsBar />
      </div>
    </>
  );
};

export default HomePage;
