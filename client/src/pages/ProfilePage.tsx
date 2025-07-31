import { useParams } from "@tanstack/react-router";
import MainProfile from "./MainProfile";

const ProfilePage = () => {
  const userID = useParams({ from: "/profile/$profileID" });
  return (
    <div>
      <MainProfile id={userID.profileID} />
    </div>
  );
};

export default ProfilePage;
