import { useEffect, useState } from "react";
import HomeFeed from "../components/HomeFeed";
const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = document.cookie;
    if (token) {
      if (token.includes("token=")) {
        setIsLoggedIn(true);
      }
    }
  }, []);
  return (
    <>
      {isLoggedIn ? <div>User is Logged In</div> : <div>Want to Sign Up</div>}
      <HomeFeed />
    </>
  );
};

export default HomePage;
