import React from "react";
import { MdVerified } from "react-icons/md";
import IconButton from "./IconButton";
import { FaRegComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { IoHeartOutline } from "react-icons/io5";
import { IoShareOutline } from "react-icons/io5";
const ComposedTweet = ({
  name = "Umer Razzaq",
  username = "umer2022",
  time = "7m",
}) => {
  return (
    <>
      <div className="flex items-start w-full p-3">
        <img
          className="flex rounded-full w-10 h-10 object-cover mr-2"
          width={200}
          src={
            "https://play-lh.googleusercontent.com/EMVd8uvrBgpmEUzvfp_MB10EIQ0jEanVPouDXVYIg86ZkR95UMrZOfcKs0_OP60WOwxB=s188"
          }
          alt="account-to-follow"
        />
        <div className="w-full">
          <div className="cursor-pointer">
            <h2 className="font-bold text-sm flex">
              {name}
              <IconButton
                iconCss={"text-blue-400 pl-1 my-auto hover:text-blue-300"}
                icon={<MdVerified size={18} />}
              />
              <div className="pl-1 text-sm text-gray-400 font-medium">
                {"@" + username}
              </div>
              <div className="pl-3 text-sm text-gray-400 font-medium">
                {time}
              </div>
            </h2>
            <p className="flex font-normal text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A velit,
              doloribus corrupti alias, dolor cum blanditiis, mollitia debitis
              illo ea ut? Suscipit sint at explicabo quos deserunt ipsum eaque
              nulla.
            </p>
          </div>
          <div className="flex justify-evenly pt-3">
            <IconButton
              textCss={"font-normal text-sm ml-2 my-auto"}
              iconText={Math.floor(Math.random() * 100)}
              icon={<FaRegComment size={22} />}
            />
            <IconButton
              textCss={"font-normal text-sm ml-2 my-auto"}
              iconText={Math.floor(Math.random() * 100)}
              icon={<BiRepost size={22} />}
            />
            <IconButton
              textCss={"font-normal text-sm ml-2 my-auto"}
              iconText={Math.floor(Math.random() * 100)}
              icon={<IoHeartOutline size={22} />}
            />
            <IconButton
              textCss={"font-normal text-sm ml-2 my-auto"}
              iconText={Math.floor(Math.random() * 100)}
              icon={<IoShareOutline size={22} />}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ComposedTweet;
