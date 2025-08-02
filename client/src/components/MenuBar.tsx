import { FaTwitter, FaHashtag, FaRegBell, FaRegBookmark } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { CgMoreO } from "react-icons/cg";
import { RiFileList2Line } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";
import { GoHome } from "react-icons/go";
import { GoHomeFill } from "react-icons/go";
import IconButton from "./IconButton";
import MenuProfile from "./MenuProfile";
import { useNavigate } from "@tanstack/react-router";
const iconButtons = [
  {
    icon: <GoHomeFill size={26} />,
    iconText: "Home",
    path: "/",
  },
  {
    icon: <FaHashtag size={26} />,
    iconText: "Explore",
    path: "/explore",
  },
  {
    icon: <FaRegBell size={26} />,
    iconText: "Notifications",
    path: "/notifications",
  },
  {
    icon: <HiOutlineMail size={26} />,
    iconText: "Messages",
    path: "/messages",
  },
  {
    icon: <FaRegBookmark size={26} />,
    iconText: "Bookmarks",
    path: "/bookmarks",
  },
  {
    icon: <RiFileList2Line size={26} />,
    iconText: "Lists",
    path: "/lists",
  },
  {
    icon: <CgProfile size={26} />,
    iconText: "Profile",
    path: "/profile",
  },
  {
    icon: <CgMoreO size={26} />,
    iconText: "More",
    path: "/more",
  },
];
const MenuBar = () => {
  const navigate = useNavigate();
  const renderedButtons = iconButtons.map((btn, index) => {
    return (
      <IconButton
        className="flex items-center gap-3 font-bold dark:text-white dark:hover:bg-gray-700 text-gray-800 hover:bg-gray-100 rounded-2xl h-10 pl-3"
        icon={btn.icon}
        key={index}
        onClick={() => {
          navigate({ to: btn.path });
        }}
      >
        {btn.iconText}
      </IconButton>
    );
  });
  return (
    <>
      <div className="p-5 h-screen flex justify-end bg-gray-50 dark:bg-gray-800 rounded-2xl">
        <div className="grid-cols-1 inline-grid size-fit">
          <FaTwitter
            onClick={() => {
              navigate({ to: "/" });
            }}
            className="ml-3 text-blue-400 hover:text-blue-300 dark:text-white dark:hover:text-gray-100 mt-4"
            size={28}
          />
          {/* Adding empty div to create extra-space between first and second icon */}
          <div className="h-4"></div>
          {renderedButtons}
          <div className="grid-cols-1 inline-grid gap-y-26">
            <div className="h-4"></div>
            <button
              title="Twitter"
              className="cursor-pointer dark:text-gray-800 dark:bg-white dark:hover:bg-gray-100 hover:bg-blue-300 mt-3 bg-blue-400 font-bold text-white rounded-full h-10 w-full size-fit"
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
