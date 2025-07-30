import { SlCalender } from "react-icons/sl";
import useCustomUserData from "../lib/customUserData";
import TweetList from "../components/TweetsList";
import { useEffect, useRef, useState } from "react";
import { useUpdateUserData } from "../modules/auth/auth.query";
import { UpdatedUser } from "../../../server/src/modules/auth/auth.dto";

const MainProfile = () => {
  const id = localStorage.getItem("userId") || "0";
  const { mutate: updateUserDataMutation, isPending } = useUpdateUserData();
  const { data, isLoading } = useCustomUserData(id);
  const [bio, setBio] = useState<string>("");
  const [editMode, setEditMode] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const backgroundImage =
    "https://cdn.pixabay.com/photo/2022/01/01/16/29/antelope-6908215_1280.jpg";
  useEffect(() => {
    if (data && data.bio) {
      setBio(data.bio);
    }
  }, [data]);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        textareaRef.current &&
        !textareaRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setEditMode(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleSaveProfile = () => {
    console.log("EditMode", editMode);
    if (!editMode) {
      setEditMode(true);
    } else {
      const updatedUser: UpdatedUser = {
        id: Number(id),
        bio,
      };
      updateUserDataMutation(updatedUser, {
        onSuccess: () => {
          setEditMode(false);
        },
      });
    }
  };
  if (isLoading)
    return (
      <div className="text-gray-800 dark:text-white flex justify-center">
        Loading User Data
      </div>
    );
  if (isPending)
    return (
      <div className="text-gray-800 dark:text-white flex justify-center">
        Loading UserMutation
      </div>
    );
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
          src={data?.avatar}
          alt="profile-page-image"
        />
      </div>
      <div className="px-6 pt-1 flex justify-between">
        <h2 className="text-xl font-bold inline-flex flex-col dark:text-white">
          {data?.name}
          <p className="text-gray-400 text-sm font-normal">
            {"@" + data?.name.replace(" ", "").toLowerCase() + data?.id}
          </p>
        </h2>
        <button
          ref={buttonRef}
          onClick={handleSaveProfile}
          className="cursor-pointer text-sm -mt-9 rounded-full w-28 h-8 hover:bg-blue-300 bg-blue-400 text-white font-bold"
        >
          {editMode
            ? isPending
              ? "Saving..."
              : "Save Profile"
            : "Edit Profile"}
        </button>
      </div>
      {editMode ? (
        <textarea
          ref={textareaRef}
          maxLength={100}
          autoFocus
          inputMode="text"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="px-5 mt-2 w-full dark:text-white resize-none outline-2 outline-white rounded-xl"
        />
      ) : (
        <p className="px-5 mt-2 w-full dark:text-white resize-none">{bio}</p>
      )}
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
      <TweetList userId={Number(id)} />
    </div>
  );
};

export default MainProfile;
