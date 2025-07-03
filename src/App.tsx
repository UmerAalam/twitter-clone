import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router";
import ProfilePage from "./pages/ProfilePage";
import Homepage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Homepage />} />
        <Route path="/user" element={<ProfilePage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
