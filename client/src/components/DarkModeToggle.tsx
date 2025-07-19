import React, { useState } from "react";
import { BiMoon } from "react-icons/bi";
import { BiSun } from "react-icons/bi";

export const CheckDarkMode = () => {
  let darkMode = localStorage.getItem("Mode");
  if (darkMode?.includes("DarkMode")) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};
const handleClick = () => {
  document.documentElement.classList.toggle("dark");
};
const DarkModeToggle = () => {
  const [isChecked, setIsChecked] = useState(false);
  const darkMode = localStorage.getItem("DarkMode");
  if (!darkMode && isChecked) {
    localStorage.setItem("Mode", "DarkMode");
  } else if (!isChecked) {
    localStorage.setItem("Mode", "LightMode");
  }
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <>
      <label className="flex cursor-pointer select-none items-center">
        <div className="relative">
          <input
            type="checkbox"
            checked={isChecked}
            onClick={handleClick}
            onChange={handleCheckboxChange}
            className="sr-only"
          />
          <div
            className={`box block dark:bg-white h-8 w-14 rounded-full ${isChecked ? "bg-gray-800" : "bg-blue-500"}`}
          ></div>
          <div
            className={`absolute left-1 top-1 flex h-6 w-6 items-center dark:bg-gray-800 justify-center rounded-full bg-white transition ${
              isChecked ? "translate-x-full" : ""
            }`}
          >
            {isChecked ? (
              <BiMoon className="text-gray-800 dark:text-white" size={14} />
            ) : (
              <BiSun className="text-blue-500" size={14} />
            )}
          </div>
        </div>
      </label>
    </>
  );
};

export default DarkModeToggle;
