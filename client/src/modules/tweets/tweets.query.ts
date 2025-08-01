import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { client } from "../../lib/client";
import {
  CreateTweet,
  FindManyTweet,
} from "../../../../server/src/modules/tweet/tweet.dto";

export const tweetListQueryOptions = (
  { count, userId, page }: FindManyTweet = { count: 10, page: 1 },
) => {
  return queryOptions({
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const res = await client.api.tweets.$get(
        {
          query: {
            userId: String(userId),
            count: count ? String(count) : undefined,
            page: page ? String(page) : undefined,
          },
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
    queryKey: ["tweets", "list", userId],
  });
};

export const useTweetList = (props: FindManyTweet) => {
  return useQuery(tweetListQueryOptions(props));
};
export const tweetDetailQueryOptions = (id: number) => {
  const token = localStorage.getItem("token");

  return queryOptions({
    queryFn: async () => {
      const res = await client.api.tweets[":id"].$get(
        {
          param: { id: String(id) },
        },
        {
          headers: {
            ...(token && {
              Authorization: `Bearer ${token}`,
            }),
          },
        },
      );
      const data = await res.json();
      return data;
    },
    queryKey: ["tweets", "details", { id }],
    enabled: !!id,
  });
};

export const useTweetDetail = (id: number) => {
  return useQuery(tweetDetailQueryOptions(id));
};

export const useCreateTweet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (props: CreateTweet) => {
      const token = localStorage.getItem("token");
      const res = await client.api.tweets.$post(
        {
          json: {
            text: props.text,
            userId: props.userId,
            createdAt: props.createdAt,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!res.ok) {
        throw new Error("Error creating tweet");
      }
      const parsedRes = await res.json();
      await queryClient.invalidateQueries(tweetListQueryOptions());
      await queryClient.invalidateQueries(
        tweetDetailQueryOptions(Number(parsedRes.id)),
      );
    },
  });
};
