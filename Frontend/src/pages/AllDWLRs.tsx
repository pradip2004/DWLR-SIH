import React, { useState, useEffect } from "react";
import axios from "axios";
import CardComponent from "../components/CardComponent.jsx"; // Import the CardComponent
import {
  FaFilter,
  FaBatteryFull,
  FaExclamationTriangle,
  FaRegQuestionCircle,
  FaRegCircle,
} from "react-icons/fa"; // Example icons from react-icons

const AllDWLRs = () => {
  // State for DWLR data and loading state
  const [dwlrData, setDwlrData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for selected filter
  const [selectedFilter, setSelectedFilter] = useState("All");

  // Fetch data from the API on component mount
  useEffect(() => {
    const fetchDWLRData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/dwlr/all");
        setDwlrData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load data");
        setLoading(false);
      }
    };

    fetchDWLRData();
  }, []);

  // Filter the DWLR data based on the selected filter
  const filteredCards = dwlrData.filter((card) =>
    selectedFilter === "All"
      ? true
      : selectedFilter === "Active"
      ? card.active
      : selectedFilter === "Low Battery"
      ? card.lowBattery
      : selectedFilter === "Abnormal Data"
      ? card.anomalyDwlr
      : false
  );

  const filterOptions = [
    { label: "All", value: "All", icon: <FaFilter /> },
    { label: "Active", value: "Active", icon: <FaRegCircle /> },
    { label: "No Data", value: "No Data", icon: <FaRegQuestionCircle /> },
    { label: "Abnormal Data", value: "Abnormal Data", icon: <FaExclamationTriangle /> },
    { label: "Low Battery", value: "Low Battery", icon: <FaBatteryFull /> },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="w-full p-4 h-full flex flex-col justify-between">
      <div className="flex    gap-4 pt-5 justify-evenly w-full ">
        {/* Filter Buttons Styled */}
        {filterOptions.map((filter) => (
          <button
            key={filter.value}
            className={`flex items-center justify-center gap-2 w-full h-[3rem] text-center sm:px-4 sm:py-2 px-2 text-xs sm:text-md rounded-md bg-[#274C77] text-white ${
              selectedFilter === filter.value ? "bg-[#FED766] text-[#274C77]" : ""
            } transition-all duration-300 ease-in-out transform  hover:shadow-lg hover:bg-[#FFA726] hover:text-white`}
            onClick={() => setSelectedFilter(filter.value)}
          >
            {filter.icon}
            {filter.label}
          </button>
        ))}
      </div>

      <div className="w-full mt-10 min-h-[33rem] rounded-md overflow-y-scroll custom-scrollbar pb-10">
        <div className="flex  sm:flex-row flex-col flex-wrap justify-around gap-4 p-4">
          {filteredCards.map((card) => (
            <div key={card._id} className="w-[30%]">
              <CardComponent
                id={card._id}
                location={`${card.state} - ${card.district}`}
                lastReported={`${card.lastUpdatedInHours.toFixed(2)} hours ago`}
                waterLevel={card.latestWaterLevel}
                battery={card.latestBatteryPercentage}
                status={
                  card.active ? "Active" : (card.lowBattery ? "Low Battery" : (card.anomalyDwlr ? "Abnormal Data" : "No Data"))
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllDWLRs;
