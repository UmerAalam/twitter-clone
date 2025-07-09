import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router";
import ProfilePage from "./pages/ProfilePage";
import Homepage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Homepage />} />
        <Route path="/user" element={<ProfilePage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element=<SignInPage /> />
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
};

export default App;
