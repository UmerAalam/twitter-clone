import React from "react";
import FollowAccount from "./FollowAccount";
const WhoToFollow = () => {
  return (
    <div className="w-full rounded-2xl bg-gray-100">
      <div className="flex justify-between">
        <div className="font-bold inline-flex p-3 text-lg text-gray-700">
          Who To Follow
        </div>
      </div>
      <FollowAccount
        name="Umar Aalam"
        username="umerrrazzaq2022"
        imageLink="https://i.ibb.co/W4BZK6ZN/umer-logo.jpg"
      />
      <FollowAccount
        name="Sajeel Aalam" username="sajeelaalam"
        imageLink="https://ugc.production.linktr.ee/75ca4cbb-8c52-494b-a806-7e0d517d73b1_FullSizeRender.jpeg?io=true&size=avatar-v3_0"
      />
      <FollowAccount />
      <FollowAccount
        name="BBC"
        username="bbc"
        imageLink="https://ichef.bbci.co.uk/images/ic/1920x1080/p09xtmrp.jpg"
      />
      <span className="flex text-gray-700 hover:text-gray-400 cursor-pointer pl-4 pb-3 font-bold">
        Show more
      </span>
    </div>
  );
};

export default WhoToFollow;
