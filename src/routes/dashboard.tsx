import React from "react";
import { RouteObject } from "react-router-dom";
import DHome from "../pages/dashboard/d-home";
import DLayout from "../pages/dashboard/d-layout";

const routeDashboard: RouteObject[] = [
  {
    path: "/dashboard",
    element: <DLayout />,
    children: [
      {
        path: "", //localhost:4000/dashboard
        element: <DHome />, //จะเอา DHome ไป วางที่ outlet ที่ DLayout
      },
    ],
  },
];

export default routeDashboard;
