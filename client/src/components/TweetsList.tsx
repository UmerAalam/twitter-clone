import { queryOptions, useQuery } from "@tanstack/react-query";
import ComposedTweet from "./ComposedTweet";
import { client } from "../lib/client";

export const tweetListQueryOptions = () => {
  return queryOptions({
    queryFn: async () => {
      const res = await client.api.tweets.$get();
      const data = await res.json();
      return data;
    },
    queryKey: ["tweets", "list"],
  });
};

const TweetList = () => {
  const { isLoading, data } = useQuery(tweetListQueryOptions());

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
