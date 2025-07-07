import ComposedTweet from "./ComposedTweet";
import { useGetPostsQuery } from "../store/apis/tweetsSlice";
import type { Tweet } from "../store/interfaces";

const TweetList = () => {
  const { data, isLoading } = useGetPostsQuery(null);
  console.log(data);
  if (isLoading) {
    return <div>Loading data...</div>
  }
  const renderedTweets = data.map((tweet: Tweet) => {
    return <div key={tweet.username}>
      <hr />
      <ComposedTweet tweet={tweet} />
    </div>
  })

  return <div>{renderedTweets}</div>
}
export default TweetList;
