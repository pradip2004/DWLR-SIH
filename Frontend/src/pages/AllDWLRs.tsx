import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaBatteryFull,
  FaExclamationTriangle,
  FaFilter,
  FaRegCircle,
  FaRegQuestionCircle,
} from "react-icons/fa"; // Example icons from react-icons
import CardComponent from "../components/CardComponent.jsx"; // Import the CardComponent
import Loading from "../components/Loading.js";
import NotData from "../components/NotData.js";

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

  if (loading) return <Loading />;
  if (error) return <NotData />;

  return (
    <div className="w-full p-4 h-full flex flex-col justify-between">
      <div className="flex gap-4 pt-5 justify-evenly w-full">
        {/* Filter Buttons Styled */}
        {filterOptions.map((filter) => (
          <button
            key={filter.value}
            className={`flex items-center justify-center gap-2 w-[10rem] h-[3rem] text-center px-4 py-2 rounded-md bg-[#274C77] text-white ${
              selectedFilter === filter.value ? "bg-[#FED766] text-[#274C77]" : ""
            } transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-[#FFA726] hover:text-white`}
            onClick={() => setSelectedFilter(filter.value)}
          >
            {filter.icon}
            {filter.label}
          </button>
        ))}
      </div>

      <div className="w-full mt-10 min-h-[33rem] rounded-md overflow-y-scroll custom-scrollbar pb-10">
        <div className="flex flex-wrap justify-around gap-4 p-4">
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
