import ComposedTweet from "./ComposedTweet";
import { addTweet } from "../store/store.ts";
import { useAppDispatch, useAppSelector } from "../store/hooks.ts";
import { nanoid } from "@reduxjs/toolkit";
const ComposeTweet = () => {
  const dispatch = useAppDispatch();
  const image =
    "https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1.jpeg";
  const newTweet = {
    id: nanoid(),
    text: "This is a sample tweet!",
    name: "John Doe",
    username: "@johndoe",
    time: "Just now",
    tweetText: "Hello Twitter!",
    profileImage: "https://example.com/profile.jpg",
  };

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    //
  };
  const renderedTweets = useAppSelector((s) => s.tweets);

  return (
    <form id="postTweet" className="text-right">
      <div className="flex items-start w-full p-3">
        <img
          className="rounded-full w-10 h-10 object-cover mr-2"
          src={image}
          alt="profile-image"
        />
        {/* <div></div> */}
        <textarea
          name="compose-tweet"
          id="compose-tweet"
          placeholder="What's happening?"
          className="px-3 pt-2 w-full text-lg min-h-34 resize-none rounded-2xl"
          maxLength={240}
        ></textarea>
      </div>
      <button
        type="submit"
        onClick={(event) => {
          event.preventDefault();
          console.log("hi");
          dispatch(addTweet(newTweet));
        }}
        className="mr-2 cursor-pointer  hover:bg-blue-300 bg-blue-400 font-bold text-white rounded-full h-10 w-20 size-fit"
      >
        Tweet
      </button>
    </form>
  );
};

export default ComposeTweet;
