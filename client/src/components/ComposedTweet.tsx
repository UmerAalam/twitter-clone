import { MdVerified } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import IconButton from "./IconButton";
import { FaRegCommentDots } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { IoMdHeart } from "react-icons/io";
import { IoHeartOutline } from "react-icons/io5";
import { IoShareOutline } from "react-icons/io5";
import { Tweet } from "../../../server/src/modules/tweet/tweet.dto";
import { Link, useNavigate } from "@tanstack/react-router";
import classNames from "classnames";
import useCustomUserData from "../lib/customUserData";
import { useEffect, useState } from "react";
import { useTweetLike, useDeleteTweetLike } from "../modules/likes/likes.query";
import type { TweetLike } from "../../../server/src/modules/likes/likes.dto";
import {
  useDeleteBookmark,
  useTweetBookmark,
} from "../modules/bookmarks/bookmark.query";
import { TweetBookmark } from "../../../server/src/modules/bookmarks/bookmarks.dto";
interface Props extends React.ButtonHTMLAttributes<HTMLDivElement> {
  tweet: Tweet;
}
const ComposedTweet = ({ tweet, ...rest }: Props) => {
  const { data } = useCustomUserData(tweet.userId.toString());
  const classname = classNames(rest.className, "flex items-start w-full p-3");
  const [like, setLike] = useState(false);
  const [bookmark, setBookmark] = useState(tweet.hasBookmarked || false);
  const { mutate: addTweetLike } = useTweetLike();
  const { mutate: deleteLike } = useDeleteTweetLike();
  const { mutate: addBookmark } = useTweetBookmark();
  const { mutate: deleteBookmark } = useDeleteBookmark();
  const navigate = useNavigate();
  useEffect(() => {
    if (tweet.hasBookmarked !== undefined) {
      setBookmark(tweet.hasBookmarked);
    }
    if (tweet.hasLiked !== undefined) {
      setLike(tweet.hasLiked);
    }
  });
  const handleLike = async () => {
    const newLikeState = !like;
    setLike(newLikeState);

    if (newLikeState) {
      const tweetLike: TweetLike = {
        tweetId: tweet?.id,
        createdAt: new Date().toISOString(),
      };
      addTweetLike(tweetLike, {
        onError: (error) => {
          console.error("Failed to add like:", error);
          setLike(!newLikeState);
        },
      });
    } else {
      deleteLike(
        { tweetId: tweet?.id },
        {
          onError: (error) => {
            console.error("Failed to delete like:", error);
            setLike(!newLikeState);
          },
        },
      );
    }
  };
  const handleBookmark = async () => {
    const newBookmarkState = !bookmark;
    if (newBookmarkState) {
      const tweetBookmark: TweetBookmark = {
        tweetId: tweet.id,
        createdAt: new Date().toISOString(),
      };
      addBookmark(tweetBookmark, {
        onError: (error) => {
          console.error("Failed to add bookmark:", error);
          setBookmark(!newBookmarkState);
        },
      });
    } else {
      deleteBookmark(
        { tweetId: tweet.id },
        {
          onError: (error) => {
            console.error("Failed to delete like:", error);
            setLike(!newBookmarkState);
          },
        },
      );
    }
  };
  const CopyShareLink = async () => {
    const copyValue = `http://localhost:3000/tweets/${tweet.id}`;
    await navigator.clipboard.writeText(copyValue);
  };
  return (
    <>
      <div className={classname}>
        <img
          onClick={() => navigate({ to: `/profile/${tweet.userId}` })}
          className="flex rounded-full w-10 cursor-pointer h-10 object-cover mr-2"
          width={200}
          src={data?.avatar}
          alt="umer-logo"
        />
        <div className="w-full">
          <div className="cursor-pointer">
            <h2
              onClick={() => navigate({ to: `/profile/${tweet.userId}` })}
              className="font-bold text-sm flex dark:text-white text-gray-800"
            >
              {data?.name}
              <IconButton
                icon={
                  <MdVerified
                    size={17}
                    className="text-blue-400 dark:text-white ml-1"
                  />
                }
              ></IconButton>
              <div className="pl-1 text-sm text-gray-400 font-medium">
                {"@" + data?.name.replace(" ", "").toLowerCase() + data?.id}
              </div>
              <div className="pl-3 text-sm text-gray-400 font-medium">
                {tweet.createdAt?.slice(11, 19)}
              </div>
            </h2>
            <p className="cursor-auto flex font-normal dark:text-white text-gray-800 text-base">
              {tweet.text}
            </p>
          </div>
          <div className="flex justify-evenly pt-3">
            <Link to="/tweets/$tweetId" params={{ tweetId: String(tweet.id) }}>
              <IconButton
                flex
                row
                className="font-normal dark:text-white text-sm my-auto text-gray-800 cursor-pointer"
                icon={
                  <FaRegCommentDots
                    className="dark:hover:text-blue-500 hover:text-blue-500 hover:bg-blue-500/10 overflow-visible text-gray-800 dark:hover:bg-blue-500/25 rounded-full mx-auto my-auto p-2 dark:text-white"
                    size={40}
                  />
                }
              ></IconButton>
            </Link>
            <IconButton
              flex
              row
              icon={
                <BiRepost
                  className="hover:text-emerald-500 overflow-visible dark:hover:text-emerald-400 text-gray-800 hover:bg-emerald-500/5 dark:hover:bg-emerald-500/25 rounded-full mx-auto my-auto p-2 dark:text-white"
                  size={42}
                />
              }
              className="font-normal dark:text-white text-sm my-auto text-gray-800 cursor-pointer"
            ></IconButton>
            <IconButton
              flex
              row
              onClick={handleLike}
              icon={
                like ? (
                  <IoMdHeart
                    className="overflow-visible text-red-400 hover:bg-red-400/25 rounded-full mx-auto my-auto p-2 dark:text-red-400"
                    size={42}
                  />
                ) : (
                  <IoHeartOutline
                    className="overflow-visible text-gray-800 hover:bg-black/5 dark:hover:bg-white/25 rounded-full mx-auto my-auto p-2 dark:text-white"
                    size={42}
                  />
                )
              }
              className="font-normal dark:text-white text-sm my-auto text-gray-800 cursor-pointer"
            >
              {tweet.likesCount}
            </IconButton>
            <IconButton
              flex
              row
              icon={
                <IoShareOutline
                  className="hover:text-blue-500 hover:bg-blue-500/10 overflow-visible dark:hover:text-blue-500 text-gray-800 dark:hover:bg-blue-500/25 rounded-full mx-auto my-auto p-2 dark:text-white"
                  size={42}
                />
              }
              onClick={CopyShareLink}
              className="font-normal dark:text-white text-sm my-auto text-gray-800 cursor-pointer"
            ></IconButton>
            <IconButton
              onClick={handleBookmark}
              flex
              row
              icon={
                bookmark ? (
                  <FaBookmark
                    className="hover:text-blue-500 dark:hover:text-blue-500 overflow-visible text-blue-500 hover:bg-blue-500/10 dark:hover:bg-blue-500/25 rounded-full mx-auto my-auto p-2 dark:text-white"
                    size={40}
                  />
                ) : (
                  <FaRegBookmark
                    className="hover:text-blue-500 dark:hover:text-blue-500 overflow-visible text-gray-800 hover:bg-blue-500/10 dark:hover:bg-blue-500/25 rounded-full mx-auto my-auto p-2 dark:text-white"
                    size={40}
                  />
                )
              }
            ></IconButton>
          </div>
        </div>
      </div>
    </>
  );
};
export default ComposedTweet;
