import React, { useState } from 'react';
import { MdPieChart, MdBarChart } from 'react-icons/md';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

// New data for the charts
const pieData = {
  labels: ['Green', 'Purple', 'Orange'],
  datasets: [{
    data: [120, 200, 150], // New data values
    backgroundColor: ['#FED766', '#DEFFFC', '#1089ff'], // Same color scheme
    borderWidth: 0, // Remove border for a smoother look
  }],
};

const barData = {
  labels: ['Green', 'Purple', 'Orange'],
  datasets: [{
    label: 'New Dataset',
    data: [120, 200, 150],  // New data values (same as pie chart)
    borderColor: ['#FED766', '#DEFFFC', '#1089ff'],
    backgroundColor: ['#FED766', '#DEFFFC', '#1089ff'],  // Match pie chart colors
    borderWidth: 1,
  }],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        font: {
          size: 14,  // Adjust font size for better readability
        },
        padding: 20, // Increase padding for a better legend layout
      },
    },
    tooltip: {
      callbacks: {
        label: (tooltipItem) => {
          return `Value: ${tooltipItem.raw}`; // Customize tooltip text
        },
      },
    },
  },
  elements: {
    arc: {
      borderWidth: 1,  // Optional: Add a border around each segment
      borderColor: '#ffffff',  // Set border color to white for clean separation
    },
  },
  cutout: '70%', // Makes the chart a donut (70% cutout for the center)
};

function DashFchart() {
  const [chartType1, setChartType1] = useState('pie');

  return (
    <>
      {/* Wrapper div containing the chart */}
      <div className="first w-[25vw] h-[38vh] bg-white rounded-md shadow-xl flex flex-col justify-between">
        {/* State and City Name */}
        <div className="px-4 py-2">
          <h3 className="text-md font-semibold text-[#274C77]">State Name</h3>
          <h3 className="text-md text-zinc-800">City Name</h3>
        </div>

        {/* Buttons to switch between Pie and Bar chart */}
        <div className="flex justify-between px-4 py-2">
          <button
            onClick={() => setChartType1('pie')}
            className="text-[#274C77] border border-[#274C77] py-1 px-4 rounded-md text-sm font-kameron flex items-center gap-2 group hover:bg-[#274C77] hover:text-white"
          >
            <MdPieChart className="text-[#274C77] group-hover:text-white" />
            Pie Chart
          </button>
          
          <button
            onClick={() => setChartType1('bar')}
            className="text-[#274C77] border border-[#274C77] py-1 px-4 rounded-md text-sm font-kameron flex items-center gap-2 group hover:bg-[#274C77] hover:text-white"
          >
            <MdBarChart className="text-[#274C77] group-hover:text-white" />
            Bar Chart
          </button>
        </div>

        {/* Display the corresponding chart based on chartType1 */}
        <div className="flex justify-center items-center h-[60%] w-full">
          {chartType1 === 'pie' ? (
            <Pie
              data={pieData}
              options={options}
              className="w-full h-full"  // Ensure the chart is responsive within the container
            />
          ) : (
            <Bar
              data={barData}
              options={{
                ...options,
                scales: {
                  x: { ticks: { font: { size: 8 } } },
                  y: { ticks: { font: { size: 8 } } },
                },
                elements: {
                  bar: {
                    borderWidth: 1,
                    borderColor: 'rgba(0,0,0,0.1)',
                  },
                },
              }}
              className="w-full h-full"  // Ensure the bar chart is responsive within the container
            />
          )}
        </div>
      </div>
    </>
  );
}

export default DashFchart;
