import React from "react";
import { MdVerified } from "react-icons/md";
import IconButton from "./IconButton";
const FollowAccount = ({
  imageLink = "https://play-lh.googleusercontent.com/375NW5yL8owK_hW9igW9sh-YJbda9ZcygpDXuVvK_R7l-yJp-fuhb4qvUw_FE4XW4ms",
  name = "Cable News Network",
  username = "@cnn",
}) => {
  return (
    <div>
      <div className="select-none px-3 inline-flex gap-2 justify-center rounded-full hover:bg-gray-100 h-12 items-center">
        <img
          className="rounded-full w-10 h-10 object-cover my-auto"
          width={200}
          src={imageLink}
          alt="account-to-follow"
        />
        <div className="font-bold">
          <h2 className="text-sm">
            {name}
            <IconButton icon={<MdVerified size={18} />} />
          </h2>
          <h3 className="text-gray-400 text-[12px]">{username}</h3>
        </div>
      </div>
    </div>
  );
};

export default FollowAccount;
