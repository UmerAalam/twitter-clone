import React from "react";
import IconButton from "./IconButton";
import { MdOutlineMoreHoriz } from "react-icons/md";
const MenuProfile = () => {
  return (
    <div className="select-none p-2 inline-flex gap-2 justify-center rounded-full hover:bg-gray-100 h-12 items-center">
      <img
        className="rounded-full w-8 h-8 object-cover my-auto"
        width={200}
        src="https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1.jpeg"
        alt="profile-image"
      />
      <div className="font-bold size-fit">
        <h2 className="text-sm">Umer Razzaq</h2>
        <h3 className="text-gray-400 text-[12px]">@umer2022</h3>
      </div>
      <IconButton
        icon={<MdOutlineMoreHoriz className="text-right" size={20} />}
      />
    </div>
  );
};

export default MenuProfile;
