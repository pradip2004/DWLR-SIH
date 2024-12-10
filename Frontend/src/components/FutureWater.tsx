import React from "react";
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

function FutureWater({ data, loading, id }) {
  const waterLevels = data ? data.map((item) => item.waterLevel) : [];
  const highestWaterLevel = waterLevels.length ? Math.max(...waterLevels) : 0;
  const lowestWaterLevel = waterLevels.length ? Math.min(...waterLevels) : 0;

  const doughnutData = data
    ? {
        labels: ["Highest Water Level", "Lowest Water Level"],
        datasets: [
          {
            data: [highestWaterLevel, lowestWaterLevel],
            backgroundColor: ["#FF9800", "#F44336"],
            hoverBackgroundColor: ["#FFB74D", "#EF5350"],
          },
        ],
      }
    : null;

  const doughnutOptions = {
    rotation: -90,
    circumference: 180,
    cutout: "70%",
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const value = tooltipItem.raw.toLocaleString();
            return `${tooltipItem.label}: ${value}`;
          },
        },
      },
    },
  };

  const lineChartData = data
    ? {
        labels: data.map((item) => item.date),
        datasets: [
          {
            label: "Water Level",
            data: data.map((item) => item.waterLevel),
            borderColor: "#4CAF50",
            backgroundColor: "rgba(76, 175, 80, 0.2)",
            tension: 0.4,
            pointBorderColor: "#4CAF50",
            pointBackgroundColor: "#fff",
            pointRadius: 7,
            pointHoverRadius: 9,
            fill: true,
          },
        ],
      }
    : null;

  return (
    <div className="w-full lg:w-1/2 h-full bg-white rounded-md shadow-lg p-5 mx-auto">
      {/* Header Section */}
      <div className="flex flex-col gap-3 lg:flex-row lg:gap-10 items-center mb-5">
        <h2 className="text-xl lg:text-2xl font-bold text-[#274C77]">Projected Water Levels</h2>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Loading...</p>
        </div>
      ) : lineChartData ? (
        <>
          <div className="bg-gray-50 w-full rounded-lg shadow-md p-5 mb-10">
            <Line
              data={lineChartData}
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
                animations: {
                  tension: {
                    duration: 1000,
                    easing: "easeInOutQuad",
                  },
                },
              }}
            />
          </div>
          <div className="flex flex-col lg:flex-row justify-between gap-10 items-center">
            {/* Half-Donut Chart Section */}
            <div className="relative w-full lg:w-1/2 flex justify-center m-4">
              <div className="half-donut w-60 h-60">
                <Doughnut data={doughnutData} options={doughnutOptions} />
              </div>
            </div>

            {/* Data Section */}
            <div className="w-full lg:w-[15vw] bg-gray-50 rounded-lg shadow-md p-4">
              <h3 className="text-sm font-semibold text-[#274C77] mb-3">Last 10 Days Data</h3>
              <div className="flex justify-between items-center mb-4">
                <div className="text-center">
                  <p className="text-xs text-gray-500">Highest Prediction</p>
                  <p className="font-semibold text-lg text-[#FF9800]">{highestWaterLevel}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Lowest Prediction</p>
                  <p className="font-semibold text-lg text-[#F44336]">{lowestWaterLevel}</p>
                </div>
              </div>
              <div className="mt-4 ml-1">
                <p className="text-xs text-gray-500">Prediction ID - {id}</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">No data available</p>
        </div>
      )}
    </div>
  );
}

export default FutureWater;
