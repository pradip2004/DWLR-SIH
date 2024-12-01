import React, { useState } from 'react';
import { MdPieChart, MdBarChart } from 'react-icons/md';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { useDwlrContext } from '../context/DwlrContext';

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

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

function DashFchart({ selectedState, selectedCity }) {
  const [chartType1, setChartType1] = useState('pie');
  const { data, loading } = useDwlrContext();

  // Dynamic data for pie and bar charts
  const pieData = {
    labels: ['Active', 'Problematic'],
    datasets: [{
      data: [data?.active || 0, (data?.lowBattery || 0) + (data?.anomalyDwlr || 0)], // Use data from context
      backgroundColor: ['#FED766', '#1089ff'],
      borderWidth: 0,
    }],
  };

  const barData = {
    labels: ['Active', 'Problematic'],
    datasets: [{
      label: 'Active',
      data: [data?.active || 0, (data?.lowBattery || 0) + (data?.anomalyDwlr || 0)], // Use data from context
      borderColor: ['#FED766', '#1089ff'],
      backgroundColor: ['#FED766', '#1089ff'], // Match pie chart colors
      borderWidth: 1,
    }],
  };

  return (
    <>
      <div className="first w-[25vw] h-[38vh] overflow-y-scroll bg-white rounded-md shadow-xl flex flex-col justify-between">
        <div className="px-4 py-2">
          <h3 className="text-md font-semibold text-[#274C77]">{selectedState || 'State Name'}</h3>
          <h3 className="text-md text-zinc-800">{selectedCity || 'City Name'}</h3>
        </div>

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

        <div className="flex justify-center items-center h-[60%] w-full">
          {chartType1 === 'pie' ? (
            <Pie
              data={pieData}
              options={options}
              className="w-full h-full"
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
              className="w-full h-full"
            />
          )}
        </div>
      </div>
    </>
  );
}

export default DashFchart;
