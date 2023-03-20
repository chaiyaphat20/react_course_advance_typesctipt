import { RouteObject } from "react-router-dom";
import AuthGuard from "../guards/auth-guard";
import DHome from "../pages/dashboard/d-home";
import DLayout from "../pages/dashboard/d-layout";
import DLeave from "../pages/dashboard/d-leave";
import DManageLeave from "../pages/dashboard/d-manage-leave";
import DEditProfilePage from "../pages/dashboard/d-profile";
import PermissionDenied from "../pages/dashboard/permission-denied";

const routeDashboard: RouteObject[] = [
  {
    path: "/dashboard",
    element: <DLayout />,
    // element: (
    //   <AuthGuard>
    //     <DLayout />
    //   </AuthGuard>
    // ),
    children: [
      {
        path: "", //localhost:4000/dashboard
        element: <DHome />, //จะเอา DHome ไป วางที่ outlet ที่ DLayout
      },
      {
        path: "request-for-leave", // localhost:4000/dashboard/request-for-leave
        element: <DLeave />,
      },
      {
        path: "manage-leave", //localhost:4000/dashboard/manage-leave
        element: <DManageLeave />,
      },
      {
        path: "edit-profile", //localhost:4000/dashboard/manage-leave
        element: <DEditProfilePage />,
      },
      {
        path: "permission-denied", //localhost:4000/dashboard/permission-denied
        element: <PermissionDenied />,
      },
    ],
  },
];

export default routeDashboard;
