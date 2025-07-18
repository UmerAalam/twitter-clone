import ComposeTweet from "./ComposeTweet";
import Switcher from "./Switcher";
import TweetList from "./TweetsList";
const HomeFeed = () => {
  return (
    <>
      <div className="bg-gray-50 rounded-2xl">
        <div className="font-bold px-5 py-3 text-xl text-gray-700 flex flex-row justify-between">
          <span>Home</span>
          <Switcher />
        </div>
        <hr />
        <ComposeTweet />
        <TweetList />
      </div>
    </>
  );
};

export default HomeFeed;
