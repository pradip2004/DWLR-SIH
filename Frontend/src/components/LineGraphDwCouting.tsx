import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useDwlrContext } from "../context/DwlrContext";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function LineGraphDwCounting() {
  const { data, loading, error } = useDwlrContext();

  const totalDwlr = data?.total || 0;
  const activeDwlr = data?.active || 0;
  const problematicDwlr = (data?.lowBattery || 0) + (data?.anomalyDwlr || 0);

  const chartData = {
    labels: ["Total DWLRs", "Active DWLRs", "Problemetic DWLRs"], // X-axis labels
    datasets: [
      {
        label: "DWLR Data",
        data: [totalDwlr, activeDwlr, problematicDwlr], 
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCD56"], 
        borderRadius: 10, 
        borderColor: "#fff", 
        borderWidth: 2,
      },
    ],
  };

  // Configuration options for the bar chart
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.7)", // Dark tooltip background
        titleColor: "#fff", // White title color for tooltips
        bodyColor: "#fff", // White body color for tooltips
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hide the X-axis grid
        },
        ticks: {
          font: {
            size: 14,
            family: "Arial, sans-serif", // Custom font for x-axis labels
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.1)", // Light gridlines for y-axis
        },
        ticks: {
          stepSize: 1, // Ensure only integer values are shown
          font: {
            size: 14,
            family: "Arial, sans-serif", // Custom font for y-axis labels
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-96 px-6 py-4 rounded-lg shadow-lg">
      <div className="w-full h-full rounded-md overflow-hidden bg-white p-4">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default LineGraphDwCounting;
