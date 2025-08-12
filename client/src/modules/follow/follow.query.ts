import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Follow } from "../../../../server/src/modules/follow/follow.dto";
import { client } from "../../lib/client";

export const useFollow = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (follow: Follow) => {
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
        throw new Error("Error creating comment");
      }
      return res;
    },
    onMutate: async (newFollow: Follow) => {
      await queryClient.cancelQueries({
        queryKey: ["follows", "list"],
      });

      const previousFollows = queryClient.getQueryData(["follows", "list"]);

      queryClient.setQueryData(
        ["follows", "list", newFollow.followerId, newFollow.followingId],
        newFollow,
      );

      return { previousFollows };
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["follows", "list"],
      });
    },
  });
};
