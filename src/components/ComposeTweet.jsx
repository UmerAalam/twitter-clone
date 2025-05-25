import React from "react";
import ComposedTweet from "./ComposedTweet";
const ComposeTweet = ({ profileImage }) => {
  return (
    <div className="text-right">
      <div className="flex items-start w-full p-3">
        <img
          className="rounded-full w-10 h-10 object-cover mr-2"
          src={
            profileImage
              ? profileImage
              : "https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1.jpeg"
          }
          alt="profile-image"
        />
        <div></div>
        <textarea
          name="compose-tweet"
          id="compose-tweet"
          placeholder="What's happening?"
          className="pl-3 pt-2 w-full text-lg min-h-30 resize-none rounded-2xl"
          maxLength={150}
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
