import { createFileRoute, useParams } from "@tanstack/react-router";
import FollowingPage from "../../pages/FollowingPage";

export const Route = createFileRoute("/following/$profileID")({
  component: RouteComponent,
});

function RouteComponent() {
  const userID = useParams({ from: "/following/$profileID" });
  return <FollowingPage id={Number(userID.profileID)} />;
}
