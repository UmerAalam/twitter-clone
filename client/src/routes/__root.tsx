import { Outlet, createRootRoute } from "@tanstack/react-router";
import MenuBar from "../components/MenuBar";
import TrendsBar from "../components/TrendsBar";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="flex justify-center dark:bg-gray-700 min-h-screen">
      <div className="fixed w-1/4 pr-3 top-0 left-0 p-3">
        <MenuBar />
      </div>
      <div className="w-1/2 p-3">
        <Outlet />
        <TanStackRouterDevtools />
      </div>
      <div className="fixed pl-3 w-1/4 top-0 right-0 p-3">
        <TrendsBar />
      </div>
    </div>
  );
}
// <React.Fragment>
//   <Outlet />
// </React.Fragment>
