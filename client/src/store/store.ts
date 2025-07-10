import { configureStore } from "@reduxjs/toolkit";
import {
  api,
  useAddPostMutation,
  useGetPostsQuery,
  useGetUsersQuery,
  useAddUserMutation,
} from "./apis/tweetsSlice";
const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
export {
  useAddPostMutation,
  useGetPostsQuery,
  useGetUsersQuery,
  useAddUserMutation,
};
export default store;
