import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router";
import ProfilePage from "./pages/ProfilePage";
const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(<Route path="/" element={<ProfilePage />} />)
  );

  return <RouterProvider router={router} />;
};

export default App;
