import { MdVerified } from "react-icons/md";
import IconButton from "./IconButton";
import { FaRegCommentDots } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { IoHeartOutline } from "react-icons/io5";
import { IoShareOutline } from "react-icons/io5";
import classNames from "classnames";
import useCustomUserData from "../lib/customUserData";
import type { Comment } from "../pages/CommentPage";
import { useState } from "react";
import { IoMdHeart } from "react-icons/io";
interface Props extends React.ButtonHTMLAttributes<HTMLDivElement> {
  comment: Comment;
  userId: number;
}
const ComposedComment = ({ comment, userId, ...rest }: Props) => {
  const { data, isPending } = useCustomUserData(userId.toString());
  const [like, setLike] = useState(false);
  if (isPending)
    return (
      <div className="text-gray-800 dark:text-white flex justify-center">
        Loading...
      </div>
    );
  const classname = classNames(rest.className, "flex items-start w-full p-3");
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
                {comment.createdAt?.slice(11, 19)}
              </div>
            </h2>
            <p className="cursor-auto flex font-normal dark:text-white text-base">
              {comment.text}
            </p>
          </div>
          <div className="flex justify-evenly pt-3">
            <IconButton
              flex
              row
              className="font-normal dark:text-white text-sm my-auto text-gray-800 cursor-pointer"
              icon={
                <FaRegCommentDots
                  className="dark:hover:text-blue-500 overflow-visible text-gray-800 hover:bg-blue-500/5 dark:hover:bg-blue-500/25 rounded-full mx-auto my-auto p-2 dark:text-white"
                  size={40}
                />
              }
            ></IconButton>
            <IconButton
              flex
              row
              icon={
                <BiRepost
                  className="dark:hover:text-emerald-400 text-gray-800 hover:bg-emerald-500/5 dark:hover:bg-emerald-500/25 rounded-full mx-auto my-auto p-2 dark:text-white"
                  size={42}
                />
              }
              className="font-normal dark:text-white text-sm my-auto text-gray-800 cursor-pointer"
            ></IconButton>
            <IconButton
              onClick={() => setLike(!like)}
              flex
              row
              icon={
                like ? (
                  <IoMdHeart
                    className="text-red-400 hover:bg-red-400/25 rounded-full mx-auto my-auto p-2 dark:text-red-400"
                    size={40}
                  />
                ) : (
                  <IoHeartOutline
                    className="text-gray-800 hover:bg-black/5 dark:hover:bg-white/25 rounded-full mx-auto my-auto p-2 dark:text-white"
                    size={40}
                  />
                )
              }
              className="font-normal dark:text-white text-sm my-auto text-gray-800 cursor-pointer"
            ></IconButton>
            <IconButton
              flex
              row
              icon={
                <IoShareOutline
                  className="dark:hover:text-blue-500 text-gray-800 hover:bg-blue-500/5 dark:hover:bg-blue-500/25 rounded-full mx-auto my-auto p-2 dark:text-white"
                  size={40}
                />
              }
              className="font-normal dark:text-white text-sm my-auto text-gray-800 cursor-pointer"
            ></IconButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComposedComment;
