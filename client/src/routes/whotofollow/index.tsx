import { createFileRoute } from "@tanstack/react-router";
import WhoToFollowPage from "../../pages/WhoToFollowPage";

export const Route = createFileRoute("/whotofollow/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <WhoToFollowPage />;
}
