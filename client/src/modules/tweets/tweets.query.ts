import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { client } from "../../lib/client";
import { CreateTweet } from "../../../../server/src/modules/tweet/tweet.dto";
export const tweetListQueryOptions = () => {
  return queryOptions({
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const res = await client.api.tweets.$get(
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await res.json();
      return data;
    },
    queryKey: ["tweets", "list"],
  });
};

export const useTweetList = () => {
  return useQuery(tweetListQueryOptions());
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
            ...props,
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
