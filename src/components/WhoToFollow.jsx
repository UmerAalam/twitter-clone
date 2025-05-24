import React from "react";
import FollowAccount from "./FollowAccount";
const WhoToFollow = () => {
  return (
    <div className="w-9/10 rounded-2xl bg-gray-100">
      <div className="flex justify-between">
        <div className="font-bold inline-flex p-3 text-lg text-gray-700">
          Who To Follow
        </div>
      </div>
      <FollowAccount />
      <FollowAccount />
      <FollowAccount />
      <FollowAccount />
    </div>
  );
};

export default WhoToFollow;
