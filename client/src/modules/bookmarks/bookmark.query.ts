import { queryOptions, useQuery } from "@tanstack/react-query";
import { client } from "../../lib/client";

export const bookmarkListQueryOptions = () => {
  return queryOptions({
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const res = await client.api.bookmarks.$get(
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
    queryKey: ["bookmarks", "list"],
  });
};
export const useBookmarkList = () => {
  return useQuery(bookmarkListQueryOptions());
};
