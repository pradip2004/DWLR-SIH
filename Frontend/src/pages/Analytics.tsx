import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdLocationOn, MdArrowDropDown } from "react-icons/md";
import CurrentWater from "../components/CurrentWater";
import FutureWater from "../components/FutureWater";
import CurrentBatteryLevel from "../components/CurrentBatteryLevel";
import FutureBatteryLevel from "../components/FutureBatteryLevel";

const Analytics: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);

  // List of valid DWLR IDs
  const validDWLRIds = [1, 2]; // Add more IDs if necessary

  // List of Indian states (for dropdown)
  const indianStates = [
    { id: "Maharashtra", name: "Maharashtra" },
    { id: "Karnataka", name: "Karnataka" },
  ];

  // Handle search query change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Update selected number based on the search query
    const queryAsNumber = Number(query);
    if (validDWLRIds.includes(queryAsNumber)) {
      setSelectedNumber(queryAsNumber); // Set selected number if valid DWLR ID
    } else {
      setSelectedNumber(null); // Reset if the query doesn't match a valid ID
    }
  };

  // Handle state selection from dropdown
  const handleStateChange = (stateId: string) => {
    setSelectedState(stateId);
    setActiveDropdown(null); // Close the dropdown after selection
  };

  // Render dropdown items dynamically
  const renderDropdownItems = () => {
    return indianStates.map((state) => (
      <li
        key={state.id}
        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        onClick={() => handleStateChange(state.id)}
      >
        {state.name}
      </li>
    ));
  };

  return (
    <div className="main w-full min-h-screen mb-12 overflow-scroll bg-[#DEFFFC] p-5">
      {/* Search, Dropdown, and Buttons Section */}
      <div className="flex space-x-4 mt-8 gap-5 items-center">
        {/* Action Buttons */}
        <div className="flex space-x-4 ">
          <button className="bg-[#274C77] text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
            AI Sahayak
          </button>
          <button className="bg-[#274C77] text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
            Training Model
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            className="py-2 px-4 rounded-lg border border-[#274C77] text-gray-700 w-[250px] focus:outline-none focus:ring-2 focus:ring-[#274C77]"
            placeholder="Enter DWLR id (e.g: 1, 2..)"
          />
          <span className="absolute right-3 text-[#274C77]">
            <FaSearch size={20} />
          </span>
        </div>

        {/* State Dropdown Menu */}
        <div className="relative w-[250px]">
          <button
            onClick={() =>
              setActiveDropdown(activeDropdown === "state" ? null : "state")
            }
            className="text-white  flex items-center gap-2 px-4 py-2 rounded-md bg-[#274C77] hover:bg-gray-800"
          >
            <MdLocationOn className="text-white " />
            <span >
              {selectedState
                ? indianStates.find((state) => state.id === selectedState)?.name
                : "State"}
            </span>
            <MdArrowDropDown
              className={`text-white  transition-transform duration-200 ${
                activeDropdown === "state" ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`absolute  left-0 w-full mt-1 bg-white rounded-md shadow-lg opacity-0 transform translate-y-4 ${
              activeDropdown === "state" ? "opacity-100 translate-y-0" : ""
            } transition-all duration-300`}
          >
            <ul className="text-black">{renderDropdownItems()}</ul>
          </div>
        </div>
      </div>

      {/* Water Level Section */}
      <div className="water-level w-full h-[82vh] flex gap-10 justify-between mt-10">
        {/* Conditionally render water level data */}
        <CurrentWater
          waterLevel={selectedNumber === 1 ? 60 : selectedNumber === 2 ? 50 : 0}
        />
        <FutureWater
          waterLevel={selectedNumber === 1 ? 65 : selectedNumber === 2 ? 55 : 0}
        />
      </div>

      {/* Battery Level Section */}
      <div className="battery-level w-full flex gap-10 justify-between h-[70vh] mt-10">
        {/* Conditionally render battery level data */}
        <CurrentBatteryLevel
          batteryLevel={
            selectedNumber === 1 ? 80 : selectedNumber === 2 ? 90 : 0
          }
        />
        <FutureBatteryLevel
          batteryLevel={
            selectedNumber === 1 ? 75 : selectedNumber === 2 ? 85 : 0
          }
        />
      </div>
    </div>
  );
};

export default Analytics;
