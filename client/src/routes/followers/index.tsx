import { createFileRoute } from "@tanstack/react-router";
import FollowersPage from "../../pages/FollowersPage";

export const Route = createFileRoute("/followers/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <FollowersPage />;
}
