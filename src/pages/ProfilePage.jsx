import React from "react";
import MenuBar from "../components/MenuBar";
import MainProfile from "./MainProfile";
import TrendsBar from "../components/TrendsBar";
const ProfilePage = () => {
  return (
    <div className="grid grid-cols-[1fr_2fr_1fr] gap-3 w-full h-screen p-5">
      <MenuBar />
      <MainProfile />
      <TrendsBar />
    </div>
  );
};

export default ProfilePage;
