import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import CurrentWater from "../components/CurrentWater";
import FutureWater from "../components/FutureWater";
import CurrentBatteryLevel from "../components/CurrentBatteryLevel";
import FutureBatteryLevel from "../components/FutureBatteryLevel";
import axios from "axios";
import TrainingModel from "./TrainingModel";


const Analytics: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchValue, setSearchValue] = useState<number | null>(null);
  const [currentWaterData, setCurrentWaterData] = useState(null);
  const [futureWaterData, setFutureWaterData] = useState(null);
  const [batteryData, setBatteryData] = useState(null); // State for battery data
  const [loading, setLoading] = useState(false); // Loading state for API requests
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"aiSahayak" | "trainingModel">("aiSahayak"); // New state for tab control

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

      // Fetch battery data
      const batteryResponse = await axios.get(
        `http://localhost:8000/api/v1/dwlr/batteryDetails/${searchQuery}`
      );
      setBatteryData(batteryResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setCurrentWaterData(null);
      setFutureWaterData(null);
      setBatteryData(null);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isActiveTab = (path: string) => location.pathname === path;

  return (
    <div className="main w-full min-h-screen h-auto mb-12 overflow-scroll bg-[#DEFFFC] p-5">
      {/* Search and Navigation */}
      <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center xl:space-x-4 mt-8 gap-5">
  {/* Navigation Buttons */}
  <div className="flex flex-col xl:flex-row xl:space-x-4 w-full xl:w-auto gap-4">
    <button
      className={`py-2 px-4 w-full xl:w-auto rounded-lg transition duration-300 ${
        activeTab === "aiSahayak"
          ? "bg-yellow-500 text-black"
          : "bg-[#274C77] text-white hover:bg-blue-700"
      }`}
      onClick={() => {
        setActiveTab("aiSahayak");
        navigate("/analytics");
      }}
    >
      AI Sahayak
    </button>
    <button
      className={`py-2 px-4 w-full xl:w-auto rounded-lg transition duration-300 ${
        activeTab === "trainingModel"
          ? "bg-yellow-500 text-black"
          : "bg-[#274C77] text-white hover:bg-blue-700"
      }`}
      onClick={() => {
        setActiveTab("trainingModel");
      }}
    >
      Training Model
    </button>
  </div>

  {/* Search Bar */}
  <div className="flex flex-col xl:flex-row xl:space-x-4 w-full xl:w-auto gap-4 xl:items-center">
    <div className="relative flex items-center w-full xl:w-auto">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        className="py-2 px-4 w-full xl:w-[250px] rounded-lg border border-[#274C77] text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#274C77]"
        placeholder="Enter DWLR id (e.g., 1, 2..)"
      />
      <span className="absolute right-3 text-[#274C77]">
        <FaSearch size={20} />
      </span>
    </div>
    <button
      className="py-2 px-4 w-full xl:w-auto rounded-lg bg-[#274C77] text-white hover:bg-blue-700 transition duration-300"
      onClick={handleSearchClick}
    >
      Search
    </button>
  </div>
</div>



      {/* Error Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Render the active component */}
      <div >
      {activeTab === "aiSahayak" ? (
        <>
<div className="water-level w-full h-[100vh] flex flex-col xl:flex-row gap-10 justify-between mt-10">
  <CurrentWater id={searchValue} data={currentWaterData} loading={loading} />
  <FutureWater id={searchValue} data={futureWaterData} loading={loading} />
</div>

        
<div className="battery-level w-full flex flex-col xl:flex-row gap-10 justify-between h-auto pb-10 mb-10 mt-10">
            <CurrentBatteryLevel id={searchValue} data={batteryData} loading={loading} />
            <FutureBatteryLevel data={batteryData} loading={loading} />
          </div>
          </>
      ) : (
        <TrainingModel />
        
      )}
      </div>
    </div>
  );
};

export default Analytics;

