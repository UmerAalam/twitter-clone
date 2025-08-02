import { createFileRoute } from "@tanstack/react-router";
import BookmarksPage from "../../pages/BookmarksPage";

export const Route = createFileRoute("/bookmarks/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <BookmarksPage />;
}
