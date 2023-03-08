import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/home-page";
import RegisterPage from '../pages/register-page';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

export default router;
