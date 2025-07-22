import {
  Outlet,
  createRootRoute,
  useRouterState,
} from "@tanstack/react-router";
import MenuBar from "../components/MenuBar";
import TrendsBar from "../components/TrendsBar";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
export const Route = createRootRoute({
  component: RootComponent,
});
function RootComponent() {
  const { location } = useRouterState();
  const hideSidebars = ["/sign-in", "/sign-up"];
  const shouldHide = hideSidebars.includes(location.pathname);
  return (
    <div className="flex justify-center dark:bg-gray-700 min-h-screen">
      {!shouldHide && (
        <div className="fixed w-1/4 pr-3 top-0 left-0 p-3">
          <MenuBar />
        </div>
      )}
      <div className={`${shouldHide ? "w-full" : "w-1/2"} p-3`}>
        <Outlet />
        <TanStackRouterDevtools />
      </div>
      {!shouldHide && (
        <div className="fixed pl-3 w-1/4 top-0 right-0 p-3">
          <TrendsBar />
        </div>
      )}
    </div>
  );
}
