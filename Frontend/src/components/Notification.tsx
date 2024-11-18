import React from 'react'

function Notification() {
  return (
      <div className='w-[80%] bg-white shadow-xl p-3 rounded-lg border flex justify-between'>
      <div className='flex h-full'>
        <div className='h-full flex justify-center items-center px-3'>
          🔔
        </div>
        <div>
          <h1 className='text-xl font-kameron font-bold'>DWLRs ID</h1>
          <h3 className='text-md font-kameron text-[#4E4E4E]'>problem</h3>
          <h3 className='text-md font-kameron text-[#4E4E4E]'>explain in one line</h3>
        </div>
       
      </div>
      <div className='flex h-full flex-col justify-around border-l pl-4'>
          <button className='px-4 py-1 bg-[#274C77] text-white'>Details</button>
          <button className='px-4 py-1 bg-[#274C77] text-white'>Hide</button>
        </div>

    </div>
  )
}

export default Notification