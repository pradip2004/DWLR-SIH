import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(LineElement, PointElement, Tooltip, Legend, CategoryScale, LinearScale);

const Comparison = () => {
  // State to manage selected month
  const [selectedMonth, setSelectedMonth] = useState('January');

  // Handle month change from dropdown
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  // Data for the charts
  const data = {
    January: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        {
          label: 'January Data',
          data: [30, 40, 55, 65],  // Data for January
          fill: true,
          backgroundColor: 'rgba(255, 99, 71, 0.2)', // Light red background
          borderColor: '#FF6347', // Red color for January
          tension: 0.6,  // Increased tension for more curvy lines
          borderWidth: 3,
          pointRadius: 8,  // Larger points for better visibility
          pointBackgroundColor: '#FF6347', // Points color matches the line
          pointBorderColor: '#FFFFFF',
          pointHoverRadius: 10,
        },
        {
          label: 'December Data',  // Data for December (Previous Month for January)
          data: [50, 55, 60, 62],  // December data
          fill: true,
          backgroundColor: 'rgba(0, 128, 0, 0.2)',  // Light green background
          borderColor: '#008000',  // Green color for December
          tension: 0.6,  // Increased tension for more curvy lines
          borderWidth: 3,
          pointRadius: 8,  // Larger points for better visibility
          pointBackgroundColor: '#008000',  // Points color matches the line
          pointBorderColor: '#FFFFFF',
          pointHoverRadius: 10,
        },
      ],
    },
    February: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        {
          label: 'February Data',
          data: [40, 50, 60, 70],  // Data for February
          fill: true,
          backgroundColor: 'rgba(255, 215, 0, 0.2)',  // Light yellow background
          borderColor: '#FFD700',  // Yellow color for February
          tension: 0.6,  // Increased tension for more curvy lines
          borderWidth: 3,
          pointRadius: 8,  // Larger points for better visibility
          pointBackgroundColor: '#FFD700',  // Points color matches the line
          pointBorderColor: '#FFFFFF',
          pointHoverRadius: 10,
        },
        {
          label: 'January Data',  // Data for January (Previous Month for February)
          data: [30, 40, 55, 65],  // Data for January
          fill: true,
          backgroundColor: 'rgba(255, 99, 71, 0.2)', // Light red background
          borderColor: '#FF6347', // Red color for January
          tension: 0.6,  // Increased tension for more curvy lines
          borderWidth: 3,
          pointRadius: 8,  // Larger points for better visibility
          pointBackgroundColor: '#FF6347', // Points color matches the line
          pointBorderColor: '#FFFFFF',
          pointHoverRadius: 10,
        },
      ],
    },
  };

  return (
    <div className="w-[30vw] h-[38vh] bg-white rounded-md shadow-lg p-4 flex flex-col justify-between ">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-[#274C77]">Monthly Comparison</h3>
        {/* Dropdown menu to select months */}
        <select
          value={selectedMonth}
          onChange={handleMonthChange}
          className="px-4 py-2 border border-[#274C77] rounded-md"
        >
          <option value="January">January</option>
          <option value="February">February</option>
        </select>
      </div>

      {/* Line chart to compare data */}
      <div className="flex justify-center items-center h-[80%] w-full">
        <Line
          data={data[selectedMonth]}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top',
                labels: {
                  font: {
                    size: 14,
                  },
                  padding: 20,
                },
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => {
                    return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                  },
                },
              },
            },
            scales: {
              x: {
                ticks: {
                  font: {
                    size: 12,
                  },
                },
              },
              y: {
                beginAtZero: false,
                ticks: {
                  font: {
                    size: 12,
                  },
                  stepSize: 10,
                  min: 30,
                  max: 80,
                },
              },
            },
            elements: {
              point: {
                radius: 8,
                hoverRadius: 10,
              },
            },
            hover: {
              mode: 'nearest',
              intersect: true,
            },
          }}
          className="w-full h-full"
        />
      </div>

      {/* Info about the selected month
      <div className="px-4 py-2 mt-2">
        <p className="text-sm text-gray-600">
          Visual comparison of {selectedMonth} with the previous month's data.
        </p>
      </div> */}


    </div>
  );
};

export default Comparison;
