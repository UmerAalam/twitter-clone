import ComposedTweet from "../components/ComposedTweet";
import type { Tweet } from "../../../server/src/modules/tweet/tweet.dto";
import ReplyTweet from "../components/ReplyTweet";
import CommentList from "../components/CommentList";
import { useTweetDetail } from "../modules/tweets/tweets.query";

export interface Comment {
  id: number;
  text: string;
  tweetId: number;
  createdAt?: string;
}
interface Props {
  tweetId: number;
}

const CommentPage = ({ tweetId }: Props) => {
  const { data, isLoading } = useTweetDetail(tweetId);

  if (isLoading) return <div>Loading Data</div>;
  if (!data) return;
  if (!data.user) return <div>Loading User Data</div>;
  const currentTweet: Tweet = {
    id: data.id,
    text: data.text,
    createdAt: data.createdAt,
    userId: data.userId,
    likesCount: data.likesCount,
    hasLiked: data.hasLiked,
    user: {
      id: data.user.id,
      name: data.user.name,
    },
    hasBookmarked: false,
  };
  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl">
      <div className="py-3 px-3 font-bold text-xl dark:text-white text-gray-800">
        Comment
      </div>
      <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl">
        {isLoading ? (
          <div className="dark:text-gray-800">Loading Tweet Data</div>
        ) : (
          <ComposedTweet className="dark:text-white" tweet={currentTweet} />
        )}
      </div>
      <ReplyTweet tweet={currentTweet} />
      <CommentList tweet={currentTweet} />
    </div>
  );
};

export default CommentPage;
