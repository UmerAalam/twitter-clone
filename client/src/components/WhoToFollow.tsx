import useCustomUserData from "../lib/customUserData";
import FollowAccount from "./FollowAccount";
const WhoToFollow = () => {
  const { data } = useCustomUserData();
  return (
    <div className="w-full rounded-2xl bg-gray-100 dark:bg-gray-700">
      <div className="flex justify-between">
        <div className="font-bold inline-flex p-3 text-lg text-gray-700 dark:text-white">
          Who To Follow
        </div>
      </div>
      <FollowAccount />
      <span className="flex text-gray-700 hover:text-gray-400 cursor-pointer pl-4 pb-3 font-bold">
        Show more
      </span>
    </div>
  );
};

export default WhoToFollow;
