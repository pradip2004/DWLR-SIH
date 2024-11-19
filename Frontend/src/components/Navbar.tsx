import React from 'react'

function Navbar() {
      return (
            <div className='w-full h-[10vh] p-3 flex items-center justify-between bg-white'>
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

export default Navbar