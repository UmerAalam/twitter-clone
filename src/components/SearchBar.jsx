import React from "react";
import { LuSearch } from "react-icons/lu";
import IconButton from "./IconButton";
const SearchBar = () => {
  return (
    <>
      <div className="flex items-center w-[90%] h-12 mt-3 rounded-full bg-gray-100">
        <IconButton
          iconCss={"p-3 text-gray-400"}
          icon={<LuSearch fontWeight={100} size={20} />}
        />
        <input
          className="p-3 outline-0 text-gray-400"
          type="text"
          placeholder="Search Twitter"
        />
      </div>
    </>
  );
};

export default SearchBar;
