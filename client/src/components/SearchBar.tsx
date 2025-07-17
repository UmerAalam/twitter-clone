import React from "react";
import { LuSearch } from "react-icons/lu";
import IconButton from "./IconButton";
const SearchBar = () => {
  return (
    <>
      <div className="flex w-full items-center h-12 mt-3 rounded-full bg-gray-100">
        <IconButton
          icon={<LuSearch size={28} className="text-gray-700 pl-3" />}
        ></IconButton>
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
