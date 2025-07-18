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
        <hr />
        <ComposeTweet />
        <TweetList />
      </div>
    </>
  );
};

export default HomeFeed;
