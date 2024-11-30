import React from 'react';

import { Search } from 'lucide-react';

const Searchbar = () => {
  return (
    <div className="search-container bg-white flex items-center rounded-lg px- py-2 mx-1 ">
      <Search className="text-black ml-3 text-lg mr-2" />
      <input
        type="text"
        placeholder="Search"
        className="w-full  outline-none text-gray-700 placeholder-gray-400"
      />
    </div>
  );
};

export default Searchbar;
