import { useUserData } from "../lib/userData";

const ReplyTweet = () => {
  const userData = useUserData();
  return (
    <div className="bg-gray-100 mt-3 dark:bg-gray-800 rounded-2xl h-40 w-full"></div>
  );
};

export default ReplyTweet;
