import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Follow } from "../../../../server/src/modules/follow/follow.dto";
import { client } from "../../lib/client";

export const useInfiniteFollowingQuery = (id: number) => {
  return useInfiniteQuery({
    queryKey: ["followers", "list"],
    queryFn: async ({ pageParam = 1 }) => {
      const token = localStorage.getItem("token");
      const res = await client.api.follows.following.$get(
        {
          query: {
            targetUserId: id.toString(),
            page: pageParam.toString(),
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await res.json();
      console.log(data);
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
export const useInfiniteFollowersQuery = (id: number) => {
  return useInfiniteQuery({
    queryKey: ["followers", "list"],
    queryFn: async ({ pageParam = 1 }) => {
      const token = localStorage.getItem("token");
      const res = await client.api.follows.followers.$get(
        {
          query: { targetUser: id.toString(), page: pageParam.toString() },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await res.json();
      console.log(data);
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
export const useFollowPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (follow: Follow) => {
      console.log(follow);
      const token = localStorage.getItem("token");
      const res = await client.api.follows.$post(
        {
          json: follow,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!res.ok) {
        throw new Error("Error creating follow");
      }
      return res;
    },
    onMutate: async (newFollow: Follow) => {
      await queryClient.cancelQueries({
        queryKey: ["follows", "list"],
      });

      const previousFollows = queryClient.getQueryData(["follows", "list"]);

      queryClient.setQueryData(["follows", "list"], newFollow);

      return { previousFollows };
    },
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({
        queryKey: ["follows", "list"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user", "detail", String(vars.targetUser)],
      });
    },
  });
};
export const useFollowDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (follow: Follow) => {
      const token = localStorage.getItem("token");
      const res = await client.api.follows.$delete(
        {
          query: { targetUser: follow.targetUser.toString() },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!res.ok) {
        throw new Error("Error deleting follow");
      }
      return res;
    },
    onMutate: async (newFollow: Follow) => {
      await queryClient.cancelQueries({
        queryKey: ["follows", "list"],
      });

      const previousFollows = queryClient.getQueryData(["follows", "list"]);

      queryClient.setQueryData(["follows", "list"], newFollow);

      return { previousFollows };
    },
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({
        queryKey: ["follows", "list"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user", "detail", String(vars.targetUser)],
      });
    },
  });
};
