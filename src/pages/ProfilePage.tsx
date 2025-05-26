import React from "react";
import MenuBar from "../components/MenuBar";
import MainProfile from "./MainProfile";
import TrendsBar from "../components/TrendsBar";
const ProfilePage = () => {
  return (
    <div className="">
      <MenuBar />
      <MainProfile />
      <TrendsBar />
    </div>
  );
};

export default ProfilePage;
