import ComposedTweet from "./ComposedTweet";
import { useBookmarkList } from "../modules/bookmarks/bookmark.query";
import { Tweet } from "../../../server/src/modules/tweet/tweet.dto";
const BookmarkList = () => {
  const { isLoading, data } = useBookmarkList();
  if (isLoading) {
    return <div className="flex justify-center">Loading data...</div>;
  }
  const renderedTweets = data?.map((tweet) => {
    return (
      <div key={tweet.id}>
        <hr className="text-gray-200 dark:text-gray-700" />
        <ComposedTweet className="bg-gray-800 rounded-2xl" tweet={tweet} />
      </div>
    );
  });

  return <div>{renderedTweets}</div>;
};
export default BookmarkList;
