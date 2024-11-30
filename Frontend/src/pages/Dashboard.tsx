import React, { useState } from 'react';
import { MdLocationOn, MdLocationCity, MdPinDrop, MdArrowDropDown } from 'react-icons/md';

import DashFchart from '../components/DashFchart';
import DasbSchart from '../components/DasbSchart';
import Comaparison from '../components/Comaparison';
import DashIndia from '../components/DashIndia';
import DashLast from '../components/DashLast';
import DwlrCouting from '../components/DwlrCouting';

const Dashboard = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  // Sample data
  const dropdownData = {
    state: [
      { id: 1, name: 'Maharashtra' },
      { id: 2, name: 'Gujarat' },
      { id: 3, name: 'Karnataka' },
    ],
    city: [
      { id: 1, name: 'Mumbai', stateId: 1 },
      { id: 2, name: 'Pune', stateId: 1 },
      { id: 3, name: 'Ahmedabad', stateId: 2 },
      { id: 4, name: 'Bangalore', stateId: 3 },
    ],
    pincode: [
      { code: '400001', cityId: 1 },
      { code: '411001', cityId: 2 },
      { code: '380001', cityId: 3 },
      { code: '560001', cityId: 4 },
    ],
  };

  // Render dropdown items based on type
  const renderDropdownItems = (type: any) => {
    let data = [];
    if (type === 'state') {
      data = dropdownData.state;
    } else if (type === 'city') {
      data = dropdownData.city.filter((city) => city.stateId === selectedState);
    } else if (type === 'pincode') {
      data = dropdownData.pincode.filter((pincode) => pincode.cityId === selectedCity);
    }

    return data.map((item) => (
      <li
        key={item.id}
        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
        onClick={() => handleSelectItem(type, item)}
      >
        {item.name || item.code}
      </li>
    ));
  };

  // Handle item selection
  const handleSelectItem = (type, item) => {
    if (type === 'state') {
      setSelectedState(item.id);
      setSelectedCity(null); // Reset city selection when state changes
    } else if (type === 'city') {
      setSelectedCity(item.id);
    }
    setActiveDropdown(null); // Close dropdown after selection
  };

  return (
    <div>
      <div className="w-[87vw] h-[90vh]  p-5 bg-[#DEFFFC] flex flex-wrap justify-evenly gap-2">
        <div className="w-full h-[5vh]  flex items-center justify-between px-4">
          {/* State Dropdown */}
          <div className="relative">
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'state' ? null : 'state')}
              className="text-white flex items-center gap-2 px-4 py-2 rounded-md bg-[#274C77] hover:bg-gray-800 w-full sm:w-auto"
            >
              <MdLocationOn className="text-white" />
              <span>{selectedState ? dropdownData.state.find((state) => state.id === selectedState)?.name : 'State'}</span>
              <MdArrowDropDown
                className={`text-white transition-transform duration-200 ${activeDropdown === 'state' ? 'rotate-180' : ''}`}
              />
            </button>
            <div
              className={`absolute left-0 w-full mt-1 bg-white rounded-md shadow-lg opacity-0 transform translate-y-4 ${activeDropdown === 'state' ? 'opacity-100 translate-y-0' : ''} transition-all duration-300`}
            >
              <ul className="text-black">{renderDropdownItems('state')}</ul>
            </div>
          </div>

          {/* City Dropdown */}
          <div className="relative">
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'city' ? null : 'city')}
              className="text-white flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-800 bg-[#274C77] w-full sm:w-auto"
            >
              <MdLocationCity className="text-white" />
              <span>{selectedCity ? dropdownData.city.find((city) => city.id === selectedCity)?.name : 'City'}</span>
              <MdArrowDropDown
                className={`text-white transition-transform duration-200 ${activeDropdown === 'city' ? 'rotate-180' : ''}`}
              />
            </button>
            <div
              className={`absolute left-0 w-full mt-1 bg-white rounded-md shadow-lg opacity-0 transform translate-y-4 ${activeDropdown === 'city' ? 'opacity-100 translate-y-0' : ''} transition-all duration-300`}
            >
              <ul className="text-black">{renderDropdownItems('city')}</ul>
            </div>
          </div>

          {/* Pincode Dropdown */}
          <div className="relative">
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'pincode' ? null : 'pincode')}
              className="text-white flex items-center gap-2 px-4 py-2 rounded-md bg-[#274C77] hover:bg-gray-800 w-full sm:w-auto"
            >
              <MdPinDrop className="text-white" />
              <span>{selectedCity ? dropdownData.pincode.find((pincode) => pincode.cityId === selectedCity)?.code : 'Pincode'}</span>
              <MdArrowDropDown
                className={`text-white transition-transform duration-200 ${activeDropdown === 'pincode' ? 'rotate-180' : ''}`}
              />
            </button>
            <div
              className={`absolute left-0 w-full mt-1 bg-white rounded-md shadow-lg opacity-0 transform translate-y-4 ${activeDropdown === 'pincode' ? 'opacity-100 translate-y-0' : ''} transition-all duration-300`}
            >
              <ul className="text-black">{renderDropdownItems('pincode')}</ul>
            </div>
          </div>
        </div>
        <div className="bottom w-full h-[80vh]  flex flex-wrap justify-evenly p-2">
       <DwlrCouting/>
       <DashFchart/>     
          <DasbSchart/>
          <Comaparison/>
            <DashIndia/>      
        <DashLast/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
