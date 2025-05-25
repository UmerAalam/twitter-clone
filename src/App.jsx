import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(<Route path="/" element={<SignUpPage />} />)
  );

  return <RouterProvider router={router} />;
};

export default App;
