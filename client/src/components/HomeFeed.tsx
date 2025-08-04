import { useEffect } from "react";
import ComposeTweet from "./ComposeTweet";
import DarkModeToggle from "./DarkModeToggle";
import TweetList from "./TweetsList";
import { useInView } from "react-intersection-observer";
const HomeFeed = () => {
  const { ref, inView } = useInView();
  let page = 1;
  let count = 10;
  useEffect(() => {
    if (inView) {
      //
    }
  });
  return (
    <>
      <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl">
        <div className="font-bold px-3 py-3 text-xl text-gray-700 flex flex-row justify-between">
          <span className="dark:text-white text-gray-800">Home</span>

          <DarkModeToggle />
        </div>
        <hr className="text-gray-200 dark:text-gray-700" />
        <ComposeTweet />
        <TweetList count={count} page={page} />
      </div>
      <div ref={ref}>Loading...</div>
    </>
  );
};

export default HomeFeed;
