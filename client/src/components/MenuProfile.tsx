import IconButton from "./IconButton";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { useUserData } from "../lib/userData";
import { useNavigate } from "react-router-dom";
const MenuProfile = () => {
  const navigate = useNavigate();
  const data = useUserData();
  return (
    <div
      onClick={() => {
        navigate("/profile");
      }}
      className="cursor-pointer dark:hover:bg-gray-700 px-2 inline-flex gap-2 justify-center rounded-full hover:bg-gray-100 h-12 items-center"
    >
      <img
        className="rounded-full w-10 h-10 object-cover my-auto"
        width={200}
        src={data?.avatar}
        alt="profile-image"
      />
      <div className="font-bold size-fit">
        <h2 className="text-sm dark:text-white">{data?.name}</h2>
        <h3 className="text-gray-400 text-[12px]">{data?.username}</h3>
      </div>
      <IconButton
        icon={
          <MdOutlineMoreHoriz
            className="text-right text-gray-800 dark:text-white"
            size={20}
          />
        }
      ></IconButton>
    </div>
  );
};

export default MenuProfile;
