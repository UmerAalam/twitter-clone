import ComposedTweet from "./ComposedTweet";
import { useBookmarkList } from "../modules/bookmarks/bookmark.query";
const BookmarkList = () => {
  const { data: bookmarks, isLoading } = useBookmarkList();
  if (isLoading) {
    return <div className="flex justify-center">Loading data...</div>;
  }
  const renderedTweets = bookmarks?.map((tweet) => {
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

  return <div>{renderedTweets}</div>;
};
export default BookmarkList;
