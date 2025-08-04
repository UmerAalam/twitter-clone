import ComposedTweet from "./ComposedTweet";
import {
  useInfiniteTweetsQuery,
  useTweetList,
} from "../modules/tweets/tweets.query";
const TweetList = (props: {
  userId?: number;
  explore?: boolean;
  count: number;
  page: number;
}) => {
  // const { isLoading, data } = useTweetList({
  //   count: props.count,
  //   page: props.page,
  //   userId: props.userId,
  // });
  const { isLoading, data, hasNextPage } = useInfiniteTweetsQuery({
    count: props.count,
    userId: props.userId ? String(props.userId) : undefined,
  });
  let isExplore = props.explore || false;
  if (isLoading) {
    return <div className="flex justify-center">Loading data...</div>;
  }
  let renderedTweets;
  if (isExplore) {
    const randomTweets = data?.pages.sort(() => Math.random() - 0.5);
    renderedTweets = randomTweets?.map((tweets) => {
      return tweets.map((tweet) => {
        return <ComposedTweet key={tweet.id} tweet={tweet} />;
      });
    });
  } else {
    renderedTweets = data?.pages.map((tweets) => {
      return tweets.map((tweet) => {
        return (
          <>
            <hr className="dark:text-gray-700 text-gray-200" />
            <ComposedTweet key={tweet.id} tweet={tweet} />
          </>
        );
      });
    });
  }
  return <div>{renderedTweets}</div>;
};
export default TweetList;
