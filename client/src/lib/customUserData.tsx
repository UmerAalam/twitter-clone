import { useEffect, useState } from "react";
import { client } from "./client";
type UserData = {
  id: number;
  name: string;
  username: string;
  email: string;
  avatar: string;
  created_at: string;
  updated_at: string;
};
const useCustomUserData = (id: number) => {
  const [userData, setUserData] = useState<Promise<UserData> | null>(null);
  useEffect(() => {
    const getUserDataByID = async (id: number) => {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await client.api.users.$get(
        { json: { id } },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!res.ok) {
        throw new Error("Response Error");
      }
      return res.json();
    };
    setUserData(getUserDataByID(id));
  }, []);
  return userData;
};
export default useCustomUserData;
