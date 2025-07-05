import React from "react";
import { MdVerified } from "react-icons/md";
import IconButton from "./IconButton";
const FollowAccount = ({
  imageLink = "https://play-lh.googleusercontent.com/375NW5yL8owK_hW9igW9sh-YJbda9ZcygpDXuVvK_R7l-yJp-fuhb4qvUw_FE4XW4ms",
  name = "Cable News Network",
  username = "cnn",
}) => {
  return (
    <div className="cursor-pointer flex justify-between py-2 px-3 hover:bg-gray-200 rounded-full">
      <div className="inline-flex gap-2 justify-center rounded-full h-12 items-center">
        <img
          className="rounded-full w-10 h-10 object-cover my-auto"
          width={200}
          src={imageLink}
          alt="account-to-follow"
        />
        <div className="font-bold">
          <h2 className="text-sm inline-flex">
            {name}
            <IconButton
              iconCss={"text-blue-400 pl-1 my-auto hover:text-blue-300"}
              icon={<MdVerified size={18} />}
            />
          </h2>
          <h3 className="text-gray-400 text-[12px]">{"@" + username}</h3>
        </div>
      </div>
      <button className="hover:bg-blue-300 my-auto bg-blue-400 font-semibold text-white rounded-full h-8 w-20 size-fit">
        Follow
      </button>
    </div>
  );
};

export default FollowAccount;
