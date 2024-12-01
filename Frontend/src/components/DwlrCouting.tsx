import React from 'react';
import { useDwlrContext } from '../context/DwlrContext';

function DwlrCounting() {
  const { data, loading, error } = useDwlrContext();

  const totalDwlr = data?.total || 0;
  const activeDwlr = data?.active || 0;
  const problematicDwlr = (data?.lowBattery || 0) + (data?.anomalyDwlr || 0);

  const categories = [
    { label: "Total DWLRs", value: totalDwlr },
    { label: "Active DWLRs", value: activeDwlr },
    { label: "Problematic DWLRs", value: problematicDwlr },
  ];

  if (loading) {
    return (
      <div className="loading-container flex items-center justify-center h-[38vh] bg-gray-100 p-4 rounded-md shadow-md">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container flex items-center justify-center h-[38vh] bg-red-100 p-4 rounded-md shadow-md">
        <p className="text-xl text-red-600">An error occurred: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="dwlr-counting w-[30vw] h-[38vh] overflow-y-scroll bg-white p-4 sm:p-6 lg:p-8 rounded-md shadow-lg">
      <div className="categories-content flex flex-col justify-evenly gap-4 h-full">
        {categories.map((category, index) => (
          <div
            key={index}
            className="category-item flex w-full justify-between items-baseline px-6 sm:px-8"
          >
            <h1 className="text-2xl flex items-center gap-6 font-bold uppercase tracking-wide text-black">
              {category.label}
            </h1>
            <p className="text-5xl text-[#274C77] font-extrabold">
              {category.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DwlrCounting;
