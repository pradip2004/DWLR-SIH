import React, { useState, useEffect } from 'react';
import { MdLocationOn, MdLocationCity, MdArrowDropDown } from 'react-icons/md';
import axios from 'axios';
import DashFchart from '../components/DashFchart';
import DasbSchart from '../components/DasbSchart';
import Comaparison from '../components/Comaparison';
import DashIndia from '../components/DashIndia';
import DashLast from '../components/DashLast';
import DwlrCouting from '../components/DwlrCouting';
import { useDwlrContext } from '../context/DwlrContext';

const Dashboard = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [districts, setDistricts] = useState<string[]>([]);
  const { data, loading, error, setData } = useDwlrContext();

  useEffect(() => {
    if (selectedState) {
      fetchDistricts(selectedState);
    }
  }, [selectedState]);

  const fetchDistricts = async (state: string) => {
    try {
      const response = await axios.get<{ districts: string[] }>(`http://localhost:8000/api/v1/dwlr/districts?state=${state}`);
      setDistricts(response.data.districts);
    } catch (error) {
      console.error('Error fetching districts:', error);
      setDistricts([]);
    }
  };

  const fetchAndUpdateData = async (queryKey: string, queryValue: string) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/dwlr/info?${queryKey}=${queryValue}`);
      setData({
        ...data,
        ...response.data,
      });
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const handleSelectItem = async (type: string, item: any) => {
    if (type === 'state') {
      setSelectedState(item.name);
      setSelectedCity(null);
      await fetchAndUpdateData('state', item.name);
    } else if (type === 'city') {
      setSelectedCity(item.name);
      await fetchAndUpdateData('district', item.name);
    }
    setActiveDropdown(null);
  };

  const renderDropdownItems = (type: string) => {
    if (loading) return <li className="px-4 py-2">Loading...</li>;
    if (error) return <li className="px-4 py-2 text-red-500">Error: {error}</li>;

    if (type === 'state') {
      return data?.states?.map((state: string, index: number) => (
        <li
          key={index}
          className="px-4 py-2 hover:bg-gray-200 cursor-pointer rounded-md transition-all duration-200"
          onClick={() => handleSelectItem('state', { name: state })}
        >
          {state}
        </li>
      ));
    }

    if (type === 'city' && districts.length > 0) {
      return districts.map((district: string, index: number) => (
        <li
          key={index}
          className="px-4 py-2 hover:bg-gray-200 cursor-pointer rounded-md transition-all duration-200"
          onClick={() => handleSelectItem('city', { name: district })}
        >
          {district}
        </li>
      ));
    }

    return <li className="px-4 py-2">No items available</li>;
  };

  return (
    <div>
      <div className="w-[87vw] h-[90vh] p-5 bg-[#DEFFFC] flex flex-wrap justify-evenly gap-2">
        <div className="w-full h-[5vh] flex items-center justify-between px-4">
          {/* State Dropdown */}
          <div className="relative w-1/4 min-w-[200px]">
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'state' ? null : 'state')}
              className="text-white flex items-center gap-2 px-4 py-2 rounded-md bg-[#274C77] hover:bg-[#1C3558] w-full sm:w-auto"
            >
              <MdLocationOn className="text-white" />
              <span>{selectedState || 'Select State'}</span>
              <MdArrowDropDown
                className={`text-white transition-transform duration-200 ${
                  activeDropdown === 'state' ? 'rotate-180' : ''
                }`}
              />
            </button>
            {activeDropdown === 'state' && (
              <div className="absolute left-0 w-full mt-2 bg-white rounded-md shadow-lg max-h-64 overflow-y-auto z-10">
                <ul className="text-black space-y-1 p-2">{renderDropdownItems('state')}</ul>
              </div>
            )}
          </div>

          {/* City Dropdown */}
          <div className="relative w-1/4 min-w-[200px]">
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'city' ? null : 'city')}
              disabled={!selectedState}
              className={`text-white flex items-center gap-2 px-4 py-2 rounded-md ${
                selectedState
                  ? 'bg-[#274C77] hover:bg-[#1C3558]'
                  : 'bg-gray-400 cursor-not-allowed'
              } w-full sm:w-auto`}
            >
              <MdLocationCity className="text-white" />
              <span>{selectedCity || 'Select City'}</span>
              <MdArrowDropDown
                className={`text-white transition-transform duration-200 ${
                  activeDropdown === 'city' ? 'rotate-180' : ''
                }`}
              />
            </button>
            {activeDropdown === 'city' && (
              <div className="absolute left-0 w-full mt-2 bg-white rounded-md shadow-lg max-h-64 overflow-y-auto z-10">
                <ul className="text-black space-y-1 p-2">{renderDropdownItems('city')}</ul>
              </div>
            )}
          </div>
        </div>

        {/* Updated section including DwlrCouting */}
        <div className="bottom w-full h-[80vh] flex flex-wrap justify-evenly p-2">
          <DwlrCouting />
          <DashFchart selectedState={selectedState} selectedCity={selectedCity} />
          <DasbSchart selectedState={selectedState} selectedCity={selectedCity} />
          <Comaparison />
          <DashIndia />
          <DashLast />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

