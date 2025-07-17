import { useEffect, useState } from "react";
import HomeFeed from "../components/HomeFeed";
import { client } from "../lib/client";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchToken = async () => {
      const token = localStorage.getItem("token");
      const res = await client.api.auth.me.$get(
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!res.ok) {
        navigate("/sign-in");
        throw new Error("Invalid Token Need To Sign In Again");
      }
      const data = await res.json();
      localStorage.setItem("UserData", JSON.stringify(data));
      setIsLoggedIn(true);
      return data;
    };
    fetchToken();
  }, []);
  return (
    <>
      <HomeFeed />
      {isLoggedIn ? (
        <div className="flex justify-center">User is Logged In</div>
      ) : (
        <div className="flex justify-center">Need to Sign Up</div>
      )}
    </>
  );
};

export default HomePage;
