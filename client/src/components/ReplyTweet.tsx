import { BaseTweet } from "../../../server/src/modules/tweet/tweet.dto";
import { useUserData } from "../lib/userData";
import { useState } from "react";

interface Props {
  tweet: BaseTweet;
}

const ReplyTweet = ({ tweet }: Props) => {
  const userData = useUserData();
  const [text, setText] = useState("");
  return (
    <div className="bg-gray-100 mt-3 dark:bg-gray-800 rounded-2xl h-40 w-full">
      <textarea
        name="compose-tweet"
        id="compose-tweet"
        placeholder="Post your reply"
        className="px-3 pt-2 w-full text-lg min-h-28 resize-none rounded-2xl dark:text-white dark:bg-gray-800"
        maxLength={240}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex px-3 justify-between">
        <p>replying to {tweet.userId}</p>
        <button
          type="button"
          className="mb-3 cursor-pointer  hover:bg-blue-300 bg-blue-400 dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 font-bold text-white rounded-full h-9 w-24 size-fit"
        >
          Reply
        </button>
      </div>
    </div>
  );
};

export default ReplyTweet;
