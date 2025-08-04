import { MdVerified } from "react-icons/md";
import IconButton from "./IconButton";
interface FollowAccountProps
  extends React.ButtonHTMLAttributes<HTMLDivElement> {
  avatar: string;
  name: string;
  username: string;
}
const FollowAccount = ({
  avatar,
  name,
  username,
  ...rest
}: FollowAccountProps) => {
  return (
    <div
      {...rest}
      className="cursor-pointer flex justify-between py-2 px-3 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-2xl"
    >
      <div className="inline-flex gap-2 justify-center rounded-full h-12 items-center">
        <img
          className="rounded-full w-10 h-10 object-cover my-auto"
          width={200}
          src={avatar}
          alt="account-to-follow"
        />
        <div className="font-bold">
          <h2 className="text-sm inline-flex dark:text-white">
            {name}
            <IconButton
              icon={
                <MdVerified
                  className="dark:text-white text-blue-500 pl-1"
                  size={20}
                />
              }
            ></IconButton>
          </h2>
          <h3 className="text-gray-400 text-[12px]">
            {username.toLowerCase()}
          </h3>
        </div>
      </div>
      <button className="hover:bg-blue-300 my-auto bg-blue-400 dark:text-gray-700 dark:bg-white dark:hover:bg-gray-400 font-bold text-white rounded-full h-8 w-20">
        Follow
      </button>
    </div>
  );
};

export default FollowAccount;
