import React, { useState } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, ArcElement } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, ArcElement);

// Data for future projections (example data)
const dataForDates = {
  "July 2024": {
    lineChartData: {
      labels: ["1", "5", "10", "15", "20", "25", "30"],
      datasets: [
        {
          label: "Projected Water Level",
          data: [170, 180, 200, 220, 240, 260, 280],
          borderColor: "#4CAF50",
          backgroundColor: "rgba(76, 175, 80, 0.2)",
          tension: 0.4,
          pointBorderColor: "#4CAF50",
          pointBackgroundColor: "#fff",
          pointRadius: 8,
          pointHoverRadius: 10,
          fill: true,
        },
      ],
    },
    futureData: { highest: 300000, lowest: 100000, id: "ID5" },
  },
  "August 2024": {
    lineChartData: {
      labels: ["1", "5", "10", "15", "20", "25", "30"],
      datasets: [
        {
          label: "Projected Water Level",
          data: [175, 185, 205, 225, 245, 265, 285],
          borderColor: "#FF9800",
          backgroundColor: "rgba(255, 152, 0, 0.2)",
          tension: 0.4,
          pointBorderColor: "#FF9800",
          pointBackgroundColor: "#fff",
          pointRadius: 8,
          pointHoverRadius: 10,
          fill: true,
        },
      ],
    },
    futureData: { highest: 310000, lowest: 110000, id: "ID7" },
  },
};

function FutureWater() {
  const [selectedDate, setSelectedDate] = useState("July 2024");
  const [data, setData] = useState(dataForDates[selectedDate]);

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    setData(dataForDates[newDate]);
  };

  // Data for the half-donut chart
  const doughnutData = {
    labels: ["Highest Prediction", "Lowest Prediction"],
    datasets: [
      {
        data: [data.futureData.highest, data.futureData.lowest],
        backgroundColor: ["#FF9800", "#F44336"], // Orange and Red for Highest and Lowest
        hoverBackgroundColor: ["#FFB74D", "#EF5350"],
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
    <div className="w-1/2 overflow-y-scroll max-w-4xl h-full bg-white rounded-md shadow-lg p-10 mx-auto">
      {/* Header Section */}
      <div className="flex gap-10 items-center mb-5">
        <h2 className="text-2xl font-bold text-[#274C77]">Projected Water Levels - {selectedDate}</h2>
        {/* Month Selector Dropdown */}
        <select
          value={selectedDate}
          onChange={handleDateChange}
          className="bg-[#274C77] p-2 rounded-md outline-none text-white"
        >
          {Object.keys(dataForDates).map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      {/* Chart Section */}
      <div className="bg-gray-50 rounded-lg shadow-md p-5 mb-10">
        <Line
          data={data.lineChartData}
          options={{
            responsive: true,
            plugins: {
              tooltip: { enabled: true },
            },
            elements: {
              point: {
                radius: 8,
                borderWidth: 3,
              },
            },
            animations: {
              tension: {
                duration: 1000,
                easing: "easeInOutQuad",
              },
            },
          }}
        />
      </div>

      {/* Bottom Section */}
      <div className="flex justify-evenly gap-10 items-center">
        {/* Half-Donut Chart Section */}
        <div className="relative w-1/2 flex justify-center m-4">
          <div className="half-donut w-60 h-60">
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </div>

        {/* Data Section */}
        <div className="w-[15vw] bg-gray-50 rounded-lg shadow-md p-4">
          <h3 className="text-sm font-semibold text-[#274C77] mb-3">Future Month Data</h3>
          <div className="flex justify-between items-center mb-4">
            <div className="text-center">
              <p className="text-xs text-gray-500">Highest Prediction</p>
              <p className="font-semibold text-lg text-[#FF9800]">{data.futureData.highest.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Lowest Prediction</p>
              <p className="font-semibold text-lg text-[#F44336]">{data.futureData.lowest.toLocaleString()}</p>
            </div>
          </div>
          <div className="mt-4 ml-1">
            <p className="text-xs text-gray-500">Prediction ID - {data.futureData.id}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FutureWater;
