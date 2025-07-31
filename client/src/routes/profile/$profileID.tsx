import { createFileRoute, useParams } from "@tanstack/react-router";
import MainProfile from "../../pages/MainProfile";

export const Route = createFileRoute("/profile/$profileID")({
  component: RouteComponent,
});

function RouteComponent() {
  const userID = useParams({ from: "/profile/$profileID" });
  return MainProfile({ id: userID.profileID });
}
