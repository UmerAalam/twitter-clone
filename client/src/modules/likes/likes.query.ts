import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { client } from "../../lib/client";
import type {
  DeleteLike,
  TweetLike,
} from "../../../../server/src/modules/likes/likes.dto";

export const useTweetLike = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (tweetLike: TweetLike) => {
      const token = localStorage.getItem("token");
      const res = await client.api.likes.$post(
        {
          json: tweetLike,
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
      return tweetLike;
    },
    onMutate: async (newTweetLike: TweetLike) => {
      await queryClient.cancelQueries({
        queryKey: ["tweets", "list"],
      });

      const previousTweets = queryClient.getQueryData(["tweets", "list"]);

      queryClient.setQueryData(
        ["tweets", "list", newTweetLike.tweetId, "likes"],
        newTweetLike,
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

export const useDeleteTweetLike = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ tweetId }: DeleteLike) => {
      const token = localStorage.getItem("token");
      const res = await client.api.likes.$delete(
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
      return { tweetId };
    },
    onMutate: async ({ tweetId }) => {
      await queryClient.cancelQueries({
        queryKey: ["tweets", "list"],
      });

      const previousTweets = queryClient.getQueryData(["tweets", "list"]);

      queryClient.setQueryData(["tweets", "list", tweetId, "likes"], null);

      return { previousTweets };
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["tweets", "list"],
      });
    },
  });
};
const listLikesByTweetId = (id: number) => {
  return queryOptions({
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const res = await client.api.likes.$get(
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
    queryKey: ["likes", "count", id],
  });
};

export const useLikesCountByTweetId = (tweetId: number) =>
  useQuery(listLikesByTweetId(tweetId));
