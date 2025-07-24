import { BaseTweet } from "../../../server/src/modules/tweet/tweet.dto";
import { useState } from "react";
import useCustomUserData from "../lib/customUserData";

interface Props {
  tweet: BaseTweet;
}

const ReplyTweet = ({ tweet }: Props) => {
  const [text, setText] = useState("");
  const { data } = useCustomUserData(tweet.userId.toString());
  if (!data) return;
  return (
    <div className="bg-gray-50 mt-3 dark:bg-gray-800 rounded-2xl h-50 w-full">
      <textarea
        name="compose-tweet"
        id="compose-tweet"
        placeholder="Post your reply"
        className="px-3 pt-2 w-full text-lg h-38 resize-none rounded-2xl dark:text-white dark:bg-gray-800"
        maxLength={240}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex px-3 justify-between h-12 text-gray-800 dark:text-white">
        <p className="font-bold text-blue-400">
          replying to {"@" + data.name.toLowerCase() + data.id}
        </p>
        <button
          type="button"
          className="font-bold text-gray-800 cursor-pointer hover:bg-blue-300 bg-blue-400 dark:bg-white dark:hover:bg-gray-100 font-bold rounded-full h-9 w-24 size-fit"
        >
          Reply
        </button>
      </div>
    </div>
  );
};

export default ReplyTweet;
