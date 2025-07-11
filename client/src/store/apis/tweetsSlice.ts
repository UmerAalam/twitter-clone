import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
  }),
  tagTypes: ["tweets", "auth"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      providesTags: ["auth"],
      query: () => "/auth/sign-in",
    }),
    addUser: builder.mutation({
      query: (newUser) => ({
        url: "/auth/sign-up",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["auth"],
    }),
    getPosts: builder.query({
      providesTags: ["tweets"],
      query: () => "/tweets",
    }),
    addPost: builder.mutation({
      query: (newTweet) => ({
        url: "/tweets",
        method: "POST",
        body: newTweet,
      }),
      invalidatesTags: ["tweets"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useAddPostMutation,
  useGetUsersQuery,
  useAddUserMutation,
} = api;
