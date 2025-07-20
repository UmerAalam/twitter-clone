import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tweets/$tweetId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/tweet/$tweetId"!</div>;
}
