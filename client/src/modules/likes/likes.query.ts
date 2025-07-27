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
    },
    onSuccess: async (_, { tweetId }) => {
      await queryClient.invalidateQueries(listLikesByTweetId(Number(tweetId)));
    },
  });
};
export const useDeleteTweetLike = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ likeId }: DeleteLike) => {
      const token = localStorage.getItem("token");
      const res = await client.api.likes.$delete(
        {
          json: { likeId },
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
    onSuccess: async (_, { likeId }) => {
      await queryClient.invalidateQueries(listLikesByTweetId(Number(likeId)));
    },
  });
};
