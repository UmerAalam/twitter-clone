import { Tweet } from "../../../server/src/modules/tweet/tweet.dto";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import useCustomUserData from "../lib/customUserData";
import { Comment } from "../pages/CommentPage";
import { useCreateCommentReply } from "../modules/comment/comments.query";

interface ReplyTweetProps {
  tweet: Tweet;
}
const ReplyTweet = ({ tweet }: ReplyTweetProps) => {
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const id = localStorage.getItem("userId");

  if (!id) {
    navigate({ to: "/sign-in" });
    return;
  }

  const { mutate } = useCreateCommentReply();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (text.length == 0) return;
    const comment: Comment = {
      id: Number(id),
      text,
      tweetId: tweet.id,
      createdAt: tweet.createdAt,
    };
    mutate({ ...comment, createdAt: new Date().toString() });
    setText("");
  };

  const { data } = useCustomUserData(tweet.userId.toString());
  if (!data) return;
  return (
    <div className="bg-gray-50 mt-3 dark:bg-gray-800 rounded-2xl h-50 w-full">
      <form onSubmit={handleSubmit}>
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
            replying to{" "}
            {"@" + data.name.replace(" ", "").toLowerCase() + data.id}
          </p>
          <button
            type="submit"
            className="dark:text-gray-800 text-white cursor-pointer hover:bg-blue-300 bg-blue-400 dark:bg-white dark:hover:bg-gray-100 font-bold rounded-full h-9 w-24 size-fit"
          >
            Reply
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReplyTweet;
