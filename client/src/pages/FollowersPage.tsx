import { useInView } from "react-intersection-observer";
import {
  useFollowDelete,
  useFollowPost,
  useInfiniteFollowersQuery,
} from "../modules/follow/follow.query";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Follow } from "../../../server/src/modules/follow/follow.dto";
import FollowAccount from "../components/FollowAccount";

const FollowersPage = (props: { id: number }) => {
  const { data, isLoading, hasNextPage, fetchNextPage } =
    useInfiniteFollowersQuery(props.id);
  const { mutate: followMutation } = useFollowPost();
  const { mutate: deleteFollowMutation } = useFollowDelete();
  const { ref, inView } = useInView();
  const [isFollowing, setIsFollowing] = useState<boolean | undefined>(
    undefined,
  );
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  });
  const navigate = useNavigate();
  const handleClick = (targetUser: number) => {
    navigate({ to: `/profile/${targetUser}` });
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
    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl">
      <div className="py-3 px-3 font-bold text-xl dark:text-white text-gray-800">
        Followers
      </div>
      <div className="w-full bg-gray-800 rounded-2xl">
        {data?.pages.map((followers) => {
          return followers.map((follower) => {
            return (
              <FollowAccount
                onClick={() => handleClick(follower.id)}
                key={follower.id}
                avatar={follower.avatar}
                name={follower.name}
                username={
                  "@" +
                  follower.name.replace(" ", "").toLowerCase() +
                  follower.id
                }
                followAccount={() =>
                  followAccountByID({
                    targetUser: follower.id,
                    isFollowing: follower.isFollowing,
                  })
                }
                isFollowing={follower.isFollowing}
              />
            );
          });
        })}
      </div>
      <div ref={ref}>
        {isLoading ? "Loading followers..." : "Followers Loaded"}
      </div>
    </div>
  );
};

export default FollowersPage;
