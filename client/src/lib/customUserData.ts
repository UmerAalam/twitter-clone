import { client } from "./client";
import { queryOptions, useQuery } from "@tanstack/react-query";
interface UserData {
  id: number;
  name: string;
  email: string;
  avatar: string;
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
  });
};

const useCustomUserData = (id: string) => useQuery(userDataQueryOptions(id));

export default useCustomUserData;
