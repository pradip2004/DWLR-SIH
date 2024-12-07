import React, { useState } from 'react';
import { MdLocationOn, MdLocationCity, MdArrowDropDown } from 'react-icons/md';
import { useDwlrContext } from '../context/DwlrContext'; // Assuming you have this context
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

  // Handle Dropdown Item Selection
  const handleDropdownSelect = (type: 'state' | 'city', value: string) => {
    if (type === 'state') {
      setSelectedState(value);
    } else if (type === 'city') {
      setSelectedCity(value);
    }
    setActiveDropdown(null);
  };

  // Render Dropdown Items based on selection
  const renderDropdownItems = (type: 'state' | 'city') => {
    const items = type === 'state' ? districts : []; // Add city data here
    return items.map((item) => (
      <li
        key={item}
        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
        onClick={() => handleDropdownSelect(type, item)}
      >
        {item}
      </li>
    ));
  };

  return (
    <div className="w-[100vw]">
      <div className="w-full h-[90vh] p-2 bg-[#DEFFFC] flex flex-wrap justify-evenly gap-2 overflow-scroll">
        <div className="w-full h-[5vh] gap-10 flex items-center justify-between px-4 ">
          {/* State Dropdown */}
          <div className="relative">
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'state' ? null : 'state')}
              className="text-white flex items-center justify-between px-4 py-2 rounded-md bg-[#274C77] hover:bg-gray-800 w-full sm:w-auto"
            >
              <MdLocationOn className="text-white" />
              <span className="flex-1 text-center">
                {selectedState
                  ? selectedState
                  : 'State'}
              </span>
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
              className="text-white flex items-center justify-between px-4 py-2 rounded-md bg-[#274C77] hover:bg-gray-800 w-full sm:w-auto"
            >
              <MdLocationCity className="text-white" />
              <span className="flex-1 text-center">
                {selectedCity
                  ? selectedCity
                  : 'City'}
              </span>
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
        </div>

        <div className="w-full min-h-screen flex flex-col ">
          <div className="flex gap-2 w-full mt-4 h-[80vh] ">
            <div className="w-1/2 flex flex-col h-[80vh] bg-white rounded-md overflow-hidden shadow-lg">
              <DwlrCounting/>
              <LineGraphDwCounting/>
            </div>
            <div className="w-1/2 h-[80vh] p-2 bg-white rounded-md shadow-lg">
              <div className="shadow-xl w-full h-full">
               <DashFchart/>
                <DashSchart/>
              </div>
            </div>
          </div>
          <div className="flex gap-2 w-full mt-4 h-[40vh]">
            <div className="w-1/2 h-full bg-white rounded-md shadow-lg">
             <DashIndia/>
            </div>
            <div className="w-1/2 h-full flex bg-white rounded-md shadow-lg">
             <DashForm/>
              <Duser/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// import React, { useState, useEffect } from 'react';
// import { MdLocationOn, MdLocationCity, MdArrowDropDown } from 'react-icons/md';
// import axios from 'axios';
// import DashFchart from '../components/DashFchart';
// import DasbSchart from '../components/DasbSchart';
// import Comaparison from '../components/Comaparison';
// import DashIndia from '../components/DashIndia';
// import DashLast from '../components/DashLast';
// import DwlrCouting from '../components/DwlrCouting';
// import { useDwlrContext } from '../context/DwlrContext';

// const Dashboard = () => {
//   const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
//   const [selectedState, setSelectedState] = useState<string | null>(null);
//   const [selectedCity, setSelectedCity] = useState<string | null>(null);
//   const [districts, setDistricts] = useState<string[]>([]);
//   const { data, loading, error, setData } = useDwlrContext();

//   useEffect(() => {
//     if (selectedState) {
//       fetchDistricts(selectedState);
//     }
//   }, [selectedState]);

//   const fetchDistricts = async (state: string) => {
//     try {
//       const response = await axios.get<{ districts: string[] }>(`http://localhost:8000/api/v1/dwlr/districts?state=${state}`);
//       setDistricts(response.data.districts);
//     } catch (error) {
//       console.error('Error fetching districts:', error);
//       setDistricts([]);
//     }
//   };

//   const fetchAndUpdateData = async (queryKey: string, queryValue: string) => {
//     try {
//       const response = await axios.get(`http://localhost:8000/api/v1/dwlr/info?${queryKey}=${queryValue}`);
//       setData({
//         ...data,
//         ...response.data,
//       });
//     } catch (err) {
//       console.error('Error fetching data:', err);
//     }
//   };

//   const handleSelectItem = async (type: string, item: any) => {
//     if (type === 'state') {
//       setSelectedState(item.name);
//       setSelectedCity(null);
//       await fetchAndUpdateData('state', item.name);
//     } else if (type === 'city') {
//       setSelectedCity(item.name);
//       await fetchAndUpdateData('district', item.name);
//     }
//     setActiveDropdown(null);
//   };

//   const renderDropdownItems = (type: string) => {
//     if (loading) return <li className="px-4 py-2">Loading...</li>;
//     if (error) return <li className="px-4 py-2 text-red-500">Error: {error}</li>;

//     if (type === 'state') {
//       return data?.states?.map((state: string, index: number) => (
//         <li
//           key={index}
//           className="px-4 py-2 hover:bg-gray-200 cursor-pointer rounded-md transition-all duration-200"
//           onClick={() => handleSelectItem('state', { name: state })}
//         >
//           {state}
//         </li>
//       ));
//     }

//     if (type === 'city' && districts.length > 0) {
//       return districts.map((district: string, index: number) => (
//         <li
//           key={index}
//           className="px-4 py-2 hover:bg-gray-200 cursor-pointer rounded-md transition-all duration-200"
//           onClick={() => handleSelectItem('city', { name: district })}
//         >
//           {district}
//         </li>
//       ));
//     }

//     return <li className="px-4 py-2">No items available</li>;
//   };

//   return (
//     <div>
//       <div className="w-[87vw] h-[90vh] p-5 bg-[#DEFFFC] flex flex-wrap justify-evenly gap-2">
//         <div className="w-full h-[5vh] flex items-center justify-between px-4">
//           {/* State Dropdown */}
//           <div className="relative w-1/4 min-w-[200px]">
//             <button
//               onClick={() => setActiveDropdown(activeDropdown === 'state' ? null : 'state')}
//               className="text-white flex items-center gap-2 px-4 py-2 rounded-md bg-[#274C77] hover:bg-[#1C3558] w-full sm:w-auto"
//             >
//               <MdLocationOn className="text-white" />
//               <span>{selectedState || 'Select State'}</span>
//               <MdArrowDropDown
//                 className={`text-white transition-transform duration-200 ${
//                   activeDropdown === 'state' ? 'rotate-180' : ''
//                 }`}
//               />
//             </button>
//             {activeDropdown === 'state' && (
//               <div className="absolute left-0 w-full mt-2 bg-white rounded-md shadow-lg max-h-64 overflow-y-auto z-10">
//                 <ul className="text-black space-y-1 p-2">{renderDropdownItems('state')}</ul>
//               </div>
//             )}
//           </div>

//           {/* City Dropdown */}
//           <div className="relative w-1/4 min-w-[200px]">
//             <button
//               onClick={() => setActiveDropdown(activeDropdown === 'city' ? null : 'city')}
//               disabled={!selectedState}
//               className={`text-white flex items-center gap-2 px-4 py-2 rounded-md ${
//                 selectedState
//                   ? 'bg-[#274C77] hover:bg-[#1C3558]'
//                   : 'bg-gray-400 cursor-not-allowed'
//               } w-full sm:w-auto`}
//             >
//               <MdLocationCity className="text-white" />
//               <span>{selectedCity || 'Select City'}</span>
//               <MdArrowDropDown
//                 className={`text-white transition-transform duration-200 ${
//                   activeDropdown === 'city' ? 'rotate-180' : ''
//                 }`}
//               />
//             </button>
//             {activeDropdown === 'city' && (
//               <div className="absolute left-0 w-full mt-2 bg-white rounded-md shadow-lg max-h-64 overflow-y-auto z-10">
//                 <ul className="text-black space-y-1 p-2">{renderDropdownItems('city')}</ul>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Updated section including DwlrCouting */}
//         <div className="bottom w-full h-[80vh] flex flex-wrap justify-evenly p-2">
//           <DwlrCouting />
//           <DashFchart selectedState={selectedState} selectedCity={selectedCity} />
//           <DasbSchart selectedState={selectedState} selectedCity={selectedCity} />
//           <Comaparison />
//           <DashIndia />
//           <DashLast />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

