import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import SideBar from './components/SideBar';

const App: React.FC = () => {
  return (
    <div className="overflow-hidden h-screen bg-white">
      <Navbar />
      <div className="flex bg-[#DEFFFC] h-[90vh]">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
};

export default App;
