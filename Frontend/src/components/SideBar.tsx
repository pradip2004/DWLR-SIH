import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function SideBar() {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'DWLRs', path: '/all-dwlrs' },
    { name: 'Alert', path: '/alert' },
    { name: 'Report', path: '/report' },
  ];

  return (
    <div className='w-60 p-2 bg-[#274C77]'>
      <h2 className='font-kameron text-white'>MENU</h2>
      <div className='w-full mt-4 flex flex-col gap-4'>
        {menuItems.map((item) => (
          <Link
            to={item.path}
            key={item.path}
            className={`w-full flex items-center justify-center uppercase bg-[#FED766] py-4 hover:bg-[#FFC107] ${
              location.pathname === item.path ? 'bg-[#b89323]' : ''
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SideBar;
