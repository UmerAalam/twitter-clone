import { Outlet } from "@tanstack/react-router";
import MenuBar from "../components/MenuBar";
import TrendsBar from "../components/TrendsBar";
const MainLayout = () => {
  return (
    <div className="flex justify-center dark:bg-gray-700 min-h-screen">
      <div className="fixed w-1/4 pr-3 top-0 left-0 p-3">
        <MenuBar />
      </div>
      <div className="w-1/2 p-3">
        <Outlet />
      </div>
      <div className="fixed pl-3 w-1/4 top-0 right-0 p-3">
        <TrendsBar />
      </div>
    </div>
  );
};

export default MainLayout;
