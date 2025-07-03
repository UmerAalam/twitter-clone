import React from "react";
import ComposedTweet from "./ComposedTweet";
import ComposeTweet from "./ComposeTweet";

const HomeFeed = () => {
  return (
    <>
      <div className="h-screen bg-gray-50 rounded-2xl">
        <div className="font-bold pl-5 pt-3 text-xl text-gray-700">
          <span>Home</span>
        </div>
        <hr />
        <ComposeTweet />
        <hr />
        {/* {feedTweets.map((tweet) => {
          return (
            <>
              <hr />
              <ComposedTweet
                name={tweet.name}
                username={tweet.username}
                tweetText={tweet.tweetText}
                time={tweet.time}
                profileImage={tweet.profileImage}
              />
            </>
          );
        })} */}
      </div>
    </>
  );
};

export default HomeFeed;

// const feedTweets = [
//   {
//     name: "Ejaz Ahmad",
//     username: "ejazahmad05",
//     time: "7h",
//     profileImage: "",
//     tweetText: `Lorem ipsum dolor sit amet consectetur adipisicing elit. A velit,
//             doloribus corrupti alias, dolor cum blanditiis, mollitia debitis
//             illo ea ut? Suscipit sint at explicabo quos deserunt ipsum eaque
//             nulla.`,
//   },
//   {
//     name: "Sajeel Aalam",
//     username: "sajeelaalam",
//     time: "7h",
//     profileImage:
//       "https://ugc.production.linktr.ee/75ca4cbb-8c52-494b-a806-7e0d517d73b1_FullSizeRender.jpeg?io=true&size=avatar-v3_0",
//     tweetText: `Lorem ipsum dolor sit amet consectetur adipisicing elit. A velit,
//             doloribus corrupti alias, dolor cum blanditiis, mollitia debitis
//             illo ea ut? Suscipit sint at explicabo quos deserunt ipsum eaque
//             nulla.`,
//   },
//   {
//     name: "Umer Razzaq",
//     username: "umerrazzaq2022",
//     time: "7h",
//     profileImage: "",
//     tweetText: `Lorem ipsum dolor sit amet consectetur adipisicing elit. A velit,
//             doloribus corrupti alias, dolor cum blanditiis, mollitia debitis
//             illo ea ut? Suscipit sint at explicabo quos deserunt ipsum eaque
//             nulla.`,
//   },];
