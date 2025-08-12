import ComposedTweet from "./ComposedTweet";
import { useInfiniteTweetsQuery } from "../modules/tweets/tweets.query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Tweet } from "../../../server/src/modules/tweet/tweet.dto";
const TweetList = (props: { userId?: number }) => {
  const { ref, inView } = useInView();
  let count = 10;
  const { isLoading, data, hasNextPage, fetchNextPage } =
    useInfiniteTweetsQuery({
      count,
      userId: props.userId ? String(props.userId) : undefined,
    });
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  });
  if (isLoading) {
    return <div className="flex justify-center">Loading data...</div>;
  }
  const renderedTweets = data?.pages.map((tweets) => {
    return tweets.map((tweet: Tweet) => {
      return (
        <div key={tweet.id}>
          <hr key={tweet.userId} className="dark:text-gray-700 text-gray-200" />
          <ComposedTweet key={tweet.createdAt} tweet={tweet} />
        </div>
      );
    });
  });
  return (
    <>
      <div>{renderedTweets}</div>
      <div
        ref={ref}
        className="dark:text-white text-gray-800 flex justify-center"
      >
        {isLoading && "Loading..."}
      </div>
    </>
  );
};
export default TweetList;
