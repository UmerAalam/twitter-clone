import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { client } from "./client";
export interface UserData {
  id: number;
  name: string;
  username: string;
  email: string;
  avatar: string;
  created_at: string;
  updated_at: string;
}
const getUserDataByID = async (id: number) => {
  const token = localStorage.getItem("token");
  if (!token) return;
  const userData = await client.api.auth[":id"].$get(
    { json: { id } },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return userData;
};
const useUserData = () => {
  const navigate = useNavigate();
  const [userData, setUseData] = useState<UserData | null>(null);
  useEffect(() => {
    const userDataString = localStorage.getItem("UserData");
    if (!userDataString) {
      navigate({ to: "/sign-up" });
      return;
    }
    const userData: UserData = userDataString
      ? JSON.parse(userDataString)
      : null;
    const userDataUpdated: UserData = {
      id: userData.id,
      name: ConvertToUpperCase(userData.name),
      username: GenerateUsername(userData.name),
      email: userData.email,
      avatar: userData.avatar,
      created_at: userData.created_at,
      updated_at: userData.updated_at,
    };
    setUseData(userDataUpdated);
  }, []);
  return userData;
};
function GenerateUsername(name: string) {
  let getUserNumber = localStorage.getItem("userNumber");
  if (!getUserNumber) {
    getUserNumber = GenerateUserNumber();
    localStorage.setItem("userNumber", getUserNumber);
  }
  const username = "@" + name + getUserNumber;
  return username;
}
function GenerateUserNumber() {
  return Math.floor(Math.random() * 100).toString();
}
function ConvertToUpperCase(data: string) {
  const upperCaseData = data.charAt(0).toUpperCase() + data.slice(1);
  return upperCaseData;
}

export { ConvertToUpperCase, useUserData };
