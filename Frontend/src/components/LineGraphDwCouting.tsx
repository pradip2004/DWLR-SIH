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

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function LineGraphDwCounting() {
  // Data for the bar graph with type safety
  const chartData = {
    labels: ["Total DWLRs", "Problematic DWLRs", "Active DWLRs"], // X-axis labels
    datasets: [
      {
        label: "DWLR Data",
        data: [200, 50, 150], // Y-axis data
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCD56"], // Updated to Chart.js default colors
        borderRadius: 10, // Rounded corners for the bars
        borderColor: "#fff", // White border for each bar
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
