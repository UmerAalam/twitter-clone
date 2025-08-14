import { createFileRoute } from "@tanstack/react-router";
import FollowingPage from "../../pages/FollowingPage";

export const Route = createFileRoute("/following/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <FollowingPage />;
}
