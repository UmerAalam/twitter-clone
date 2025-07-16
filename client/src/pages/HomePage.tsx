import { useEffect, useState } from "react";
import HomeFeed from "../components/HomeFeed";
const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
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
