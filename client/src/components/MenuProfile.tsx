import IconButton from "./IconButton";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { userData } from "../lib/userData";
const MenuProfile = () => {
  const data = userData();
  const profileImage =
    "https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1.jpeg";
  return (
    <div className="cursor-pointer px-2 inline-flex gap-2 justify-center rounded-full hover:bg-gray-100 h-12 items-center">
      <img
        className="rounded-full w-10 h-10 object-cover my-auto"
        width={200}
        src={profileImage}
        alt="profile-image"
      />
      <div className="font-bold size-fit">
        <h2 className="text-sm">{data.name}</h2>
        <h3 className="text-gray-400 text-[12px]">{data.username}</h3>
      </div>
      <IconButton
        icon={<MdOutlineMoreHoriz className="text-right" size={20} />}
      ></IconButton>
    </div>
  );
};

export default MenuProfile;
