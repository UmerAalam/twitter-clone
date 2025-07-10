import axios from "axios";
import { useAddPostMutation } from "../store/store";
import { useState } from "react";
import { newTweet } from "../generators/tweetGenerator";
const ComposeTweet = () => {
  const image =
    "https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1.jpeg";
  const [text, setText] = useState("");
  const [addTweet] = useAddPostMutation();
  const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const tweet = newTweet;
    tweet.text = text;
    addTweet(tweet);
    setText("");
  };
  return (
    <form id="postTweet" className="text-right">
      <div className="flex items-start w-full p-3">
        <img
          className="rounded-full w-10 h-10 object-cover mr-2"
          src={image}
          alt="profile-image"
        />
        <textarea
          name="compose-tweet"
          id="compose-tweet"
          placeholder="What's happening?"
          className="px-3 pt-2 w-full text-lg min-h-34 resize-none rounded-2xl"
          maxLength={240}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <button
        type="submit"
        onClick={handleSubmit}
        className="mr-2 cursor-pointer  hover:bg-blue-300 bg-blue-400 font-bold text-white rounded-full h-10 w-20 size-fit"
      >
        Tweet
      </button>
    </form>
  );
};

export default ComposeTweet;
