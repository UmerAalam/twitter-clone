import { queryOptions, useQuery } from "@tanstack/react-query";
import { client } from "../lib/client";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export const tweetDetailQueryOptions = (id: number) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/sign-in");
  }
  return queryOptions({
    queryFn: async () => {
      const res = await client.api.tweets[":id"].$get(
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
    queryKey: ["tweets", "details", { id }],
    enabled: !!id,
  });
};

const CommentPage = () => {
  const params = useParams();
  const { isLoading, data } = useQuery(
    tweetDetailQueryOptions(parseInt(params.id!)),
  );
  return (
    <div>
      {isLoading ? (
        <div>Loading Tweet Data</div>
      ) : (
        JSON.stringify(data, null, 4)
      )}
    </div>
  );
};

export default CommentPage;
