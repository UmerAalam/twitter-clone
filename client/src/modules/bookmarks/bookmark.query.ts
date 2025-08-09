import {
  queryOptions,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { client } from "../../lib/client";
import type {
  TweetBookmark,
  DeleteBookmark,
} from "../../../../server/src/modules/bookmarks/bookmarks.dto.js";
import { Tweet } from "../../../../server/src/modules/tweet/tweet.dto.js";

export const useInfiniteBookmarksQuery = () => {
  return useInfiniteQuery({
    queryKey: [
      "tweets",
      "list",
      "details",
      "page",
      "count",
      "likes",
      "bookmarks",
    ],
    queryFn: async ({ pageParam = 1 }) => {
      const token = localStorage.getItem("token");
      const res = await client.api.bookmarks.$get(
        {
          query: { page: pageParam },
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
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (!lastPage || lastPage.length < 10) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
      return firstPageParam > 1 ? firstPageParam - 1 : undefined;
    },
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
    onMutate: async (newTweetBookmark: TweetBookmark) => {
      await queryClient.cancelQueries({
        queryKey: ["tweets", "list"],
      });

      const previousTweets = queryClient.getQueryData(["tweets", "list"]);

      queryClient.setQueryData(
        ["tweets", "list", newTweetBookmark.tweetId, "likes"],
        newTweetBookmark,
      );

      return { previousTweets };
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["tweets", "list"],
      });
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
