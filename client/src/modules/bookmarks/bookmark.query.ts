import {
  queryOptions,
  useMutation,
  useQuery,
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
import { Tweet } from "../../../../server/src/modules/tweet/tweet.dto.js";

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
    onMutate: async ({ tweetId }) => {
      await queryClient.cancelQueries({
        queryKey: ["tweets", "list"],
      });

      const previousTweets = queryClient.getQueryData(["tweets", "list"]);

      queryClient.setQueryData(["tweets", "list", tweetId, "likes"], tweetId);

      return { previousTweets };
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["tweets", "list"],
      });
    },
  });
};
export const bookmarkListQueryOptions = () => {
  return queryOptions({
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const res = await client.api.bookmarks.$get(
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await res.json();
      return data as Tweet[];
    },
    queryKey: ["tweets", "bookmarks", "likes", "count", "list"],
  });
};
export const useBookmarkList = () => {
  return useQuery(bookmarkListQueryOptions());
};
