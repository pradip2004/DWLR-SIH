import { jsPDF } from "jspdf";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaBatteryFull,
  FaExclamationTriangle,
  FaFilter,
  FaRegCircle,
  FaRegQuestionCircle,
  FaDownload,
} from "react-icons/fa";
import CardComponent from "../components/CardComponent.jsx"; 
import Loading from "../components/Loading.js";
import NotData from "../components/NotData.js";

const AllDWLRs = () => {
  // State for DWLR data, loading, and error state
  const [dwlrData, setDwlrData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for selected filter, state and city
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

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

  // Get unique states and cities for dropdown options
  const states = [...new Set(dwlrData.map((card) => card.state))];
  const cities = [...new Set(dwlrData.map((card) => card.district))];

  // Filter the DWLR data based on the selected filter, state, and city
  const filteredCards = dwlrData.filter((card) =>
    (selectedFilter === "All" || (selectedFilter === "Active" && card.active) || (selectedFilter === "Low Battery" && card.lowBattery) || (selectedFilter === "Abnormal Data" && card.anomalyDwlr)) &&
    (selectedState === "" || card.state === selectedState) &&
    (selectedCity === "" || card.district === selectedCity)
  );

  const filterOptions = [
    { label: "All", value: "All", icon: <FaFilter /> },
    { label: "Active", value: "Active", icon: <FaRegCircle /> },
    { label: "No Data", value: "No Data", icon: <FaRegQuestionCircle /> },
    { label: "Abnormal Data", value: "Abnormal Data", icon: <FaExclamationTriangle /> },
    { label: "Low Battery", value: "Low Battery", icon: <FaBatteryFull /> },
  ];

  const handleDownload = () => {
    const doc = new jsPDF();
    const margin = 10;
    const lineHeight = 10;
    let yPosition = margin;

    // Add title
    doc.setFontSize(16);
    doc.text("DWLR Data", margin, yPosition);
    yPosition += 20;

    // Loop through the filtered cards and add each card's data to the PDF
    filteredCards.forEach((card, index) => {
      // Add card details with spacing between lines
      doc.setFontSize(12);
      doc.text(`Location: ${card.state} - ${card.district}`, margin, yPosition);
      yPosition += lineHeight;

      doc.text(`Last Reported: ${card.lastUpdatedInHours.toFixed(2)} hours ago`, margin, yPosition);
      yPosition += lineHeight;

      doc.text(`Water Level: ${card.latestWaterLevel}`, margin, yPosition);
      yPosition += lineHeight;

      doc.text(`Battery: ${card.latestBatteryPercentage}%`, margin, yPosition);
      yPosition += lineHeight;

      doc.text(`Status: ${card.active ? "Active" : card.lowBattery ? "Low Battery" : card.anomalyDwlr ? "Abnormal Data" : "No Data"}`, margin, yPosition);
      yPosition += 2 * lineHeight;

      // Add a line break between cards
      if (yPosition > 260) {
        doc.addPage();
        yPosition = margin;
      }
    });

    // Save the generated PDF
    doc.save("dwlr_data.pdf");
  };

  if (loading) return <Loading />;
  if (error) return <NotData />;

  return (
    <div className="w-full p-4 h-full flex flex-col justify-between">
      <div className="flex gap-4 pt-5 justify-evenly w-full">
        {/* Filter Buttons Styled */}
        {filterOptions.map((filter) => (
          <button
            key={filter.value}
            className={`flex items-center justify-center gap-2 w-full h-[3rem] text-center sm:px-4 sm:py-2 px-2 text-xs sm:text-md rounded-md bg-[#274C77] text-white ${
              selectedFilter === filter.value ? "bg-[#FED766] text-[#274C77]" : ""
            } transition-all duration-300 ease-in-out transform hover:shadow-lg hover:bg-[#FFA726] hover:text-white`}
            onClick={() => setSelectedFilter(filter.value)}
          >
            {filter.icon}
            {filter.label}
          </button>
        ))}
      </div>

      {/* Dropdowns for State and City */}
      <div className="flex gap-4 pt-5 w-full justify-evenly">
        <div className="flex flex-col">
          <select
            id="state"
            className="w-full p-2 rounded-md border border-gray-300 bg-[#274C77] text-white"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            <option value="">All States</option>
            {states.map((state, index) => (
              <option key={index} value={state} className="bg-white text-black">{state}</option>
            ))}
          </select>
        </div>

        {/* Download Button */}
        <button
          onClick={handleDownload}
          className="flex items-center justify-center gap-2 w-full sm:w-[150px] h-[3rem] text-center sm:px-4 sm:py-2 px-2 text-xs sm:text-md rounded-md bg-[#274C77] text-white transition-all duration-300 ease-in-out transform hover:shadow-lg hover:bg-[#FFA726] hover:text-white"
        >
          <FaDownload />
          Download Data
        </button>
      </div>

      <div className="w-full h-screen mt-10">
        <div className="w-full h-full rounded-md overflow-y-scroll custom-scrollbar pb-10">
          <div className="flex sm:flex-row flex-col flex-wrap justify-around gap-4 p-4">
            {filteredCards.map((card) => (
              <div key={card._id} className="w-[30%]">
                <CardComponent
                  id={card._id}
                  location={`${card.state} - ${card.district}`}
                  lastReported={`${card.lastUpdatedInHours.toFixed(2)} hours ago`}
                  waterLevel={card.latestWaterLevel}
                  battery={card.latestBatteryPercentage}
                  status={card.active ? "Active" : card.lowBattery ? "Low Battery" : card.anomalyDwlr ? "Abnormal Data" : "No Data"}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllDWLRs;
