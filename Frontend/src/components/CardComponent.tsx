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
        return '#FF6F61'; // Soft Red
      case 'Abnormal Data':
      case 'No Data':
        return '#FFA726'; // Warm Orange
      default:
        return '#66BB6A'; // Soft Green
    }
  };

  return (
    <div className="w-full sm:w-72 h-[22vw] bg-gradient-to-br from-[#F8FAFC] to-[#EAF0F7] p-5 relative rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out flex flex-col justify-between overflow-hidden">
      {/* Status Badge with Animation */}
      <div className="flex justify-end items-center mb-1">
        <span
          className="text-xs px-3 py-1 rounded-full text-white font-semibold tracking-wide shadow-md animate-pulse"
          style={{ backgroundColor: getStatusBackgroundColor() }}
        >
          {status}
        </span>
      </div>

      {/* Main Content */}
      <div className="px-4 flex-grow relative z-20">
        {/* DWLR Details */}
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-semibold text-[#1F2937]">DWLR ID: {id}</h1>
          <h2 className="text-sm text-[#64748B] font-medium flex items-center gap-1">
            <MdLocationOn className="text-[#3B82F6]" /> {location}
          </h2>
        </div>

        {/* Last Reported */}
        <div className="flex flex-col gap-2 mt-2">
          <h1 className="text-base font-semibold text-[#1F2937]">Last Reported</h1>
          <h3 className="text-sm text-[#64748B] font-medium">{lastReported} ago</h3>
        </div>

        {/* Water Level */}
        <div className="flex flex-col gap-2 mt-2">
          <h1 className="text-base font-semibold text-[#1F2937]">Water Level</h1>
          <h3 className="text-sm text-[#64748B] font-medium">{waterLevel} m</h3>
        </div>

        {/* Battery and Button */}
        <div className="flex justify-between items-center mt-3">
          {/* Battery */}
          <div>
            <h1 className="text-base font-semibold text-[#1F2937]">Battery</h1>
            <h3 className="text-sm text-[#64748B] font-medium">{battery}%</h3>
          </div>

          {/* Get Location Button */}
          <button
            onClick={() => console.log(`Fetching location for ID: ${id}`)}
            className="mt-2 px-4 py-1 bg-[#274C77] text-white text-sm font-semibold rounded-full shadow-md hover:bg-[#2563EB] transition-colors duration-300 ease-in-out flex items-center gap-2"
          >
            <MdLocationOn className="text-white" />
            Get Location
          </button>
        </div>
      </div>

      {/* Overlay Text */}

      {/* Decorative Wave Image */}
      <img
        className="absolute left-0 bottom-[-40%] sm:bottom-[-50%] md:bottom-[-60%] lg:bottom-[-70%] xl:bottom-[-60%] z-1"
        src="/src/assets/Wave.png"
        alt="Wave"
      />
    </div>
  );
};

export default CardComponent;
