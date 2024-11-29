import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ListFilter,
  LayoutDashboard,
  UserRound,
  TriangleAlert,
  BellRing,
  ChartPie,
  Menu,
} from "lucide-react";
import Searchbar from "./Searchbar";

// Define the type for the menu items to make TypeScript happy
interface MenuItem {
  name: string;
  path: string;
  icon: JSX.Element;
}

function SideBar() {
  const location = useLocation(); // For determining current location
  const [isCollapsed, setIsCollapsed] = useState(false); // State to manage sidebar collapse/expand

  // Define the menu items with appropriate types
  const menuItems: MenuItem[] = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard /> },
    { name: "DWLRs", path: "/all-dwlrs", icon: <UserRound /> },
    { name: "Alert", path: "/alert", icon: <BellRing /> },
    { name: "Report", path: "/report", icon: <TriangleAlert /> },
    { name: "Analytics", path: "/analytics", icon: <ChartPie /> },
  ];

  // Toggle sidebar collapse/expand
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`${
        isCollapsed ? "w-16" : "w-60"
      } h-full bg-[#7A8C84] rounded-tr-2xl flex flex-col gap-4 transition-all duration-300 ease-in-out`}
      id="Sidebar_container"
    >
      {/* Header Section */}
      <div className="flex items-center justify-between  p-2">
        <div
          className="flex items-center cursor-pointer"
          onClick={toggleSidebar}
          id="hamburger_menu_container"
        >
          <Menu className="text-white" />
          {!isCollapsed && (
            <h2 className="ml-2 text-white font-kameron">MENU</h2>
          )}
        </div>
        {!isCollapsed && (
          <span className="text-white text-lg cursor-pointer">
            <ListFilter /> {/* Add the icon as a child */}
          </span>
        )}
      </div>
      {/* Search Bar */}
      {!isCollapsed && <Searchbar />} {/* Hide search bar when collapsed */}
      {/* Menu Items */}
      <div className="mt-4 flex flex-col gap-4">
        {menuItems.map((item) => (
          <Link
            to={item.path}
            key={item.path}
            className={`${
              isCollapsed ? "justify-center" : "gap-2"
            } flex items-center py-3 px-4 text-white rounded-lg transition duration-300 ease-in-out ${
              location.pathname === item.path
                ? "bg-[#FFC107]"
                : "hover:bg-[#FFC107]"
            }`}
          >
            <span className="text-white text-lg">{item.icon}</span>
            {!isCollapsed && <span className="text-left">{item.name}</span>}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SideBar;
