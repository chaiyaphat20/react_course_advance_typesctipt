import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/home-page";
import LoginPage from '../pages/login-page';
import RegisterPage from "../pages/register-page";
import routeDashboard from "./dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  ...routeDashboard,
]);

export default router;
