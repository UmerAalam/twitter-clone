import React from "react";
import { FaTwitter } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import IconButton from "./IconButton";
const MenuBar = () => {
  return (
    <>
      <div className="flex justify-end mr-5">
        <div className="grid-cols-1 inline-grid gap-5">
          <FaTwitter className="text-blue-400" size={28} />
          {/* Adding empty dive to create extra-space between first and second icon */}
          <div></div>
          <IconButton icon={<GoHomeFill size={28} />} iconText={"Home"} />
          <IconButton icon={<FaTwitter size={28} />} iconText={"Explore"} />
          <IconButton
            icon={<FaTwitter size={28} />}
            iconText={"Notifications"}
          />
          <IconButton icon={<FaTwitter size={28} />} iconText={"Messages"} />
          <IconButton icon={<FaTwitter size={28} />} iconText={"Bookmarks"} />
          <IconButton icon={<FaTwitter size={28} />} iconText={"List"} />
          <IconButton icon={<FaTwitter size={28} />} iconText={"Profile"} />
          <IconButton icon={<FaTwitter size={28} />} iconText={"More"} />
          <button className="bg-blue-400 text-white rounded-full h-10 w-50">
            Tweet
          </button>
        </div>
      </div>
    </>
  );
};

export default MenuBar;
