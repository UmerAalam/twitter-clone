import { client } from "./client";
import {
  queryOptions,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
interface UserData {
  id: number;
  name: string;
  avatar: string;
  bio: string;
  created_at: string;
  updated_at: string;
}
export const userDataQueryOptions = (id: string) => {
  return queryOptions({
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const res = await client.api.users[":id"].$get(
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

      return data as UserData;
    },
    queryKey: ["user", "detail", id],
    enabled: !!id,
  });
};

export const useInfiniteUsersQuery = () => {
  return useInfiniteQuery({
    queryKey: ["users", "list"],
    queryFn: async ({ pageParam = 1 }) => {
      const token = localStorage.getItem("token");
      const res = await client.api.users.$get(
        {
          query: { page: pageParam.toString() },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      return data as UserData[];
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
export const usersDataQueryOptions = (userCount: number) => {
  return queryOptions({
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const res = await client.api.users.$get(
        {
          query: { userCount: userCount.toString() },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      return data as UserData[];
    },
    queryKey: ["user", "list", userCount],
  });
};
const useUserCountData = (userCount: number) =>
  useQuery(usersDataQueryOptions(userCount));
const useCustomUserData = (id: string) => useQuery(userDataQueryOptions(id));

export default useCustomUserData;
export { useUserCountData };
