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
import SignLayout from "./layouts/SignLayout";
import CommentPage from "./pages/CommentPage";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<MainLayout />}>
          <Route index element={<Homepage />} />
          <Route path="/tweets/:id" element={<CommentPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route element={<SignLayout />}>
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Route>
      </Route>,
    ),
  );
  return <RouterProvider router={router} />;
};

export default App;
