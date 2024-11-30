import React from 'react';

function DwlrCouting() {
  // Data for DWLRs
  const dwlrsData = {
    total: 100,
    active: 75,
    problematic: 15,
    lowBattery: 10
  };

  // Categories for displaying in the black box
  const categories = [
    { label: "Total DWLRs", value: dwlrsData.total },
    { label: "ACTIVE DWLRs", value: dwlrsData.active },
    { label: "Problematic DWLRs", value: dwlrsData.problematic },
  ];

  return (
    <>
      {/* Wrapper Div with Black Box */}
      <div className="first w-[30vw]  h-[38vh] overflow-y-scroll bg-white  p-4 sm:p-6 lg:p-8 rounded-md shadow-lg overflow-hidden">
        {/* Categories Content Inside the Black Box */}
        <div className="flex flex-col justify-evenly t gap-2 h-full">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex w-full justify-between items-baseline mb-2 px-6 sm:px-8"
            >
              <h1 className="text-2xl flex items-center gap-6 font-bold uppercase tracking-wider text-black ">
                {category.label}
              </h1>
              <p className="text-5xl text-[#274C77] font-extrabold">
                {category.value}
              </p> 
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default DwlrCouting;
