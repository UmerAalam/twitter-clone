import { MdVerified } from "react-icons/md";
import IconButton from "./IconButton";
import { FaRegComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { IoMdHeart } from "react-icons/io";
import { IoHeartOutline } from "react-icons/io5";
import { IoShareOutline } from "react-icons/io5";
import { Tweet } from "../../../server/src/modules/tweet/tweet.dto";
import { Link } from "@tanstack/react-router";
import classNames from "classnames";
import useCustomUserData from "../lib/customUserData";
import { useState } from "react";
interface Props extends React.ButtonHTMLAttributes<HTMLDivElement> {
  tweet: Tweet;
}
const ComposedTweet = ({ tweet, ...rest }: Props) => {
  const { data, isPending } = useCustomUserData(tweet.userId.toString());
  const classname = classNames(rest.className, "flex items-start w-full p-3");
  const [like, setLike] = useState(false);
  function handleLike(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void {
    setLike(!like);
  }
  if (isPending) return <div>Loading...</div>;
  return (
    <>
      <div className={classname}>
        <img
          className="flex rounded-full w-10 h-10 object-cover mr-2"
          width={200}
          src={data?.avatar}
          alt="umer-logo"
        />
        <div className="w-full">
          <div className="cursor-pointer">
            <h2 className="font-bold text-sm flex dark:text-white">
              {data?.name}
              <IconButton
                icon={
                  <MdVerified
                    size={16}
                    className="text-blue-400 dark:text-white ml-1"
                  />
                }
              ></IconButton>
              <div className="pl-1 text-sm text-gray-400 font-medium">
                {"@" + data?.name.toLowerCase() + data?.id}
              </div>
              <div className="pl-3 text-sm text-gray-400 font-medium">
                {tweet.createdAt.slice(11, 19)}
              </div>
            </h2>
            <p className="cursor-auto flex font-normal dark:text-white text-base">
              {tweet.text}
            </p>
          </div>
          <div className="flex justify-evenly pt-3">
            <Link to="/tweets/$tweetId" params={{ tweetId: String(tweet.id) }}>
              <IconButton
                flex
                row
                className="font-normal dark:text-white text-sm my-auto text-gray-800 cursor-pointer"
                icon={<FaRegComment className="mr-1" size={22} />}
              ></IconButton>
            </Link>
            <IconButton
              flex
              row
              icon={<BiRepost className="mr-1" size={26} />}
              className="font-normal dark:text-white text-sm my-auto text-gray-800 cursor-pointer"
            ></IconButton>
            <IconButton
              flex
              row
              onClick={handleLike}
              icon={
                like ? (
                  <IoMdHeart className="mr-1" size={24} />
                ) : (
                  <IoHeartOutline className="mr-1" size={24} />
                )
              }
              className="font-normal dark:text-white text-lg my-auto text-gray-800 cursor-pointer"
            ></IconButton>
            <IconButton
              flex
              row
              icon={<IoShareOutline className="mr-1" size={24} />}
              className="font-normal dark:text-white text-sm my-auto text-gray-800 cursor-pointer"
            ></IconButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComposedTweet;
