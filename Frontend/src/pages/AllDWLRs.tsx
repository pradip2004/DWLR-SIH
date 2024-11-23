import React, { useState } from 'react';
import CardComponent from '../components/CardComponent.jsx'; // Import the CardComponent
import { FaFilter, FaBatteryFull, FaExclamationTriangle, FaRegQuestionCircle, FaRegCircle } from 'react-icons/fa'; // Example icons from react-icons


const AllDWLRs = () => {
  // Sample data for cards
  const cardData = [
    { id: '2222222', location: 'Location 1', lastReported: '6 hours', waterLevel: '5', battery: '50', status: 'Active' },
    { id: '3333333', location: 'Location 2', lastReported: '3 hours', waterLevel: '3', battery: '75', status: 'Low Battery' },
    { id: '4444444', location: 'Location 3', lastReported: '2 hours', waterLevel: '2', battery: '90', status: 'Abnormal Data' },
    { id: '5555555', location: 'Location 4', lastReported: '10 hours', waterLevel: '1', battery: '20', status: 'No Data' },
    // Add more cards as needed
  ];

  // State for selected filter
  const [selectedFilter, setSelectedFilter] = useState('All');

  // Function to filter cards based on the selected filter
  const filteredCards = cardData.filter((card) =>
    selectedFilter === 'All' ? true : card.status === selectedFilter
  );

  const filterOptions = [
    { label: 'All', value: 'All', icon: <FaFilter /> },
    { label: 'Active', value: 'Active', icon: <FaRegCircle /> },
    { label: 'No Data', value: 'No Data', icon: <FaRegQuestionCircle /> },
    { label: 'Abnormal Data', value: 'Abnormal Data', icon: <FaExclamationTriangle /> },
    { label: 'Low Battery', value: 'Low Battery', icon: <FaBatteryFull /> },
  ];


  return (
    <div className='w-full p-4 h-full flex flex-col justify-between'>
      <div className="flex gap-3 pt-5 justify-evenly w-full">
      {filterOptions.map((filter) => (
        <button
          key={filter.value}
          className={`border border-[#FED766] px-10 py-3 rounded-xl text-xl flex items-center gap-2 transition duration-300 ease-in-out hover:scale-105 ${
            selectedFilter === filter.value ? 'bg-[#FED766] text-[#274C77]' : 'text-[#274C77] bg-white'
          }`}
          onClick={() => setSelectedFilter(filter.value)}
        >
          {filter.icon}
          {filter.label}
        </button>
      ))}
    </div>
      <div className='w-full mt-10 min-h-[33rem] rounded-md overflow-y-scroll custom-scrollbar'>
        <div className='flex flex-wrap justify-around gap-4 p-4'>
          {filteredCards.map((card) => (
            <div key={card.id} className='w-[30%] '>
              <CardComponent {...card} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllDWLRs;
