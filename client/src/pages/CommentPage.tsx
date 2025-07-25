import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "../lib/client";
import { useNavigate } from "@tanstack/react-router";
import ComposedTweet from "../components/ComposedTweet";
import type { Tweet } from "../../../server/src/modules/tweet/tweet.dto";
import ReplyTweet from "../components/ReplyTweet";
import getTweetComments from "../lib/getCommentsOfTweet";
import ComposedComment from "../components/ComposedComment";
import CommentList from "../components/CommentList";
export const tweetDetailQueryOptions = (id: number) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (!token) {
    navigate({ to: "/sign-in" });
  }
  return queryOptions({
    queryFn: async () => {
      const res = await client.api.tweets[":id"].$get(
        {
          param: { id: String(id) },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await res.json();
      return data;
    },
    queryKey: ["comments", "list", { id }],
    enabled: !!id,
  });
};
export interface Comment {
  id: number;
  text: string;
  tweetId: number;
  createdAt: string;
}
interface Props {
  tweetId: number;
}
const CommentPage = ({ tweetId }: Props) => {
  const { isLoading, data } = useQuery(tweetDetailQueryOptions(tweetId));
  if (isLoading) return;
  if (!data) return;
  const currentTweet: Tweet = {
    id: data.id,
    text: data.text,
    createdAt: data.createdAt,
    userId: data.userId,
  };
  return (
    <div>
      <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl">
        {isLoading ? (
          <div className="dark:text-gray-800">Loading Tweet Data</div>
        ) : (
          <ComposedTweet
            className="pt-7 dark:text-white"
            tweet={currentTweet}
          />
        )}
      </div>
      <ReplyTweet tweet={currentTweet} />
      <CommentList tweet={currentTweet} />
    </div>
  );
};

export default CommentPage;
