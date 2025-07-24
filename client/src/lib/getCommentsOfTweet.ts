import { client } from "./client";
import { queryOptions, useQuery } from "@tanstack/react-query";
interface Comments {
  id: number;
  text: string;
  tweet_id: number;
  created_at: string;
}
const getCommentQueryOptions = (id: string) => {
  return queryOptions({
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const res = await client.api.comments[":id"].$get(
        {
          param: { id },
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
    queryKey: ["user", "detail", id],
  });
};

const getTweetComments = (id: string) => useQuery(getCommentQueryOptions(id));

export default getTweetComments;
