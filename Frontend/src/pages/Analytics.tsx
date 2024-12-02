import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import CurrentWater from "../components/CurrentWater";
import FutureWater from "../components/FutureWater";
import CurrentBatteryLevel from "../components/CurrentBatteryLevel";
import FutureBatteryLevel from "../components/FutureBatteryLevel";
import axios from "axios";

const Analytics: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchValue, setSearchValue] = useState<number | null>(null);
  const [currentWaterData, setCurrentWaterData] = useState(null);
  const [futureWaterData, setFutureWaterData] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state for API requests
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = async () => {
    if (!searchQuery.trim()) {
      setError("Please enter a valid DWLR ID");
      return;
    }

    setLoading(true);
    setError(null); // Reset error message
    setSearchValue(parseInt(searchQuery, 10));

    try {
      // Fetch data for CurrentWater
      const currentWaterResponse = await axios.post(
        "http://localhost:8000/api/v1/dwlr/previousTrend",
        {
          id: searchQuery,
          noOfDays: 10,
        }
      );
      setCurrentWaterData(currentWaterResponse.data.data);

      // Fetch data for FutureWater
      const futureWaterResponse = await axios.get(
        `http://127.0.0.1:5000/predict/${searchQuery}`
      );
      setFutureWaterData(futureWaterResponse.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setCurrentWaterData(null);
      setFutureWaterData(null);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isActiveTab = (path: string) => location.pathname === path;

  return (
    <div className="main w-full min-h-screen mb-12 overflow-scroll bg-[#DEFFFC] p-5">
      {/* Search and Navigation */}
      <div className="flex space-x-4 mt-8 gap-5 items-center">
        {/* Navigation Buttons */}
        <div className="flex space-x-4">
          <button
            className={`py-2 px-4 rounded-lg transition duration-300 ${
              isActiveTab("/analytics/ai_sahayak")
                ? "bg-yellow-500 text-black"
                : "bg-[#274C77] text-white hover:bg-blue-700"
            }`}
            onClick={() => navigate("/analytics")}
          >
            AI Sahayak
          </button>
          <button
            className={`py-2 px-4 rounded-lg transition duration-300 ${
              isActiveTab("/analytics/training_model")
                ? "bg-yellow-500 text-black"
                : "bg-[#274C77] text-white hover:bg-blue-700"
            }`}
            onClick={() => navigate("/analytics/training_model")}
          >
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
            placeholder="Enter DWLR id (e.g., 1, 2..)"
          />
          <span className="absolute right-3 text-[#274C77]">
            <FaSearch size={20} />
          </span>
        </div>
        <button
          className="py-2 px-4 rounded-lg bg-[#274C77] text-white hover:bg-blue-700 transition duration-300"
          onClick={handleSearchClick}
        >
          Search
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Water Level Components */}
      <div className="water-level w-full h-[82vh] flex gap-10 justify-between mt-10">
        <CurrentWater id={searchValue} data={currentWaterData} loading={loading} />
        <FutureWater id={searchValue} data={futureWaterData} loading={loading} />
      </div>

      {/* Battery Level Components */}
      <div className="battery-level w-full flex gap-10 justify-between h-[60vh] mt-10">
        <CurrentBatteryLevel />
        <FutureBatteryLevel />
      </div>
    </div>
  );
};

export default Analytics;





// import React, { useState } from "react";
// import { FaSearch } from "react-icons/fa";
// import { MdLocationOn, MdArrowDropDown } from "react-icons/md";
// import { useNavigate, useLocation } from "react-router-dom";
// import CurrentWater from "../components/CurrentWater";
// import FutureWater from "../components/FutureWater";
// import CurrentBatteryLevel from "../components/CurrentBatteryLevel";
// import FutureBatteryLevel from "../components/FutureBatteryLevel";
// import axios from "axios";

// const Analytics: React.FC = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchValue, setSearchValue] = useState<number | null>(null);
//   const [waterData, setWaterData] = useState(null); // New state to hold water data
//   const [loading, setLoading] = useState(false); // Loading state for API requests

//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleSearchClick = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.post("http://localhost:8000/api/v1/dwlr/previousTrend", {
//         id: searchQuery,
//         noOfDays: 10, 
//       });
//       setWaterData(response.data.data); 
//       setSearchValue(searchQuery); 
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setWaterData(null);
//     } finally {
//       setLoading(false);
//     }
//   };


//   const isActiveTab = (path: string) => location.pathname === path;

//   return (
//     <div className="main w-full min-h-screen mb-12 overflow-scroll bg-[#DEFFFC] p-5">
//       {/* Search, Dropdown, and Buttons Section */}
//       <div className="flex space-x-4 mt-8 gap-5 items-center">
//         {/* Action Buttons */}
//         <div className="flex space-x-4">
//           <button
//             className={`py-2 px-4 rounded-lg transition duration-300 ${
//               isActiveTab("/analytics/ai_sahayak")
//                 ? "bg-yellow-500 text-black"
//                 : "bg-[#274C77] text-white hover:bg-blue-700"
//             }`}
//             onClick={() => navigate("/analytics")}
//           >
//             AI Sahayak
//           </button>
//           <button
//             className={`py-2 px-4 rounded-lg transition duration-300 ${
//               isActiveTab("/analytics/training_model")
//                 ? "bg-yellow-500 text-black"
//                 : "bg-[#274C77] text-white hover:bg-blue-700"
//             }`}
//             onClick={() => navigate("/analytics/training_model")}
//           >
//             Training Model
//           </button>
//         </div>

//         {/* Search Bar */}
//         <div className="relative flex items-center">
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={handleSearchChange}
//             className="py-2 px-4 rounded-lg border border-[#274C77] text-gray-700 w-[250px] focus:outline-none focus:ring-2 focus:ring-[#274C77]"
//             placeholder="Enter DWLR id (e.g: 1, 2..)"
//           />
//           <span className="absolute right-3 text-[#274C77]">
//             <FaSearch size={20} />
//           </span>
//         </div>
//         <button
//             className={`py-2 px-4 rounded-lg transition duration-300 ${
//               isActiveTab("/analytics/training_model")
//                 ? "bg-yellow-500 text-black"
//                 : "bg-[#274C77] text-white hover:bg-blue-700"
//             }`}
//             onClick={handleSearchClick}
//           >
//             search
//           </button>
//         {/* State Dropdown Menu */}
//         {/* <div className="relative w-[250px]">
//           <button
//             onClick={() =>
//               setActiveDropdown(activeDropdown === "state" ? null : "state")
//             }
//             className="text-white flex items-center gap-2 px-4 py-2 rounded-md bg-[#274C77] hover:bg-gray-800"
//           >
//             <MdLocationOn className="text-white" />
//             <span>
//               {selectedState
//                 ? indianStates.find((state) => state.id === selectedState)?.name
//                 : "State"}
//             </span>
//             <MdArrowDropDown
//               className={`text-white transition-transform duration-200 ${
//                 activeDropdown === "state" ? "rotate-180" : ""
//               }`}
//             />
//           </button>
//           <div
//             className={`absolute left-0 w-full mt-1 bg-white rounded-md shadow-lg opacity-0 transform translate-y-4 ${
//               activeDropdown === "state" ? "opacity-100 translate-y-0" : ""
//             } transition-all duration-300`}
//           >
//             <ul className="text-black">{renderDropdownItems()}</ul>
//           </div>
//         </div> */}
//       </div>

//       <div className="water-level w-full h-[82vh] flex gap-10 justify-between mt-10">
        
//         <CurrentWater id={searchValue} data={waterData} loading={loading} />
//         <FutureWater
//         />
//       </div>

//       <div className="battery-level w-full flex gap-10 justify-between h-[60vh] mt-10">
//         <CurrentBatteryLevel
//         />
//         <FutureBatteryLevel
//         />
//       </div>
//     </div>
//   );
// };

// export default Analytics;
