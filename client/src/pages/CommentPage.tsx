import { queryOptions, useQuery } from "@tanstack/react-query";
import { client } from "../lib/client";
import { useParams } from "react-router-dom";

export const tweetDetailQueryOptions = (id: number) => {
  return queryOptions({
    queryFn: async () => {
      const res = await client.api.tweets[":id"].$get({
        param: { id: String(id) },
      });
      const data = await res.json();
      return data;
    },
    queryKey: ["tweets", "details", { id }],
    enabled: !!id,
  });
};

const CommentPage = () => {
  const params = useParams();
  const { isLoading, data } = useQuery(
    tweetDetailQueryOptions(parseInt(params.id!)),
  );
  return <div>{JSON.stringify(data, null, 4)}</div>;
};

export default CommentPage;
