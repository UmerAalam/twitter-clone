import { SlCalender } from "react-icons/sl";
import useCustomUserData from "../lib/customUserData";
import TweetList from "../components/TweetsList";
import { useEffect, useRef, useState } from "react";
import { useUpdateUserData } from "../modules/auth/auth.query";
import { UpdatedUser } from "../../../server/src/modules/auth/auth.dto";
import { MdOutlineCameraAlt } from "react-icons/md";
import { uploadImageToS3 } from "../modules/upload/upload.query";
import { useParams } from "@tanstack/react-router";
import { useFollowDelete, useFollowPost } from "../modules/follow/follow.query";
import { Follow } from "../../../server/src/modules/follow/follow.dto";
const MainProfile = (props: { id: string }) => {
  const userId = localStorage.getItem("userId") || "0";
  const { mutate: updateUserDataMutation, isPending } = useUpdateUserData();
  const { data, isLoading } = useCustomUserData(props.id);
  const [bio, setBio] = useState<string>("");
  const [editMode, setEditMode] = useState(false);
  const [owner, setOwner] = useState<boolean | null>(null);
  const [isFollowing, setIsFollowing] = useState<boolean | undefined>(
    data?.isFollowing || undefined,
  );
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const profileBtnRef = useRef<HTMLButtonElement | null>(null);
  const [profileTabCount, setProfileTabCount] = useState(1);
  const { mutate: followMutation } = useFollowPost();
  const { mutate: deleteFollowMutation } = useFollowDelete();
  const targetUser = useParams({ from: "/profile/$profileID" });
  const backgroundImage =
    "https://cdn.pixabay.com/photo/2022/01/01/16/29/antelope-6908215_1280.jpg";
  useEffect(() => {
    if (data && data.bio) {
      setBio(data.bio);
    }
    if (data && data.isFollowing !== undefined) {
      console.log("isFollowing", data.isFollowing);
      setIsFollowing(data.isFollowing);
    }
    if (Number(userId) === Number(props.id)) {
      setOwner(true);
    } else {
      setOwner(false);
    }
    const handleClickOutside = (event: MouseEvent) => {
      if (
        textareaRef.current &&
        !textareaRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        profileBtnRef.current &&
        !profileBtnRef.current.contains(event.target as Node)
      ) {
        setEditMode(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [data, userId, props.id]);
  const handleProfileCount = (index: number) => {
    setProfileTabCount(index);
  };
  const handleSaveProfile = () => {
    if (!editMode) {
      setEditMode(true);
    } else {
      const updatedUser: UpdatedUser = {
        id: Number(props.id),
        bio,
      };
      updateUserDataMutation(updatedUser, {
        onSuccess: () => {
          setEditMode(false);
        },
      });
    }
  };
  const handleFollow = () => {
    if (isFollowing) {
      deleteFollowMutation({ targetUser: Number(targetUser.profileID) });
      setIsFollowing(false);
    } else {
      const follow: Follow = {
        targetUser: Number(targetUser.profileID),
      };
      followMutation(follow);
      setIsFollowing(true);
    }
  };
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();
    const file = event.target.files?.[0];
    if (!file) return;
    const url = await uploadImageToS3(file);
    const updatedUser: UpdatedUser = {
      id: Number(props.id),
      avatar: url,
    };
    updateUserDataMutation(updatedUser, {
      onSuccess: () => {
        setEditMode(false);
      },
    });
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
      <form
        encType="multipart/form-data"
        className="flex justify-center items-center w-24 h-24 ml-7 -mt-12 bg-black rounded-full overflow-hidden"
      >
        {editMode ? (
          <label className="relative flex justify-center items-center w-full h-full cursor-pointer">
            <MdOutlineCameraAlt className="text-white" size={40} />
            <input
              type="file"
              accept="image/*"
              className="absolute opacity-0 w-full h-full cursor-pointer dark:border-white border-blue-500 border-3 rounded-full"
              onChange={(e) => handleImageChange(e)}
              aria-label="Upload profile image"
            />
          </label>
        ) : (
          <img
            className="w-full h-full object-cover dark:border-white border-blue-500 border-3 rounded-full"
            src={data?.avatar}
            alt="Profile image"
          />
        )}
      </form>
      <div className="px-5 pt-1 flex justify-between">
        <h2 className="text-xl text-gray-800 font-bold inline-flex flex-col dark:text-white">
          {data?.name}
          <p className="text-gray-400 text-sm font-normal">
            {"@" + data?.name.replace(" ", "").toLowerCase() + data?.id}
          </p>
        </h2>
        {owner ? (
          <button
            ref={buttonRef}
            onClick={handleSaveProfile}
            className="cursor-pointer text-sm -mt-9 rounded-full w-28 h-9 hover:bg-blue-300 bg-blue-400 dark:hover:bg-gray-300 dark:bg-white dark:text-gray-800 text-white font-bold"
          >
            {editMode
              ? isPending
                ? "Saving..."
                : "Save Profile"
              : "Edit Profile"}
          </button>
        ) : (
          <button
            onClick={() => handleFollow()}
            className="cursor-pointer text-sm -mt-9 rounded-full w-28 h-9 hover:bg-blue-300 bg-blue-400 dark:hover:bg-gray-300 dark:bg-white dark:text-gray-800 text-white font-bold"
          >
            {isFollowing ? "Following" : "Follow"}
          </button>
        )}
      </div>
      {editMode ? (
        <textarea
          ref={textareaRef}
          maxLength={100}
          autoFocus
          inputMode="text"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="text-gray-800 px-5 mt-2 w-full dark:text-white resize-none outline-2 outline-white rounded-xl"
        />
      ) : (
        <p className="text-gray-800 px-5 mt-2 w-full dark:text-white resize-none">
          {bio}
        </p>
      )}
      <h2 className="ml-5 mt-1 gap-2 text-gray-400 inline-flex">
        <SlCalender className="mt-0.5" />
        {data?.created_at.slice(0, 10)}
      </h2>
      <div className="px-5">
        <h2 className="text-gray-800 inline-flex gap-1 font-medium dark:text-white">
          <span className="font-bold">{data?.followingsCount}</span>
          Following
        </h2>
        <h2 className="text-gray-800 inline-flex ml-3 gap-1 font-medium dark:text-white">
          <span className="font-bold">{data?.followersCount}</span>
          Followers
        </h2>
      </div>
      <div className="mt-3 text-lg font-bold flex justify-evenly">
        <h2
          onClick={() => handleProfileCount(1)}
          className={
            profileTabCount === 1
              ? "dark:text-white text-gray-800 cursor-pointer inline-flex flex-col"
              : "text-gray-500 cursor-pointer inline-flex flex-col"
          }
        >
          Tweets
          {profileTabCount === 1 && (
            <span className="rounded-full bg-blue-400 h-1 mb-1 w-full"></span>
          )}
        </h2>
        <h2
          onClick={() => handleProfileCount(2)}
          className={
            profileTabCount === 2
              ? "dark:text-white text-gray-800 cursor-pointer inline-flex flex-col"
              : "text-gray-500 cursor-pointer inline-flex flex-col"
          }
        >
          Tweets & replies
          {profileTabCount === 2 && (
            <span className="rounded-full bg-blue-400 h-1 mb-1 w-full"></span>
          )}
        </h2>
        <h2
          onClick={() => handleProfileCount(3)}
          className={
            profileTabCount === 3
              ? "dark:text-white text-gray-800 cursor-pointer inline-flex flex-col"
              : "text-gray-500 cursor-pointer inline-flex flex-col"
          }
        >
          Media
          {profileTabCount === 3 && (
            <span className="rounded-full bg-blue-400 h-1 mb-1 w-full"></span>
          )}
        </h2>
        <h2
          onClick={() => handleProfileCount(4)}
          className={
            profileTabCount === 4
              ? "dark:text-white text-gray-800 cursor-pointer inline-flex flex-col"
              : "text-gray-500 cursor-pointer inline-flex flex-col"
          }
        >
          Likes
          {profileTabCount === 4 && (
            <span className="rounded-full bg-blue-400 h-1 mb-1 w-full"></span>
          )}
        </h2>
      </div>
      {profileTabCount === 1 && <TweetList userId={Number(props.id)} />}
    </div>
  );
};

export default MainProfile;
