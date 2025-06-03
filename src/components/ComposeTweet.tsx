import React, { TextareaHTMLAttributes } from "react";
import ComposedTweet from "./ComposedTweet";
import { useState } from "react";

interface Props {
  addPost: (input: string) => void;
}

const ComposeTweet = ({ addPost }: Props) => {
  const name = "Umer Razzaq";
  const username = "umer2022";
  const image =
    "https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1.jpeg";

  const tweets = [];

  const [inputValue, setInputValue] = useState("");

  const handleInputValue = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };
  return (
    <div className="text-right">
      <div className="flex items-start w-full p-3">
        <img
          className="rounded-full w-10 h-10 object-cover mr-2"
          src={image}
          alt="profile-image"
        />
        <div></div>
        <textarea
          value={inputValue}
          onChange={handleInputValue}
          name="compose-tweet"
          id="compose-tweet"
          placeholder="What's happening?"
          className="px-3 pt-2 w-full text-lg min-h-34 resize-none rounded-2xl"
          maxLength={240}
        ></textarea>
      </div>
      <button
        onClick={() => {}}
        className="mr-2 cursor-pointer  hover:bg-blue-300 bg-blue-400 font-bold text-white rounded-full h-10 w-20 size-fit"
      >
        Tweet
      </button>
    </div>
  );
};

export default ComposeTweet;
