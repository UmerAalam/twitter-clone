import IconButton from "./IconButton";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { useUserData } from "../lib/userData";
const MenuProfile = () => {
  const data = useUserData();
  return (
    <div className="cursor-pointer px-2 inline-flex gap-2 justify-center rounded-full hover:bg-gray-100 h-12 items-center">
      <img
        className="rounded-full w-10 h-10 object-cover my-auto"
        width={200}
        src={data?.avatar}
        alt="profile-image"
      />
      <div className="font-bold size-fit">
        <h2 className="text-sm">{data?.name}</h2>
        <h3 className="text-gray-400 text-[12px]">{data?.username}</h3>
      </div>
      <IconButton
        icon={<MdOutlineMoreHoriz className="text-right" size={20} />}
      ></IconButton>
    </div>
  );
};

export default MenuProfile;
