import { useState } from "react";
import { useUserCountData } from "../lib/customUserData";
import FollowAccount from "../components/FollowAccount";
import { useNavigate } from "@tanstack/react-router";

const WhoToFollowPage = () => {
  const [count, setCount] = useState(10);
  const { data } = useUserCountData(count);
  const navigate = useNavigate();
  const handleClick = (accountId: number) => {
    navigate({ to: `/profile/${accountId}` });
  };
  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl">
      <div className="py-3 px-3 font-bold text-xl dark:text-white text-gray-800">
        Who to follow
      </div>
      <div className="w-full bg-gray-800 rounded-2xl">
        {data?.map((account) => {
          return (
            <FollowAccount
              onClick={() => handleClick(account.id)}
              key={account.id}
              avatar={account.avatar}
              name={account.name}
              username={
                "@" + account.name.replace(" ", "").toLowerCase() + account.id
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default WhoToFollowPage;
