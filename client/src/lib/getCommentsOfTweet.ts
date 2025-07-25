import { client } from "./client";
import { queryOptions, useQuery } from "@tanstack/react-query";
export const getCommentQueryOptions = (id: number) => {
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

const getTweetComments = (id: number) => useQuery(getCommentQueryOptions(id));

export default getTweetComments;
