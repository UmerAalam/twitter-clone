import React from "react";
const FollowAccount = () => {
  return (
    <div className="p-3">
      <div className="inline-flex gap-2 justify-center rounded-full hover:bg-gray-100 h-12 items-center">
        <img
          className="ml-3 rounded-full w-8 h-8 object-cover my-auto"
          width={200}
          src="https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1.jpeg"
          alt="profile-image"
        />
        <div className="font-bold size-fit">
          <h2 className="text-sm">Umer Razzaq</h2>
          <h3 className="text-gray-400 -mt-1 text-[12px]">@umer2022</h3>
        </div>
      </div>
    </div>
  );
};

export default FollowAccount;
