import React, { useState } from 'react';
import { Line, Bar } from "react-chartjs-2"; 
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Tooltip, Legend);

function CurrentBatteryLevel() {
  const [selectedDate, setSelectedDate] = useState("January");

  // Fixed current battery level data
  const currentBatteryLevel = 70;

  // Data for different months (e.g., battery drain levels for each month)
  const dataForDates = {
    January: { level: currentBatteryLevel, drain: [40, 50, 55, 60] },
    February: { level: currentBatteryLevel, drain: [45, 55, 50, 58] },
    March: { level: currentBatteryLevel, drain: [38, 45, 60, 55] },
  };

  // Last charging and uncaring dates
  const lastChargingDate = "2024-11-20";
  const lastUnchargingDate = "2024-11-25";

  // Handle the date change from the dropdown
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  // Weekly overview data for the chart (based on selected month)
  const weeklyOverviewData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: `Battery Drain in ${selectedDate}`,
        data: dataForDates[selectedDate].drain,
        backgroundColor: "#5D5FEF",
        borderColor: "#4C4AFF",
        borderWidth: 1,
        borderRadius: 10,
        hoverBackgroundColor: "#3A3A8C",
        type: 'bar',
      },
      {
        label: "Drain Trend",
        data: dataForDates[selectedDate].drain,
        borderColor: "#FF6347",
        borderWidth: 2,
        fill: false,
        tension: 0.3,
        pointRadius: 5,
        pointBackgroundColor: "#FF6347",
        type: 'line',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          font: {
            size: 10,
            weight: "bold",
            family: "Arial, sans-serif",
          },
          maxRotation: 0,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "#E0E0E0",
        },
        ticks: {
          font: {
            size: 10,
            weight: "bold",
            family: "Arial, sans-serif",
          },
        },
      },
    },
    plugins: {
      tooltip: {
        backgroundColor: "#333",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 10,
        borderRadius: 5,
      },
      legend: {
        labels: {
          font: {
            size: 14,
            weight: "bold",
            family: "Arial, sans-serif",
          },
        },
      },
    },
  };

  return (
    <div className="currentb w-1/2 h-full bg-white rounded-lg shadow-md flex flex-wrap justify-evenly gap-6 p-6">
      {/* Date Selection */}
      <div className="flex justify-between items-center w-full mb-5 px-6">
        <h2 className="text-2xl font-bold text-[#274C77]">Recent Battery Levels - {selectedDate}</h2>
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

      {/* Weekly Overview Chart */}
      <div className="weekly-overview w-[45%] h-[50%] bg-gray-50 rounded-lg shadow-lg p-4 flex flex-col">
        <h3 className="text-md font-medium text-gray-700 mb-3">Weekly Overview</h3>
        <div className="h-[80%] mt-4">
          <Bar data={weeklyOverviewData} options={chartOptions} />
        </div>
      </div>

      {/* Battery Status with Animated Battery Icon */}
      <div className="Battery-Status w-[45%] h-[50%] bg-gray-50 rounded-lg shadow-lg p-4 flex flex-col justify-center items-center">
        <h3 className="text-md font-medium text-gray-700 mb-3">Current Battery Status</h3>
        <div className="relative w-[180px] h-[60px] bg-gray-300 rounded-md overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r"
            style={{
              width: `${currentBatteryLevel}%`,
              background: currentBatteryLevel > 50
                ? 'linear-gradient(to right, #4CAF50, #81C784)' // Green
                : currentBatteryLevel > 20
                ? 'linear-gradient(to right, #FF9800, #FFB74D)' // Orange
                : 'linear-gradient(to right, #F44336, #E57373)', // Red
              transition: 'width 1s ease-in-out',
            }}
          />
        </div>
        <div className="text-xl font-bold text-gray-800 mt-2">{currentBatteryLevel}%</div>
      </div>

      {/* Notifications */}
      <div className="Notification w-full h-[30%] bg-gray-50 rounded-lg shadow-lg p-4 flex flex-col ">
        <h3 className="text-md font-medium text-gray-700 mb-3">Battery Alerts & Notifications</h3>
        <div className="text-sm text-gray-500">
          {/* Low Battery Warning */}
          {currentBatteryLevel <= 20 && (
            <div className="flex items-center mb-2">
              <span className="text-red-500">⚠️</span>
              <p><strong>Low Battery Warning:</strong> {selectedDate} - Battery level is critically low ({currentBatteryLevel}%).</p>
            </div>
          )}

          {/* Overcharging Warning */}
          {currentBatteryLevel >= 100 && (
            <div className="flex items-center mb-2">
              <span className="text-green-500">🔋</span>
              <p><strong>Overcharging Warning:</strong> {selectedDate} - Battery is overcharged. Disconnect to prevent damage.</p>
            </div>
          )}

          {/* Battery Status */}
          {currentBatteryLevel > 20 && currentBatteryLevel < 100 && (
            <div className="flex items-center mb-2">
              <span className="text-green-500">✅</span>
              <p><strong>Battery Status:</strong> {selectedDate} - Battery is in good condition at {currentBatteryLevel}%.</p>
            </div>
          )}

          {/* Last Charging and Uncharging Dates */}
          <div className="flex flex-col mt-4 space-y-2">
            <div className="flex items-center">
              <span className="text-blue-500">⏳</span>
              <p><strong>Last Charging Date:</strong> {lastChargingDate}</p>
            </div>
            <div className="flex items-center">
              <span className="text-gray-500">⏳</span>
              <p><strong>Last Uncharging Date:</strong> {lastUnchargingDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentBatteryLevel;
