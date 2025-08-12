import { useNavigate } from "@tanstack/react-router";
import { useUserCountData } from "../lib/customUserData";
import FollowAccount from "./FollowAccount";
import { useFollow } from "../modules/follow/follow.query";
import { Follow } from "../../../server/src/modules/follow/follow.dto";
const WhoToFollow = () => {
  const { mutate } = useFollow();
  const { data: users } = useUserCountData(3);
  const navigate = useNavigate();
  const handleClick = (followerId: number) => {
    navigate({ to: `/profile/${followerId}` });
    console.log(`let's follow a person with ${followerId}`);
    const follow: Follow = {
      followerId,
    };
    mutate(follow);
  };
  return (
    <div className="w-full rounded-2xl bg-gray-100 dark:bg-gray-700">
      <div className="flex justify-between">
        <div className="font-bold inline-flex p-3 text-lg text-gray-700 dark:text-white">
          Who To Follow
        </div>
      </div>
      {users?.map((user) => {
        return (
          <FollowAccount
            onClick={() => handleClick(user.id)}
            key={user.id}
            avatar={user.avatar}
            name={user.name}
            username={"@" + user.name.replace(" ", "").toLowerCase() + user.id}
          />
        );
      })}
      <span
        onClick={() => navigate({ to: "/whotofollow" })}
        className="flex text-gray-700 dark:text-white hover:text-gray-400 cursor-pointer pl-4 pb-2 pt-1 font-bold"
      >
        Show more
      </span>
    </div>
  );
};

export default WhoToFollow;
