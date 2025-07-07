import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import MenuBar from "../components/MenuBar";
import TrendsBar from "../components/TrendsBar";
const MainLayout = () => {
  return (
    <div className="flex justify-center">
      <div className="fixed w-1/4 pr-3 top-0 left-0">
        <MenuBar />
      </div>
      <div className="w-1/2">
        <Outlet />
      </div>
      <div className="fixed pl-3 w-1/4 top-0 right-0">
        <TrendsBar />
      </div>
    </div>
  );
};

export default MainLayout;
