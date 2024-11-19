import React, { useState } from 'react';
import CardComponent from '../components/CardComponent.jsx'; // Import the CardComponent

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

  return (
    <div className='w-full p-2 h-full flex flex-col justify-between'>
      <div className='flex gap-3 pt-5'>
        <button
          className={`border border-[#FED766] px-14 text-xl py-3 rounded-full ${selectedFilter === 'All' && 'bg-[#FED766]'}`}
          onClick={() => setSelectedFilter('All')}
        >
          All
        </button>
        <button
          className={`border border-[#FED766] px-14 text-xl py-3 rounded-full ${selectedFilter === 'Active' && 'bg-[#FED766]'}`}
          onClick={() => setSelectedFilter('Active')}
        >
          Active
        </button>
        <button
          className={`border border-[#FED766] px-14 text-xl py-3 rounded-full ${selectedFilter === 'No Data' && 'bg-[#FED766]'}`}
          onClick={() => setSelectedFilter('No Data')}
        >
          No Data
        </button>
        <button
          className={`border border-[#FED766] px-14 text-xl py-3 rounded-full ${selectedFilter === 'Abnormal Data' && 'bg-[#FED766]'}`}
          onClick={() => setSelectedFilter('Abnormal Data')}
        >
          Abnormal Data
        </button>
        <button
          className={`border border-[#FED766] px-14 text-xl py-3 rounded-full ${selectedFilter === 'Low Battery' && 'bg-[#FED766]'}`}
          onClick={() => setSelectedFilter('Low Battery')}
        >
          Low Battery
        </button>
      </div>

      <div className='w-full  h-[33rem] rounded-md overflow-y-scroll'>
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
