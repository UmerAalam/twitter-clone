import { useEffect } from "react";
import { useInfiniteUsersQuery } from "../lib/customUserData";
import FollowAccount from "../components/FollowAccount";
import { useNavigate } from "@tanstack/react-router";
import { useInView } from "react-intersection-observer";
import { useFollowPost } from "../modules/follow/follow.query";
import { Follow } from "../../../server/src/modules/follow/follow.dto";

const WhoToFollowPage = () => {
  const { data: users, hasNextPage, fetchNextPage } = useInfiniteUsersQuery();
  const { mutate } = useFollowPost();
  const navigate = useNavigate();
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  });
  const handleClick = (targetUser: number) => {
    navigate({ to: `/profile/${targetUser}` });
  };
  const followAccountByID = (targetUser: number) => {
    const follow: Follow = {
      targetUser,
    };
    mutate(follow);
  };
  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl">
      <div className="py-3 px-3 font-bold text-xl dark:text-white text-gray-800">
        Who to follow
      </div>
      <div className="w-full bg-gray-800 rounded-2xl">
        {users?.pages.map((accounts) => {
          return accounts.map((account) => {
            return (
              <FollowAccount
                onClick={() => handleClick(account.id)}
                key={account.id}
                avatar={account.avatar}
                name={account.name}
                username={
                  "@" + account.name.replace(" ", "").toLowerCase() + account.id
                }
                followAccount={() => followAccountByID(account.id)}
                isFollowing={account.isFollowing}
              />
            );
          });
        })}
      </div>
      <div
        ref={ref}
        className="flex justify-center dark:text-white text-gray-800"
      >
        Loading...
      </div>
    </div>
  );
};

export default WhoToFollowPage;
