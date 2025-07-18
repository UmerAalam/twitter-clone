import React, { useState } from "react";
import { BiMoon } from "react-icons/bi";
import { BiSun } from "react-icons/bi";
const Switcher = () => {
  const [isChecked, setIsChecked] = useState(false);

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
            onChange={handleCheckboxChange}
            className="sr-only"
          />
          <div
            className={`box block h-8 w-14 rounded-full ${isChecked ? "bg-gray-800" : "bg-blue-500"} ${
              isChecked ? "bg-primary" : "bg-dark"
            }`}
          ></div>
          <div
            className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${
              isChecked ? "translate-x-full" : ""
            }`}
          >
            {isChecked ? (
              <BiMoon className="text-gray-800" size={14} />
            ) : (
              <BiSun className="text-blue-500" size={14} />
            )}
          </div>
        </div>
      </label>
    </>
  );
};

export default Switcher;
