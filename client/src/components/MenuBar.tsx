import React from "react";
import { FaTwitter, FaHashtag, FaRegBell, FaRegBookmark } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { CgMoreO } from "react-icons/cg";
import { RiFileList2Line } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";
import { GoHomeFill } from "react-icons/go";
import IconButton from "./IconButton";
import MenuProfile from "./MenuProfile";

const iconButtons = [
  {
    icon: <GoHomeFill size={26} />,
    iconText: "Home",
  },
  {
    icon: <FaHashtag size={26} />,
    iconText: "Explore",
  },
  {
    icon: <FaRegBell size={26} />,
    iconText: "Notifications",
  },
  {
    icon: <HiOutlineMail size={26} />,
    iconText: "Messages",
  },
  {
    icon: <FaRegBookmark size={26} />,
    iconText: "Bookmarks",
  },
  {
    icon: <RiFileList2Line size={26} />,
    iconText: "Lists",
  },
  {
    icon: <CgProfile size={26} />,
    iconText: "Profile",
  },
  {
    icon: <CgMoreO size={26} />,
    iconText: "More",
  },
];

const MenuBar = () => {
  const renderedButtons = iconButtons.map((btn, index) => {
    return <IconButton icon={btn.icon} key={index}></IconButton>;
  });
  return (
    <>
      <div className="p-5 h-screen flex justify-end bg-gray-50 rounded-2xl">
        <div className="grid-cols-1 inline-grid gap-4 size-fit">
          <FaTwitter
            className="ml-3 text-blue-400 hover:text-blue-300 mt-4"
            size={28}
          />
          {/* Adding empty div to create extra-space between first and second icon */}
          <div></div>
          {renderedButtons}
          <div className="grid-cols-1 inline-grid gap-y-26">
            <button
              title="Twitter"
              className="cursor-pointer hover:bg-blue-300 mt-3 bg-blue-400 font-bold text-white rounded-full h-10 w-full size-fit"
            >
              Tweet
            </button>
            <MenuProfile />
          </div>
        </div>
      </div>
    </>
  );
};
export default MenuBar;
