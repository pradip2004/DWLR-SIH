import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ListFilter, LayoutDashboard, UserRound, TriangleAlert,BellRing , ChartPie } from "lucide-react";
import Searchbar from "./Searchbar";

// Define the type for the menu items to make TypeScript happy
interface MenuItem {
  name: string;
  path: string;
  icon: JSX.Element;
}

function SideBar() {
  const location = useLocation(); // For determining current location
  
  // Define the menu items with appropriate types
  const menuItems: MenuItem[] = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard /> },
    { name: "DWLRs", path: "/all-dwlrs", icon: <UserRound /> },
    { name: "Alert", path: "/alert", icon: <BellRing /> },
    { name: "Report", path: "/report", icon: <TriangleAlert /> },
    { name: "Analytics", path: "/analytics", icon: <ChartPie /> },
  ];

  return (
    <div className="w-60 p-5 bg-[#7A8C84] rounded-tr-2xl flex flex-col gap-4" id="Sidebar_container">
      <div className="flex items-center justify-between" id="Menu_filterIcon container">
        <h2 className="font-kameron text-white">MENU</h2>
        <span className="text-white text-lg hover:cursor-pointer">
          <ListFilter /> {/* Add the icon as a child */}
        </span>
      </div>

      <Searchbar /> {/* Search bar component */}

      <div className="w-full mt-4 flex flex-col gap-4">
        {menuItems.map((item) => (
          <Link
            to={item.path}
            key={item.path}
            className={`w-full rounded-lg flex items-center gap-2 uppercase  py-4 px-4 text-white transition duration-500 ease-in-out hover:bg-[#FFC107] ${
              location.pathname === item.path ? "bg-[#FFC107]" : "" // Apply background color only to selected item
            }`}
          >
            <span className="text-white text-lg flex-shrink-0 ">{item.icon}</span>
            <span className="flex-1 text-left">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SideBar;