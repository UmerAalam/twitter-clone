import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { client } from "../../lib/client";
import { TweetComment } from "../../../../server/src/modules/comments/comment.dto";

const listCommentByTweetId = (id: number) => {
  return queryOptions({
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const res = await client.api.comments[":id"].$get(
        {
          param: { id: String(id) },
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
    queryKey: ["comments", "list", id],
  });
};

export const useCommentListByTweetId = (tweetId: number) =>
  useQuery(listCommentByTweetId(tweetId));

export const useCreateCommentReply = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (comment: TweetComment) => {
      const token = localStorage.getItem("token");
      const res = await client.api.comments.$post(
        {
          json: comment,
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
        listCommentByTweetId(Number(tweetId)),
      );
    },
  });
};
