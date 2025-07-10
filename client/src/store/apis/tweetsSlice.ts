import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
  }),
  tagTypes: ["tweets", "users"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      providesTags: ["users"],
      query: () => "/users",
    }),
    addUser: builder.mutation({
      query: (newUser) => ({
        url: "/users",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["users"],
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
