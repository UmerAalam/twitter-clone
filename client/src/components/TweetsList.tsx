import ComposedTweet from "./ComposedTweet";
import type { Tweet } from "../store/interfaces";
import { useGetPostsQuery } from "../store/store";
const TweetList = () => {
  const { data, isLoading } = useGetPostsQuery(null);
  if (isLoading) {
    return <div className="flex justify-center">Loading data...</div>;
  }
  const renderedTweets = data.map((tweet: Tweet) => {
    return (
      <div key={tweet.username}>
        <hr />
        <ComposedTweet tweet={tweet} />
      </div>
    );
  });
  return <div>{renderedTweets}</div>;
};
export default TweetList;
