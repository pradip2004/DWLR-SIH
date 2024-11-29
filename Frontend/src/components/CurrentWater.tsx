import React, { useState, useEffect } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, ArcElement);

// Data for different dates
const dataForDates = {
  "March 2020": {
    lineChartData: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      datasets: [
        {
          label: "Water Level",
          data: [140, 180, 160, 200, 240, 220, 260],
          borderColor: "#5D5FEF",
          backgroundColor: "rgba(93, 95, 239, 0.1)",
          tension: 0.4,
          pointBorderColor: "#5D5FEF",
          pointBackgroundColor: "#fff",
          pointRadius: 7,
          pointHoverRadius: 9,
          fill: true,
        },
      ],
    },
    todayData: { highest: 200000, lowest: 50000, id: "ID1" },
    previousData: { highest: 180000, lowest: 40000, id: "ID2" },
  },
  "April 2020": {
    lineChartData: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      datasets: [
        {
          label: "Water Level",
          data: [150, 170, 200, 210, 250, 230, 270],
          borderColor: "#5D5FEF",
          backgroundColor: "rgba(93, 95, 239, 0.1)",
          tension: 0.4,
          pointBorderColor: "#5D5FEF",
          pointBackgroundColor: "#fff",
          pointRadius: 7,
          pointHoverRadius: 9,
          fill: true,
        },
      ],
    },
    todayData: { highest: 220000, lowest: 60000, id: "ID3" },
    previousData: { highest: 200000, lowest: 50000, id: "ID4" },
  },
};

function CurrentWater({ selectedNumber }) {
  const [selectedDate, setSelectedDate] = useState("March 2020");
  const [data, setData] = useState(dataForDates[selectedDate]);

  // Handle change of date (month)
  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    setData(dataForDates[newDate]);
  };

  // Update data based on selectedNumber (1 or 2)
  useEffect(() => {
    if (selectedNumber === 1) {
      setData((prevData) => ({
        ...prevData,
        todayData: { ...prevData.todayData, id: "ID1" },
        previousData: { ...prevData.previousData, id: "ID2" },
      }));
    } else if (selectedNumber === 2) {
      setData((prevData) => ({
        ...prevData,
        todayData: { ...prevData.todayData, id: "ID2" },
        previousData: { ...prevData.previousData, id: "ID1" },
      }));
    }
  }, [selectedNumber]);

  // Data for the half-donut chart
  const doughnutData = {
    labels: ["Highest Level", "Lowest Level"],
    datasets: [
      {
        data: [data.todayData.highest, data.todayData.lowest],
        backgroundColor: ["#007fff", "#0066cc"], // Colors for Highest and Lowest
        hoverBackgroundColor: ["#3399ff", "#3386cc"],
      },
    ],
  };

  const doughnutOptions = {
    rotation: -90, // Start angle for the half-donut
    circumference: 180, // Only display half-donut
    cutout: "70%", // Inner circle cutout for a donut effect
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const value = tooltipItem.raw.toLocaleString(); // Add commas to numbers
            return `${tooltipItem.label}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <div className="current overflow-y-scroll w-1/2 h-full bg-white rounded-md shadow-lg">
      {/* Header Section */}
      <div className="w-full max-w-4xl h-full  p-10 mx-auto   ">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5 gap-3 md:gap-0">
          <h2 className="text-xl md:text-2xl font-bold text-[#274C77] text-center md:text-left">
            Recent Water Levels - {selectedDate}
          </h2>
          <select
            value={selectedDate}
            onChange={handleDateChange}
            className="bg-[#274C77] p-2 rounded-md outline-none text-white text-sm md:text-base w-full md:w-auto"
          >
            {Object.keys(dataForDates).map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        {/* Chart Section */}
        <div className="bg-gray-50 w-full rounded-lg shadow-md p-5">
          <Line
            data={data.lineChartData}
            options={{
              responsive: true,
              plugins: {
                tooltip: { enabled: true },
              },
              elements: {
                point: {
                  radius: 7,
                  borderWidth: 2,
                },
              },
            }}
          />
        </div>

        {/* Bottom Section */}
        <div className="flex justify-evenly gap-10 items-center mt-10">
          {/* Half-Donut Chart Section */}
          <div className="relative w-1/2 flex justify-center m-4">
            <div className="half-donut w-60 h-60">
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
          </div>

          {/* Right Side Data Section */}
          <div className="w-[15vw] bg-gray-50 rounded-lg shadow-md p-4 ">
            <h3 className="text-sm font-semibold text-[#274C77] mb-3">Present Month Data</h3>
            <div className="flex justify-between items-center mb-4">
              <div className="text-center">
                <p className="text-xs text-gray-500">Highest Level</p>
                <p className="font-semibold text-lg text-[#007fff]">{data.todayData.highest}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Lowest Level</p>
                <p className="font-semibold text-lg text-[#0066cc]">{data.todayData.lowest}</p>
              </div>
            </div>
            <h3 className="text-sm font-semibold text-[#274C77] mt-6 mb-3">Previous Month's Data</h3>
            <div className="flex justify-between items-center">
              <div className="text-center">
                <p className="text-xs text-gray-500">Highest Data</p>
                <p className="font-semibold text-sm text-[#274C77]">{data.previousData.highest}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Lowest Data</p>
                <p className="font-semibold text-sm text-[#274C77]">{data.previousData.lowest}</p>
              </div>
            </div>
            <div className="mt-4 ml-1">
              <p className="text-xs text-gray-500">Current ID - {data.todayData.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentWater;
