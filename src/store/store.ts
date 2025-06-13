import { configureStore, PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

//Tweet Object
type Tweet = {
  id: string;
  text: string;
  name: string;
  username: string;
  time: string;
  tweetText: string;
  profileImage: string;
};

type TweetState = {
  tweets: Tweet[];
};

const initialState: TweetState = {
  tweets: [],
};
//Slice For Tweet
const tweetSlice = createSlice({
  name: "tweets",
  initialState,
  reducers: {
    addTweet: (state, action: PayloadAction<Tweet>) => {
      state.tweets.push(action.payload);
    },
  },
});

//store configuration
const store = configureStore({
  reducer: {
    tweet: tweetSlice.reducer,
  },
});

console.log(store);
console.log(tweetSlice);
//exports
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;
export default store;
