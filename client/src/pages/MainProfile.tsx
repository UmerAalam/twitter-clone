import { SlCalender } from "react-icons/sl";
import useCustomUserData from "../lib/customUserData";
const MainProfile = () => {
  const id = localStorage.getItem("userId") || "0";
  const { data } = useCustomUserData(id);
  if (!data) return;
  const avatar =
    "https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1.jpeg";
  const backgroundImage =
    "https://cdn.pixabay.com/photo/2022/01/01/16/29/antelope-6908215_1280.jpg";
  return (
    <div className=" bg-gray-50 dark:bg-gray-800 rounded-2xl">
      <div className="flex justify-center h-48">
        <img
          className="rounded-t-2xl object-cover w-full h-full"
          src={backgroundImage}
          alt="profile-background-image"
        />
      </div>
      <div className="flex justify-center overflow-hidden w-24 h-24 ml-7 -mt-12 bg-black outline-3 outline-white rounded-full">
        <img
          className="object-cover"
          src={data.avatar || avatar}
          alt="profile-page-image"
        />
      </div>
      <div className="ml-5 flex justify-between">
        <h2 className="text-xl font-bold inline-flex flex-col dark:text-white">
          {data?.name}
          <p className="text-gray-400 text-sm font-normal">
            {"@" + data?.name + data?.id}
          </p>
        </h2>
        <button className="cursor-pointer text-sm -mt-9 mr-5 rounded-full w-28 h-8 hover:bg-blue-300 bg-blue-400 text-white font-bold">
          Edit Profile
        </button>
      </div>
      <p className="px-5 mt-2 dark:text-white">
        A good Twitter bio should be concise, engaging, and reflect your
        personality or brand.
      </p>
      <h2 className="ml-5 mt-1 gap-2 text-gray-400 inline-flex">
        <SlCalender className="mt-0.5" />
        {data?.created_at.slice(0, 10)}
      </h2>
      <div className="px-5">
        <h2 className="inline-flex gap-1 font-light dark:text-white">
          <span className="font-bold">{Math.floor(Math.random() * 100)}</span>
          Following
        </h2>
        <h2 className="inline-flex ml-3 gap-1 font-light dark:text-white">
          <span className="font-bold">{Math.floor(Math.random() * 100)}</span>
          Followers
        </h2>
      </div>
      <div className="mt-3 text-lg font-bold text-gray-600 flex justify-evenly">
        <h2 className="cursor-pointer inline-flex flex-col dark:text-white">
          Tweets
          <span className="rounded-full bg-blue-400 h-1 mb-1 w-full "></span>
        </h2>
        <h2 className="cursor-pointer inline-flex flex-col">
          Tweets & replies
          {/* <span className="rounded-full bg-blue-400 h-1 w-full"></span> */}
        </h2>
        <h2 className="cursor-pointer inline-flex flex-col">
          Media
          {/* <span className="rounded-full bg-blue-400 h-1 w-full"></span> */}
        </h2>
        <h2 className="cursor-pointer inline-flex flex-col">
          Likes
          {/* <span className="rounded-full bg-blue-400 h-1 w-full"></span> */}
        </h2>
      </div>
    </div>
  );
};

export default MainProfile;
