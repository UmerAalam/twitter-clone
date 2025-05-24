import React from "react";

const ComposeTweet = (profileImage) => {
  return (
    <div className="p-5 flex">
      <img
        className="rounded-full w-10 h-10 object-cover"
        src={
          profileImage
            ? "https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1.jpeg"
            : profileImage
        }
        alt="profile-image"
      />
      <textarea
        name="compose-tweet"
        id="compose-tweet"
        placeholder="What's happening?"
        className="pl-4 pt-1 w-full text-lg min-h-30 resize-none"
        maxLength={150}
      ></textarea>
    </div>
  );
};

export default ComposeTweet;
