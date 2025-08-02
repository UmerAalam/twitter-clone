import { createFileRoute } from "@tanstack/react-router";
import BookmarkList from "../../components/BookmarkList";

export const Route = createFileRoute("/bookmarks/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <BookmarkList />;
}
