import { configureStore } from "@reduxjs/toolkit";
import { api, useAddPostMutation, useGetPostsQuery } from "./apis/tweetsSlice";
const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
export { useAddPostMutation, useGetPostsQuery };
export default store;
