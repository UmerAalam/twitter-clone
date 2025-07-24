import { client } from "./client";
import { queryOptions, useQuery } from "@tanstack/react-query";
interface Comments {
  id: number;
  text: string;
  tweet_id: number;
  created_at: string;
}
const getCommentQueryOptions = (id: number) => {
  return queryOptions({
    queryFn: async () => {
      const token = localStorage.getItem("token");
      console.log("id");
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
    queryKey: [id],
  });
};

const getTweetComments = (id: number) => useQuery(getCommentQueryOptions(id));

export default getTweetComments;
