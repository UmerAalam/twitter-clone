import { MdVerified } from "react-icons/md";
import IconButton from "./IconButton";
import { FaRegComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { IoHeartOutline } from "react-icons/io5";
import { IoShareOutline } from "react-icons/io5";
import { Tweet } from "../../../server/src/modules/tweet/tweet.dto";
import { Link } from "react-router-dom";

interface Props {
  tweet: Tweet;
}

const profileImage = "";
const ComposedTweet = ({ tweet }: Props) => {
  return (
    <>
      <div className="flex items-start w-full p-3">
        <img
          className="flex rounded-full w-10 h-10 object-cover mr-2"
          width={200}
          src={
            profileImage
              ? profileImage
              : "https://i.ibb.co/W4BZK6ZN/umer-logo.jpg"
          }
          alt="umer-logo"
        />
        <div className="w-full">
          <div className="cursor-pointer">
            <h2 className="font-bold text-sm flex">
              Umer
              <IconButton
                icon={<MdVerified size={16} className="text-blue-400 ml-1" />}
              ></IconButton>
              <div className="pl-1 text-sm text-gray-400 font-medium">
                {"@" + "Umer"}
              </div>
              <div className="pl-3 text-sm text-gray-400 font-medium">
                {tweet.createdAt}
              </div>
            </h2>
            <p className="cursor-auto flex font-normal text-base">
              {tweet.text}
            </p>
          </div>
          <div className="flex justify-evenly pt-3">
            <Link to={`/tweets/${tweet.id}`}>
              <IconButton
                flex
                row
                className="font-normal text-sm my-auto text-gray-800 cursor-pointer"
                icon={<FaRegComment className="mr-1" size={22} />}
              >
                {/* {tweet.comments.toString()} */}
              </IconButton>
            </Link>
            <IconButton
              flex
              row
              icon={<BiRepost className="mr-1" size={22} />}
              className="font-normal text-sm my-auto text-gray-800 cursor-pointer"
            >
              {/* {tweet.comments.toString()} */}
            </IconButton>
            <IconButton
              flex
              row
              icon={<IoHeartOutline className="mr-1" size={22} />}
              className="font-normal text-sm my-auto text-gray-800 cursor-pointer"
            >
              {/* {tweet.comments.toString()} */}
            </IconButton>
            <IconButton
              flex
              row
              icon={<IoShareOutline className="mr-1" size={22} />}
              className="font-normal text-sm my-auto text-gray-800 cursor-pointer"
            >
              {/* {tweet.comments.toString()} */}
            </IconButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComposedTweet;
