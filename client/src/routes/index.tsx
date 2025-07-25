import { createFileRoute } from "@tanstack/react-router";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
export const Route = createFileRoute("/")({
  component: RouteComponent,
  notFoundComponent: NotFoundPage,
});

function RouteComponent() {
  return <HomePage />;
}
