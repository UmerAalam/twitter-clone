import React from "react";
import { FaTwitter, FaHashtag, FaRegBell, FaRegBookmark } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { CgMoreO } from "react-icons/cg";
import { RiFileList2Line } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";
import { GoHomeFill } from "react-icons/go";
import IconButton from "./IconButton";

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
      <div className="flex justify-end mr-5">
        <div className="grid-cols-1 inline-grid gap-5">
          <FaTwitter className="text-blue-400" size={28} />
          {/* Adding empty dive to create extra-space between first and second icon */}
          <div></div>
          iconButtons.
          <button className="bg-blue-400 text-white rounded-full h-10 w-50">
            Tweet
          </button>
        </div>
      </div>
    </>
  );
};

export default MenuBar;

// <IconButton icon={<GoHomeFill size={28} />} iconText={"Home"} />
// <IconButton icon={<FaHashtag size={28} />} iconText={"Explore"} />
// <IconButton
//   icon={<FaRegBell size={28} />}
//   iconText={"Notifications"}
// />
// <IconButton
//   icon={<HiOutlineMail size={28} />}
//   iconText={"Messages"}
// />
// <IconButton
//   icon={<FaRegBookmark size={28} />}
//   iconText={"Bookmarks"}
// />
// <IconButton icon={<RiFileList2Line size={28} />} iconText={"Lists"} />
// <IconButton icon={<CgProfile size={28} />} iconText={"Profile"} />
// <IconButton icon={<CgMoreO size={28} />} iconText={"More"} />
