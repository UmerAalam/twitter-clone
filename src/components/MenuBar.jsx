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
    icon: <GoHomeFill size={28} />,
    iconText: "Home",
  },
  {
    icon: <FaHashtag size={28} />,
    iconText: "Explore",
  },
  {
    icon: <FaRegBell size={28} />,
    iconText: "Notifications",
  },
  {
    icon: <HiOutlineMail size={28} />,
    iconText: "Messages",
  },
  {
    icon: <FaRegBookmark size={28} />,
    iconText: "Bookmarks",
  },
  {
    icon: <RiFileList2Line size={28} />,
    iconText: "Lists",
  },
  {
    icon: <CgProfile size={28} />,
    iconText: "Profile",
  },
  {
    icon: <CgMoreO size={28} />,
    iconText: "More",
  },
];

const MenuBar = () => {
  return (
    <>
      <div className="pr-5 flex justify-end bg-gray-50 rounded-2xl">
        <div className="grid-cols-1 inline-grid gap-4 size-fit">
          <FaTwitter
            className="ml-3 text-blue-400 hover:text-blue-300 mt-4"
            size={28}
          />
          {/* Adding empty dive to create extra-space between first and second icon */}
          <div></div>
          {iconButtons.map((btn, index) => {
            return (
              <IconButton
                containerCss={
                  "select-none w-full max-w-2xl h-10 rounded-full hover:bg-gray-100 items-center size-fit inline-flex my-0"
                }
                icon={btn.icon}
                iconText={btn.iconText}
                textCss={"text-gray-700 font-bold ml-3 text-xl"}
                key={index}
              />
            );
          })}
          <div className="grid-cols-1 inline-grid gap-y-26">
            <button className="hover:bg-blue-300 mt-3 bg-blue-400 font-bold text-white rounded-full h-10 w-full size-fit">
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
