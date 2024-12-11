import React from 'react';

interface NotificationProps {
  id: string;
  problem: string;
  onDetailsClick: () => void;
}

const Notification: React.FC<NotificationProps> = ({ id, problem, onDetailsClick }) => {
  return (
    <div className="w-full bg-white shadow-xl p-3 rounded-lg border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
    <div className="flex items-start sm:items-center w-full sm:w-auto">
      <div className="flex justify-center items-center px-3 text-xl">🔔</div>
      <div>
        <h1 className="text-lg sm:text-xl font-bold">{id}</h1>
        <h3 className="text-sm sm:text-md text-[#4E4E4E]">{problem}</h3>
      </div>
    </div>
    <div className="flex w-full sm:w-auto flex-row sm:flex-col gap-2 justify-between sm:justify-around border-t sm:border-t-0 sm:border-l pt-2 sm:pt-0 sm:pl-4">
      <button
        className="px-4 py-2 w-full sm:w-auto bg-[#274C77] text-white rounded-md hover:bg-[#1d3a5a] transition duration-200"
        onClick={onDetailsClick}
      >
        Details
      </button>
      <button className="px-4 py-2 w-full sm:w-auto bg-[#274C77] text-white rounded-md hover:bg-[#1d3a5a] transition duration-200">
        Hide
      </button>
    </div>
  </div>
  
  );
};

export default Notification;




// import React from 'react'

// function Notification({id, problem}) {
//   return (
//       <div className='w-[80%] bg-white shadow-xl p-3 rounded-lg border flex justify-between'>
//       <div className='flex h-full'>
//         <div className='h-full flex justify-center items-center px-3'>
//           🔔
//         </div>
//         <div>
//           <h1 className='text-xl font-kameron font-bold'>{id}</h1>
//           <h3 className='text-md font-kameron text-[#4E4E4E]'>{problem}</h3>
//         </div>
       
//       </div>
//       <div className='flex h-full flex-col gap-1 justify-around border-l pl-4'>
//           <button className='px-4 py-1 bg-[#274C77] text-white'>Details</button>
//           <button className='px-4 py-1 bg-[#274C77] text-white'>Hide</button>
//         </div>

//     </div>
//   )
// }

// export default Notification