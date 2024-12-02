import React from "react";
import { Bar } from "react-chartjs-2";
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

function CurrentBatteryLevel({ id, data, loading }) {
  if (loading) {
    return <div>Loading...</div>;
  }

  // Provide a fallback for `data` to avoid destructuring errors
  const { weeklyData = {}, currentBattery = 0 } = data || {};

  // Prepare the weekly battery data
  const weeklyOverviewData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: `Battery Drain Weekly`,
        data: [
          weeklyData.week1 || 0,
          weeklyData.week2 || 0,
          weeklyData.week3 || 0,
          weeklyData.week4 || 0,
        ],
        backgroundColor: "#4CAF50",
        borderColor: "#388E3C",
        borderWidth: 2,
        borderRadius: 5,
        hoverBackgroundColor: "#81C784",
        type: "bar",
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 12, weight: "bold" } },
      },
      y: {
        beginAtZero: true,
        grid: { color: "#E0E0E0" },
        ticks: { font: { size: 12, weight: "bold" } },
      },
    },
    plugins: {
      tooltip: {
        backgroundColor: "#333",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 8,
        borderRadius: 4,
      },
      legend: {
        display: true,
      },
    },
  };

  return (
    <div className="currentb w-full sm:w-1/2 h-auto sm:h-[50vh] bg-white rounded-lg shadow-md justify-evenly flex flex-wrap gap-4 p-4 sm:p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center w-full mb-4">
        <h2 className="text-xl font-bold text-[#274C77] ">Battery Levels </h2>
      </div>

      {/* Weekly Overview Chart */}
      <div className="weekly-overview w-full sm:w-[45%] h-auto sm:h-[70%] flex flex-col justify-evenly bg-gray-50 rounded-lg shadow-lg p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-5">Weekly Overview</h3>
        <div className="h-[70%]">
          <Bar data={weeklyOverviewData} options={chartOptions} />
        </div>
      </div>

      {/* Battery Status Section */}
      <div className="Battery-Status w-full sm:w-[45%] h-auto sm:h-[70%] bg-gray-50 rounded-lg shadow-lg p-4 flex flex-col justify-center items-center">
        <h3 className="text-sm font-medium text-gray-700 mb-3 ">Battery Status</h3>
        <div className="relative w-[120px] sm:w-[150px] h-[40px] sm:h-[50px] bg-gray-200 rounded-full overflow-hidden shadow-inner">
          <div
            className={`absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-in-out ${
              currentBattery > 80
                ? "bg-gradient-to-r from-green-500 to-green-300"
                : currentBattery > 60
                ? "bg-gradient-to-r from-green-400 to-green-200"
                : currentBattery > 40
                ? "bg-gradient-to-r from-yellow-400 to-yellow-200"
                : currentBattery > 20
                ? "bg-gradient-to-r from-orange-500 to-orange-300"
                : "bg-gradient-to-r from-red-500 to-red-300"
            }`}
            style={{ width: `${currentBattery}%` }}
          />
        </div>
        <div className="text-lg font-bold text-gray-800 mt-2">
          {currentBattery}%
        </div>
      </div>
    </div>
  );
}

export default CurrentBatteryLevel;
