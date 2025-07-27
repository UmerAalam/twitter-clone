import ComposedTweet from "./ComposedTweet";
import { useTweetList } from "../modules/tweets/tweets.query";

const TweetList = () => {
  const { isLoading, data } = useTweetList();
  if (isLoading) {
    return <div className="flex justify-center">Loading data...</div>;
  }

  const renderedTweets = data?.map((tweet) => {
    return (
      <div key={tweet?.id}>
        <hr className="text-gray-200 dark:text-gray-700" />
        <ComposedTweet tweet={tweet} />
      </div>
    );
  });

  return <div>{renderedTweets}</div>;
};
export default TweetList;
