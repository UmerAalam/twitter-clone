import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "../lib/client";
import { CreateTweet } from "../../../server/src/modules/tweet/tweet.dto";
import { tweetListQueryOptions } from "./TweetsList";
import { tweetDetailQueryOptions } from "../pages/CommentPage";
import { useNavigate } from "@tanstack/react-router";
const ComposeTweet = () => {
  const image =
    "https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1.jpeg";
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const id = localStorage.getItem("userId");
  if (!id) {
    return navigate({ to: "/sign-in" });
  }
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (props: CreateTweet) => {
      const token = localStorage.getItem("token");
      const res = await client.api.tweets.$post(
        {
          json: {
            ...props,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!res.ok) {
        throw new Error("Error creating tweet");
      }
      const parsedRes = await res.json();
      await queryClient.invalidateQueries(tweetListQueryOptions());
      await queryClient.invalidateQueries(
        tweetDetailQueryOptions(parsedRes.id),
      );
    },
  });
  const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (text.length == 0) return;
    const newTweet: CreateTweet = {
      text,
      createdAt: new Date().toString(),
      userId: id,
    };
    mutate(newTweet);
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
