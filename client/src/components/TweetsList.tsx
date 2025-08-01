import ComposedTweet from "./ComposedTweet";
import { useTweetList } from "../modules/tweets/tweets.query";

const TweetList = (props: {
  userId?: number;
  explore?: boolean;
  count: number;
  page: number;
}) => {
  const { isLoading, data } = useTweetList({
    count: props.count,
    page: props.page,
    userId: props.userId,
  });
  let isExplore = props.explore || false;
  if (isLoading) {
    return <div className="flex justify-center">Loading data...</div>;
  }
  let renderedTweets;
  if (isExplore) {
    const randomTweets = data?.sort(() => Math.random() - 0.5);
    renderedTweets = randomTweets?.map((tweet) => {
      return (
        <div key={tweet?.id}>
          <hr className="text-gray-200 dark:text-gray-700" />
          <ComposedTweet tweet={tweet} />
        </div>
      );
    });
  } else {
    renderedTweets = data?.map((tweet) => {
      return (
        <div key={tweet?.id}>
          <hr className="text-gray-200 dark:text-gray-700" />
          <ComposedTweet tweet={tweet} />
        </div>
      );
    });
  }

  return <div>{renderedTweets}</div>;
};
export default TweetList;
