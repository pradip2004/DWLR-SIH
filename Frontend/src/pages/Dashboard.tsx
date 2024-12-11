import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdLocationOn, MdLocationCity, MdArrowDropDown } from 'react-icons/md';
import { useDwlrContext } from '../context/DwlrContext'; 
import DwlrCounting from '../components/DwlrCouting';
import DashFchart from '../components/DashFchart';
import DashSchart from '../components/DasbSchart';
import DashIndia from '../components/DashIndia';
import DashForm from '../components/DashForm';
import Duser from '../components/Duser';
import LineGraphDwCounting from '../components/LineGraphDwCouting';

const Dashboard = () => {
  // State and context setup
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [districts, setDistricts] = useState<string[]>([]);
  const { data, loading, error, setData } = useDwlrContext();
  const [highlightedDistricts, setHighlightedDistricts] = useState<string[]>([]);


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

  const fetchHighlightedDistricts = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/dwlr/coordinates-info`);
      const districts = response.data
        .filter((item: any) => item.lowBattery)
        .map((item: any) => item.district);
  
      setHighlightedDistricts(districts);
    } catch (err) {
      console.error("Error fetching highlighted districts:", err);
    }
  };

  useEffect(() => {
    fetchHighlightedDistricts();
  }, []);
  
   

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
  }
    return (
      <div className="w-[100vw]">
        <div className="w-full h-[90vh] p-2 bg-[#DEFFFC] flex flex-wrap justify-evenly gap-2 overflow-scroll">
        <div className="w-full h-[10vh] xl:h-[5vh] flex flex-col xl:flex-row items-center justify-between px-4">
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

          <div className="w-full min-h-screen flex flex-col ">
            <div className="flex gap-2 w-full flex-col sm:flex-row mt-4 h-auto ">
              <div className="sm:w-1/2 w-full flex flex-col h-[90vh] bg-white rounded-md overflow-hidden shadow-lg">
                <DwlrCounting />
                <LineGraphDwCounting />
              </div>
              <div className="sm:w-1/2 w-full h-[90vh] p-2 bg-white rounded-md shadow-lg">
                <div className="shadow-xl w-full  h-full">
                  <DashFchart selectedState={selectedState} selectedCity={selectedCity}/>
                  <DashSchart selectedState={selectedState} selectedCity={selectedCity}/>
                </div>
              </div>
            </div>
            <div className="flex gap-2 w-full  sm:flex-row flex-col mt-4 h-auto">
              <div className="sm:w-1/2 w-full h-full bg-white rounded-md shadow-lg">
              <DashIndia selectedState={selectedState} districtsToHighlight={highlightedDistricts} />


              </div>
              <div className="sm:w-1/2 w-full h-full flex sm:flex-row flex-col bg-white rounded-md shadow-lg">
                <DashForm />
                <Duser />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Dashboard;


