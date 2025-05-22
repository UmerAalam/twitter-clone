import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router";
import HomePage from "./pages/HomePage";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(<Route path="/" element={<HomePage />} />)
  );

  return <RouterProvider router={router} />;
};

export default App;
