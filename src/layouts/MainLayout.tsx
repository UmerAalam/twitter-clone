import React from "react";
import { Outlet } from "react-router-dom";
import MenuBar from "../components/MenuBar";
import TrendsBar from "../components/TrendsBar";
const MainLayout = () => {
  return (
    <div className="grid grid-cols-[1fr_2fr_1fr] gap-3 w-full h-screen">
      <MenuBar />
      <Outlet />
      <TrendsBar />
    </div>
  );
};

export default MainLayout;
