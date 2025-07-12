import { useQuery } from "@tanstack/react-query";
import ComposedTweet from "./ComposedTweet";
import { client } from "../lib/client";

const TweetList = () => {
  const { isLoading, data } = useQuery({
    queryFn: async () => {
      const res = await client.api.tweets.$get();
      const data = await res.json();
      return data;
    },
    queryKey: ["tweets"],
  });

  if (isLoading) {
    return <div className="flex justify-center">Loading data...</div>;
  }

  const renderedTweets = data?.map((tweet) => {
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
