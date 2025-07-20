import { createFileRoute } from "@tanstack/react-router";
import CommentPage from "../../pages/CommentPage";

export const Route = createFileRoute("/tweets/$tweetId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { tweetId } = Route.useParams();
  return <CommentPage tweetId={tweetId} />;
}
