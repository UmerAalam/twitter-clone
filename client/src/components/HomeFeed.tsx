import ComposeTweet from "./ComposeTweet";
import DarkModeToggle from "./DarkModeToggle";
import TweetList from "./TweetsList";
const HomeFeed = () => {
  return (
    <>
      <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl">
        <div className="font-bold px-5 py-3 text-xl text-gray-700 flex flex-row justify-between">
          <span className="dark:text-white">Home</span>
          <DarkModeToggle />
        </div>
        <hr className="text-gray-200 dark:text-gray-700" />
        <ComposeTweet />
        <TweetList />
      </div>
    </>
  );
};

export default HomeFeed;
