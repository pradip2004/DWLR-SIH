import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  UserRound,
  TriangleAlert,
  BellRing,
  ChartPie,
  Menu,
} from "lucide-react"; 
import Searchbar from "./Searchbar"; 

// Define the type for the menu items
interface MenuItem {
  name: string;
  path: string;
  icon: JSX.Element;
}

function SideBar() {
  const location = useLocation(); 
  const [isCollapsed, setIsCollapsed] = useState(false); 

  const menuItems: MenuItem[] = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard /> },
    { name: "DWLRs", path: "/all-dwlrs", icon: <UserRound /> },
    { name: "Alert", path: "/alert", icon: <BellRing /> },
    { name: "Report", path: "/report", icon: <TriangleAlert /> },
    { name: "Analytics", path: "/analytics", icon: <ChartPie /> },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`${
        isCollapsed ? "w-16" : "w-60"
      } h-full bg-[#7A8C84] rounded-tr-2xl flex flex-col transition-all duration-300 ease-in-out`}
      id="Sidebar_container"
    >
      {/* Header Section */}
      <div className="flex items-center justify-between p-6">

        <div
          className="cursor-pointer flex items-center"
          onClick={toggleSidebar}
          id="hamburger_menu_container"
        >
          <Menu className="text-white text-2xl" />
        </div>


        {!isCollapsed && (
          <h2 className="ml-2 text-white font-kameron text-lg">MENU</h2>
        )}
      </div>

 
      {!isCollapsed && (
        <div className="px-4">
          <Searchbar />
        </div>
      )}

      {/* Menu Items */}
      <div className="flex flex-col mt-5 gap-3 px-4">
        {menuItems.map((item) => (
          <Link
            to={item.path}
            key={item.path}
            className={`${
              isCollapsed ? "justify-center px-5" : "gap-3 px-4"
            } flex items-center py-3 text-white rounded-lg transition duration-300 ease-in-out w-full ${
              location.pathname === item.path
                ? "bg-[#FFC107]"
                : "hover:bg-[#FFC107]"
            }`}
          >
            <span className="text-white text-xl">{item.icon}</span>
            {/* Menu Text: Visible only when expanded */}
            {!isCollapsed && (
              <span className="text-left text-sm">{item.name}</span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SideBar;
