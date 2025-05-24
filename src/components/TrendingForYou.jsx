import React from "react";
import { FiSettings } from "react-icons/fi";
import IconButton from "./IconButton";
const TrendingForYou = () => {
  return (
    <div className="h-[40%] w-[90%] rounded-2xl bg-gray-100">
      <div className="flex justify-between">
        <div className="font-bold inline-flex mt-3 ml-3 text-lg text-gray-700">
          Trends For You
        </div>
        <IconButton
          iconCss={"mt-3 mr-3 text-gray-700 inline-flex"}
          icon={<FiSettings fontWeight={100} size={20} />}
        />
      </div>
    </div>
  );
};

export default TrendingForYou;
