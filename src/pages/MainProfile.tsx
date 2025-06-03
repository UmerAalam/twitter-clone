import React from "react";
import ComposedTweet from "../components/ComposedTweet";
import { SlCalender } from "react-icons/sl";

const MainProfile = () => {
  return (
    <div className=" bg-gray-50 rounded-2xl">
      <div className="flex justify-center h-48">
        <img
          className="object-cover w-full h-full"
          src="https://cdn.pixabay.com/photo/2022/01/01/16/29/antelope-6908215_1280.jpg"
          alt="profile-background-image"
        />
      </div>
      <div className="flex justify-center overflow-hidden w-24 h-24 ml-7 -mt-12 bg-black outline-3 outline-white rounded-full">
        <img
          className="object-cover"
          src="https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1.jpeg"
          alt="profile-page-image"
        />
      </div>
      <div className="ml-5 flex justify-between">
        <h2 className="text-xl font-bold inline-flex flex-col">
          Umer Razzaq
          <h2 className="text-gray-400 text-sm font-normal">@umer2022</h2>
        </h2>
        <button className="cursor-pointer -mt-9 mr-5 rounded-full w-28 h-8 hover:bg-blue-300 bg-blue-400 text-white font-bold">
          Edit Profile
        </button>
      </div>
      <p className="px-5 mt-2">
        A good Twitter bio should be concise, engaging, and reflect your
        personality or brand.
      </p>
      <h2 className="ml-5 mt-1 gap-2 text-gray-400 inline-flex">
        <SlCalender className="mt-0.5" />
        Joined September 2020
      </h2>
      <div className="px-5">
        <h2 className="inline-flex gap-1 font-light">
          <span className="font-bold">{Math.floor(Math.random() * 100)}</span>
          Following
        </h2>
        <h2 className="inline-flex ml-3 gap-1 font-light">
          <span className="font-bold">{Math.floor(Math.random() * 100)}</span>
          Followers
        </h2>
      </div>
      <div className="mt-3 text-lg font-bold text-gray-600 flex justify-evenly">
        <h2 className="cursor-pointer inline-flex flex-col">
          Tweets
          <span className="rounded-full bg-blue-400 h-1 w-full"></span>
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
      <ComposedTweet name="Umar Aalam" tweetText="Hi,I'm Umer Aalam" />
      <ComposedTweet name="Sajeel Aalam" tweetText="Hi,I'm Sajeel Aalam" />
      <ComposedTweet name="Ejaz Ahmad" tweetText="Hi,I'm Ejaz Aalam" />
      <ComposedTweet name="Umar Aalam" tweetText="Hi,I'm Umer Aalam" />
    </div>
  );
};

export default MainProfile;
