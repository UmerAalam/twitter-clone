import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { client } from "../../lib/client";
import type {
  TweetBookmark,
  DeleteBookmark,
} from "../../../../server/src/modules/bookmarks/bookmarks.dto.js";
import {
  tweetDetailQueryOptions,
  tweetListQueryOptions,
} from "../tweets/tweets.query";

const listTweetBookmarkByTweetId = (id: number) => {
  return queryOptions({
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const res = await client.api.bookmarks.$get(
        {
          param: { tweetId: id },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await res.json();
      return data;
    },
    queryKey: ["bookmarks", "count", id],
  });
};
export const useTweetBookmark = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (tweetBookmark: TweetBookmark) => {
      const token = localStorage.getItem("token");
      const res = await client.api.bookmarks.$post(
        {
          json: tweetBookmark,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!res.ok) {
        throw new Error("Error creating comment");
      }
    },
    onSuccess: async (_, { tweetId }) => {
      await queryClient.invalidateQueries(
        listTweetBookmarkByTweetId(Number(tweetId)),
      );
      await queryClient.invalidateQueries(tweetListQueryOptions());
      await queryClient.invalidateQueries(
        tweetDetailQueryOptions(Number(tweetId)),
      );
    },
  });
};
export const useDeleteBookmark = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ tweetId }: DeleteBookmark) => {
      const token = localStorage.getItem("token");
      const res = await client.api.bookmarks.$delete(
        {
          json: { tweetId },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!res.ok) {
        throw new Error("Error while updating like");
      }
    },
    onSuccess: async (_, { tweetId }) => {
      await queryClient.invalidateQueries(tweetListQueryOptions());
      await queryClient.invalidateQueries(
        listTweetBookmarkByTweetId(Number(tweetId)),
      );
      await queryClient.invalidateQueries(
        tweetDetailQueryOptions(Number(tweetId)),
      );
    },
  });
};
