import { useNavigate } from "@tanstack/react-router";
import { useUserCountData } from "../lib/customUserData";
import FollowAccount from "./FollowAccount";
import { useFollowDelete, useFollowPost } from "../modules/follow/follow.query";
import { Follow } from "../../../server/src/modules/follow/follow.dto";
import { useState } from "react";
const WhoToFollow = () => {
  const { mutate } = useFollowPost();
  const { data: users } = useUserCountData(3);
  const { mutate: followMutation } = useFollowPost();
  const { mutate: deleteFollowMutation } = useFollowDelete();
  const [isFollowing, setIsFollowing] = useState<boolean | undefined>(
    undefined,
  );
  const navigate = useNavigate();
  const handleClick = (followerId: number) => {
    navigate({ to: `/profile/${followerId}` });
  };
  const followAccountByID = (props: {
    targetUser: number;
    isFollowing: boolean;
  }) => {
    setIsFollowing(props.isFollowing);
    if (isFollowing) {
      deleteFollowMutation({ targetUser: props.targetUser });
    } else {
      const follow: Follow = {
        targetUser: props.targetUser,
      };
      followMutation(follow);
    }
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
            followAccount={() =>
              followAccountByID({
                targetUser: user.id,
                isFollowing: user.isFollowing,
              })
            }
            username={"@" + user.name.replace(" ", "").toLowerCase() + user.id}
            isFollowing={user.isFollowing}
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
