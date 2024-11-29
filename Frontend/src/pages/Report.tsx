import React from 'react';
import ReportCard from '../components/ReportCard';

function Report() {
  return (
    <div className='w-full p-2 flex justify-around items-center'> 
      <div className='w-[40%] h-[90%] bg-white rounded-lg flex flex-col gap-3 overflow-y-scroll items-center p-3'>
      <h2 className='text-lg pb-3 font-kameron font-bold'>DWLRs Reports</h2>
        <ReportCard />
      </div>

      {/* Form Section */}
      <div className='w-[40%] h-[90%] bg-white rounded-lg overflow-y-scroll p-6'>
        <h2 className='text-lg pb-3 font-kameron font-bold'>Download Data</h2>
        <form className='flex flex-col gap-4'>
          {/* Start Date */}
          <div className='flex flex-col'>
            <label htmlFor='start-date' className='text-lg font-medium'>Select Start Date</label>
            <input
              type='date'
              id='start-date'
              className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#274C77]'
            />
          </div>

          {/* End Date */}
          <div className='flex flex-col'>
            <label htmlFor='end-date' className='text-lg font-medium'>Select End Date</label>
            <input
              type='date'
              id='end-date'
              className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#274C77]'
            />
          </div>

          {/* Select State */}
          <div className='flex flex-col'>
            <label htmlFor='state' className='text-lg font-medium'>Select State</label>
            <select
              id='state'
              className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#274C77]'
            >
              <option value=''>Choose a state</option>
              <option value='State1'>State 1</option>
              <option value='State2'>State 2</option>
              {/* Add more options as needed */}
            </select>
          </div>

          {/* Select City */}
          <div className='flex flex-col'>
            <label htmlFor='city' className='text-lg font-medium'>Select City</label>
            <select
              id='city'
              className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#274C77]'
            >
              <option value=''>Choose a city</option>
              <option value='City1'>City 1</option>
              <option value='City2'>City 2</option>
              {/* Add more options as needed */}
            </select>
          </div>

          {/* Download Button */}
          <button
            type='button'
            className='mt-4 bg-[#274C77] text-white py-2 px-4 rounded-md hover:bg-[#1d3a5a] transition duration-200'
          >
            Download
          </button>
        </form>
      </div>
    </div>
  );
}

export default Report;
