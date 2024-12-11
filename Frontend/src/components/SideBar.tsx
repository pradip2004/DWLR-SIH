import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  UserRound,
  TriangleAlert,
  BellRing,
  ChartPie,
  Menu,
  X,
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
  const [isMobileOpen, setIsMobileOpen] = useState(false);

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

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      {/* Sidebar Container */}
      <div
        className={`${
          isMobileOpen ? "fixed z-50 w-60" : "hidden"
        } bg-[#7A8C84] xl:block xl:relative xl:w-${
          isCollapsed ? "16" : "60"
        } h-full rounded-tr-2xl flex flex-col transition-all duration-300 ease-in-out`}
        id="Sidebar_container"
      >
        {/* Header Section */}
        <div
          className={`flex items-center ${
            isCollapsed ? "justify-center p-3" : "p-6"
          }`}
        >
          <div
            className="cursor-pointer flex items-center"
            onClick={isMobileOpen ? toggleMobileSidebar : toggleSidebar}
            id="hamburger_menu_container"
          >
            {/* Toggle between Menu and X icons */}
            {isMobileOpen ? (
              <X className="text-white text-xl" />
            ) : (
              <Menu className="text-white text-xl" />
            )}
          </div>

          {!isCollapsed && (
            <h2 className="ml-2 text-white font-kameron text-lg">MENU</h2>
          )}
        </div>

        {/* Search Bar */}
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
              <span className="flex items-center justify-center text-white text-xl w-8 h-8">
                {item.icon}
              </span>
              {!isCollapsed && (
                <span className="text-left text-sm">{item.name}</span>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Hamburger */}
      {!isMobileOpen && ( // Hide the button when the sidebar is open
        <div className="xl:hidden fixed top-[11%] left-4 z-50">
          <button
            onClick={toggleMobileSidebar}
            className="text-white bg-[#7A8C84] p-2 rounded-full"
          >
            <Menu className="text-xl" />
          </button>
        </div>
      )}
    </>
  );
}

export default SideBar;
