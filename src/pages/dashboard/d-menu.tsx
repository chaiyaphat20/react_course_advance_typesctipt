import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";

type MenuItem = {
  label: string;
  icon: JSX.Element;
  href: string;
};

const MainListItems = () => {
  const menuItem: Array<MenuItem> = [
    { label: "หน้าหลัก", icon: <DashboardIcon />, href: "/dashboard" },
    { label: "ยื่นใบลา", icon: <PeopleIcon />, href: "/dashboard" },
    { label: "จัดการข้อมูลการลา", icon: <BarChartIcon />, href: "/dashboard" },
  ];

  return (
    <React.Fragment>
      {menuItem.map((item) => (
        <ListItemButton key={item.label}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItemButton>
      ))}
    </React.Fragment>
  );
};
export default MainListItems;
