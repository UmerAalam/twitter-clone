import { createFileRoute, useParams } from "@tanstack/react-router";
import FollowersPage from "../../pages/FollowersPage";

export const Route = createFileRoute("/followers/$profileID")({
  component: RouteComponent,
});

function RouteComponent() {
  const userID = useParams({ from: "/followers/$profileID" });
  return <FollowersPage id={Number(userID.profileID)} />;
}
