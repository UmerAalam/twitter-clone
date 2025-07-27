import ComposedTweet from "../components/ComposedTweet";
import type { Tweet } from "../../../server/src/modules/tweet/tweet.dto";
import ReplyTweet from "../components/ReplyTweet";
import CommentList from "../components/CommentList";
import { useTweetDetail } from "../modules/tweets/tweets.query";

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
  const { isLoading, data } = useTweetDetail(tweetId);

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
