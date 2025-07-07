// services/api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:3000/api",
  }),
  tagTypes: ["tweets"],
  endpoints: (builder) => ({
    getPosts: builder.query({
      providesTags: ["tweets"],
      query: () => "/tweets",
    }),
    addPost: builder.mutation({
      query: (newTweet) => ({
        url: "/tweets",
        method: "POST",
        body: newTweet,
      })
    })
  }),
});

export const { useGetPostsQuery, useAddPostMutation } = api;
