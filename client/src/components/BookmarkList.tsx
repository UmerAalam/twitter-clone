import { useEffect } from "react";
import { useInfiniteBookmarksQuery } from "../modules/bookmarks/bookmark.query";
import ComposedTweet from "./ComposedTweet";
import { useInView } from "react-intersection-observer";

const BookmarkList = () => {
  const {
    data: bookmarks,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteBookmarksQuery();
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  });

  if (isLoading) {
    return <div className="flex justify-center">Loading data...</div>;
  }
  const renderedTweets = bookmarks?.pages.map((tweets) => {
    return tweets.map((tweet) => {
      return (
        <div key={tweet.id * Math.random() * 100}>
          <hr className="text-gray-200 dark:text-gray-700" />
          <ComposedTweet
            className="dark:bg-gray-800 rounded-2xl bg-gray-50"
            tweet={tweet}
          />
        </div>
      );
    });
  });

  return (
    <div>
      {renderedTweets}
      <div ref={ref}></div>
    </div>
  );
};
export default BookmarkList;
