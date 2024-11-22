import React from 'react';
import { MdLocationOn } from 'react-icons/md';

interface CardComponentProps {
  id: string;
  location: string;
  lastReported: string;
  waterLevel: string;
  battery: string;
  status: string;
}

const CardComponent: React.FC<CardComponentProps> = ({
  id,
  location,
  lastReported,
  waterLevel,
  battery,
  status,
}) => {
  // Function to determine the background color based on status
  const getStatusBackgroundColor = () => {
    switch (status) {
      case 'Low Battery':
        return '#F48282'; // Red
      case 'Abnormal Data':
      case 'No Data':
        return '#F4B982'; // Orange
      default:
        return '#A7F482'; // Green
    }
  };

  return (
    <div className="w-full sm:w-80 bg-white p-4 relative rounded-md shadow-xl flex flex-col font-kameron justify-between overflow-hidden">
      {/* Status Badge */}
      <div className="flex justify-end items-center">
        <span
          className="text-sm px-3 py-1 rounded-md text-white"
          style={{ backgroundColor: getStatusBackgroundColor() }}
        >
          {status}
        </span>
      </div>

      {/* Main Content */}
      <div className="mt-2 flex flex-col gap-2 px-5 h-[35vh] overflow-hidden">
        {/* DWLR Details */}
        <div>
          <h1 className="text-xl font-semibold mt-2">DWLR ID: {id}</h1>
          <h2 className="text-xs text-[#5B5A5A] font-kameron font-bold">{location}</h2>
        </div>

        {/* Last Reported */}
        <div>
          <h1 className="text-lg font-semibold mt-4">Last Reported</h1>
          <h3 className="text-xs text-[#5B5A5A] font-kameron font-medium">{lastReported} ago</h3>
        </div>

        {/* Water Level */}
        <div>
          <h1 className="text-lg font-semibold">Water Level</h1>
          <h3 className="text-xs text-[#5B5A5A] font-kameron font-medium">{waterLevel} m</h3>
        </div>

        {/* Battery and Button */}
        <div className="flex justify-between items-center">
          {/* Battery */}
          <div>
            <h1 className="text-lg font-semibold">Battery</h1>
            <h3 className="text-xs text-[#5B5A5A] font-kameron font-medium">{battery}%</h3>
          </div>

          {/* Get Location Button */}
          <button
            onClick={() => console.log(`Fetching location for ID: ${id}`)}
            className="mt-4 w-fit shadow-xl px-5 py-2 rounded-md border-[#19344e] border-2 font-bold flex items-center gap-2 group hover:bg-[#274C77] hover:text-white"
          >
            <MdLocationOn className="text-[#274C77] group-hover:text-white" />
            Get Location
          </button>
        </div>
      </div>

      {/* Decorative Wave Image */}
      <img
        className="absolute left-0 -bottom-[55%]"
        src="/src/assets/Wave.png"
        alt="Wave"
      />
    </div>
  );
};

export default CardComponent;
