import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register necessary components for Line Chart
ChartJS.register(CategoryScale, LinearScale, LineElement, Tooltip, Legend);

function FutureBatteryLevel() {
  // Predicted battery level for the upcoming months (example data)
  const predictionData = {
    labels: ['January', 'February', 'March', 'April', 'May'], // Months of prediction
    datasets: [
      {
        label: 'Predicted Battery Level',
        data: [70, 65, 60, 55, 50], // Predicted battery levels for each month
        borderColor: '#FF6347', // A unique color for the line
        backgroundColor: 'rgba(255, 99, 132, 0.2)', // Light red background
        borderWidth: 3,
        tension: 0.4, // Cubic interpolation for smooth curves (create the "Sine Wave" effect)
        fill: true, // Filling below the curve
        pointRadius: 5,
        pointBackgroundColor: '#FF6347', // Color of the points
        pointBorderColor: '#FF6347', // Border color of the points
        pointBorderWidth: 3, // Border width of points
      },
    ],
  };

  // Chart options for the smooth line graph
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          color: '#E0E0E0', // Light grid color
        },
        ticks: {
          font: {
            size: 12,
            weight: 'bold',
            family: 'Arial, sans-serif',
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#E0E0E0', // Light grid color
        },
        ticks: {
          font: {
            size: 12,
            weight: 'bold',
            family: 'Arial, sans-serif',
          },
        },
      },
    },
    plugins: {
      tooltip: {
        backgroundColor: '#333',
        titleColor: '#fff',
        bodyColor: '#fff',
        padding: 10,
        borderRadius: 5,
      },
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            weight: 'bold',
            family: 'Arial, sans-serif',
          },
        },
      },
    },
  };

  return (
    <div className="Future w-1/2 h-full bg-white shadow-lg rounded-md p-8">
      <h3 className="text-2xl font-bold text-[#274C77] mb-5">Estimated Next Charging Date</h3>

      {/* Chart Container */}
      <div className="h-[60%] mt-11 w-[90%] mx-auto">
        <Line data={predictionData} options={chartOptions} />
      </div>

      {/* Estimated Date and Month */}
      <div className="flex justify-between items-center mt-11 text-gray-600">
        <span className="font-extrabold">Estimated Charging Date:</span>
        <span className="font-semibold text-green-600">May 5, 2024</span> {/* Example date */}
      </div>
    </div>
  );
}

export default FutureBatteryLevel;
