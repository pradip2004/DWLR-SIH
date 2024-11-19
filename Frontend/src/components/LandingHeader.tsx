import React from 'react'

function LandingHeader() {
  return (
    <div className='w-full absolute p-3 flex items-center justify-between bg-white/15 backdrop-blur-md'>
      <div>
            <img className='w-24' src="/logo1.png" alt="" />
      </div>
      <div className='flex gap-3'>
            <img className='w-16' src="/logo2.png" alt="" />
            <img className='w-16' src="/logo3.png" alt="" />
      </div>
    </div>
  )
}

export default LandingHeader