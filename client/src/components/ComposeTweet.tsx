import { useState } from "react";
import { CreateTweet } from "../../../server/src/modules/tweet/tweet.dto";
import { useNavigate } from "@tanstack/react-router";
import useCustomUserData from "../lib/customUserData";
import { useCreateTweet } from "../modules/tweets/tweets.query";

const ComposeTweet = () => {
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const id = localStorage.getItem("userId");
  if (!id) {
    return navigate({ to: "/sign-in" });
  }
  const { mutate } = useCreateTweet();
  const { data } = useCustomUserData(id);
  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (text.length == 0) return;
    const newTweet: CreateTweet = {
      text,
      createdAt: new Date().toString(),
      userId: Number(id),
    };
    mutate(newTweet);
    setText("");
  };
  return (
    <form id="postTweet" className="text-right">
      <div className="flex items-start w-full p-3">
        <img
          className="rounded-full w-10 h-10 object-cover mr-2"
          src={data?.avatar}
          alt="profile-image"
        />
        <textarea
          name="compose-tweet"
          id="compose-tweet"
          placeholder="What's happening?"
          className="px-3 pt-2 w-full text-lg min-h-34 resize-none rounded-2xl dark:text-white dark:bg-gray-800"
          maxLength={240}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <button
        type="submit"
        onClick={handleSubmit}
        className="mr-4 mb-3 cursor-pointer  hover:bg-blue-300 bg-blue-400 dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 font-bold text-white rounded-full h-9 w-24 size-fit"
      >
        Tweet
      </button>
    </form>
  );
};

export default ComposeTweet;
