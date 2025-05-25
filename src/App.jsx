import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(<Route path="/" element={<SignInPage />} />)
  );

  return <RouterProvider router={router} />;
};

export default App;
