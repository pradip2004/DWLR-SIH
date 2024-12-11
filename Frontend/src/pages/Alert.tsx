import axios from 'axios';
import React, { useState } from 'react';
import { FaBatteryHalf, FaClock, FaMapMarkedAlt, FaTint } from 'react-icons/fa';
import Loading from '../components/Loading';
import NotData from '../components/NotData';
import Notification from '../components/Notification';
import { useDwlrContext } from '../context/DwlrContext';

const Alert: React.FC = () => {
  const { data, loading, error } = useDwlrContext();
  const [details, setDetails] = useState<any | null>(null); 

  const fetchDetails = async (id: string) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/dwlr/details/${id}`);
      setDetails(response.data);
    } catch (err) {
      console.error('Error fetching details:', err);
    }
  };

  if (loading) return <Loading />;
  if (error) return <NotData />;

  return (
    <div className="w-full flex-col sm:flex-row gap-5 px-10 flex justify-around items-center">
      {/* Left Side Notifications */}
      <div className="sm:w-1/2 w-full px-4 h-[90%] bg-white rounded-lg flex flex-col gap-3 overflow-y-scroll items-center p-3">
        {data?.coordinates.map((coordinate) => (
          <Notification
            key={coordinate._id}
            id={coordinate.id}
            problem={coordinate.anomalyDwlr ? 'Anomaly Data' : 'Low Battery'}
            onDetailsClick={() => fetchDetails(coordinate._id)}
          />
        ))}
      </div>

      {/* Right Side Details and Map */}
      <div className="sm:w-1/2 w-full shadow-lg h-[90%] bg-white rounded-lg flex flex-col justify-between">
        {details ? (
          <>
            {/* Map Section */}
            <div className="w-full h-2/3">
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345090047!2d${details.longitude}!3d${details.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!5e0!3m2!1sen!2s!4v1639531059384`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="DWLR Location Map"
              />
            </div>
            {/* Details Section */}
            <div className="flex w-full h-auto flex-wrap gap-4 p-2">
  {/* State and District Information */}
  <div className="flex flex-wrap w-full sm:w-[48%] border-2 drop-shadow-lg border-[#274C77] bg-white rounded-md shadow-lg p-4">
    <div className="flex-1 flex flex-col gap-2 justify-center">
      <h1 className="text-sm font-bold text-[#274C77] flex items-center gap-2">
        <FaMapMarkedAlt className="text-[#274C77]" /> State: {details.state}
      </h1>
      <h2 className="text-sm text-gray-600 font-medium">
        District: {details.district}
      </h2>
    </div>
    <div className="flex-1 flex flex-col gap-2 justify-center">
      <h1 className="text-sm font-bold text-[#274C77] flex items-center gap-2">
        <FaClock className="text-[#274C77]" /> Active
      </h1>
      <h2 className="text-sm text-gray-600 font-medium">
        {details.active ? 'Yes' : 'No'}
      </h2>
    </div>
  </div>

  {/* Water Level and Battery Information */}
  <div className="flex flex-wrap w-full sm:w-[48%] border-2 drop-shadow-lg border-[#274C77] bg-white rounded-md shadow-lg p-4">
    <div className="flex-1 flex flex-col gap-2 justify-center">
      <h1 className="text-sm font-bold text-[#274C77] flex items-center gap-2">
        <FaTint className="text-[#274C77]" /> Water Level
      </h1>
      <h2 className="text-sm text-gray-600 font-medium">
        {details.latestWaterLevel} m
      </h2>
    </div>
    <div className="flex-1 flex flex-col gap-2 justify-center">
      <h1 className="text-sm font-bold text-[#274C77] flex items-center gap-2">
        <FaBatteryHalf className="text-[#274C77]" /> Battery
      </h1>
      <h2 className="text-sm text-gray-600 font-medium">
        {details.latestBatteryPercentage}%
      </h2>
    </div>
  </div>
</div>

          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            <h2>Nothing selected</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alert;





// import React from 'react';
// import Notification from '../components/Notification';
// import { FaMapMarkedAlt, FaClock, FaTint, FaBatteryHalf } from 'react-icons/fa';
// import { useDwlrContext } from '../context/DwlrContext';

// const Alert: React.FC = () => {

//   const { data, loading, error } = useDwlrContext();

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;
//   return (
//     <div className="w-full p-2 flex justify-around items-center">
//       <div className="w-[40%] h-[90%] bg-white rounded-lg flex flex-col gap-3 overflow-y-scroll items-center p-3">
//         {data?.coordinates.map((coordinate) => (
//           <Notification
//             key={coordinate._id}
//             id={coordinate.id}
//             problem={(coordinate.anomalyDwlr ? 'Anomaly Data' : 'Low Battery')}
//           />
//         ))}
//       </div>

//       {/* DWLR Description and Map Section */}
//       <div className="w-[40%] shadow-lg  h-[90%]  bg-white rounded-lg  flex flex-col justify-between">
//         <div className="w-full h-2/3 ">
//           <iframe
//             src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345090047!2d144.95373531549934!3d-37.81720997975144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1b4b441%3A0x5045675218ce6e0!2sSample%20Location!5e0!3m2!1sen!2s!4v1639531059384!5m2!1sen!2s`}
//             width="100%"
//             height="100%"
//             style={{ border: 0 }}
//             allowFullScreen
//             loading="lazy"
//             title="DWLR Location Map"
//           />
//         </div>
//         <div className="flex w-full  h-1/3 flex-col gap-2  p-2 ">
//         <div className="w-full h-1/2 border-2  drop-shadow-lg border-[#274C77] bg-white rounded-md shadow-lg flex justify-between">
//         <div className="w-[60%]  h-full flex flex-col gap-1 justify-center px-5">
//         <h1 className='text-md font-bold text-[#274C77] flex items-center gap-4'>  <FaMapMarkedAlt className="text-[#274C77]" /> DWLRs ID - 333333</h1>
//         <h2 className="text-md ml-8 text-gray-600 font-medium">Location: Sample Location</h2>
//         </div>
//         <div className="w-[40%]  h-full flex flex-col gap-1 justify-center ml-20 px-5 ">
//         <h1 className='text-md font-bold text-[#274C77] flex items-center gap-4'>  <FaClock className="text-[#274C77]" />Last Reported</h1>
//         <h2 className="text-md ml-8 text-gray-600 font-medium">6 hours ago</h2></div>
//         </div>
//         <div className="w-full h-1/2 border-2 drop-shadow-md border-[#274C77] bg-white rounded-md shadow-lg flex justify-between">
//         <div className="w-[60%]   h-full flex flex-col gap-1 justify-center px-5">
//         <h1 className='text-md font-bold text-[#274C77] flex items-center gap-4'> <FaTint className="text-[#274C77]" /> Water LevelWater Level</h1>
//         <h2 className="text-md ml-8 text-gray-600 font-medium">5m</h2>
//         </div>
//         <div className="w-[40%]  h-full flex flex-col gap-1 justify-center ml-20 px-5 ">
//         <h1 className='text-md font-bold text-[#274C77] flex items-center gap-4'>    <FaBatteryHalf className="text-[#274C77]" />Battery</h1>
//         <h2 className="text-md ml-8 text-gray-600 font-medium">60%</h2></div>
//         </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Alert;
 
