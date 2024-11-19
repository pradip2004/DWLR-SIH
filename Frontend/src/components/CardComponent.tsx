import React from 'react';


interface CardComponentProps {
  id: string;
  location: string;
  lastReported: string;
  waterLevel: string;
  battery: string;
  status: string;
}

const CardComponent: React.FC<CardComponentProps> = ({ id, location, lastReported, waterLevel, battery, status }) => {
  const getStatusBackgroundColor = () => {
    if (status === 'Low Battery') {
      return '#F48282'; 
    } else if (status === 'Abnormal Data' || status === 'No Data') {
      return '#F4B982'; 
    } else {
      return '#A7F482'; 
    }
  };

  return (
    <div className="w-full sm:w-80 bg-white p-4 rounded-md shadow-xl flex flex-col font-kameron justify-between">
      <div className="flex justify-end items-center">
        <span
          className="text-sm px-3 py-1 rounded-full text-white"
          style={{ backgroundColor: getStatusBackgroundColor() }}
        >
          {status}
        </span>
      </div>
      <div className="mt-2 flex flex-col gap-3">
        <div>
          <h1 className="text-xl font-bold">DWLR ID: {id}</h1>
          <h2 className="text-md text-[#5B5A5A] font-kameron font-bold">{location}</h2>
        </div>
        <div>
          <h1 className="text-lg font-semibold">Last Reported</h1>
          <h3 className="text-md text-[#5B5A5A] font-kameron font-medium">{lastReported} ago</h3>
        </div>
        <div>
          <h1 className="text-lg font-semibold">Water Level</h1>
          <h3 className="text-md text-[#5B5A5A] font-kameron font-medium">{waterLevel} m</h3>
        </div>
        <div>
          <h1 className="text-lg font-semibold">Battery</h1>
          <h3 className="text-md text-[#5B5A5A] font-kameron font-medium">{battery}%</h3>
        </div>
      </div>
      <button
        onClick={() => console.log(`Fetching location for ID: ${id}`)}
        className="mt-4 bg-[#274C77] text-white py-2 rounded-md hover:bg-[#19344e]"
      >
        Get Location
      </button>
    </div>
  );
};

export default CardComponent;
