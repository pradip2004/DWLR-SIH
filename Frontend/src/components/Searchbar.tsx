import React from 'react';

import { Search } from 'lucide-react';

const Searchbar = () => {
  return (
    <div className="search-container bg-white flex items-center rounded-md px-4 py-2">
      <Search className="text-black text-lg mr-2" />
      <input
        type="text"
        placeholder="Search"
        className="w-full outline-none text-gray-700 placeholder-gray-400"
      />
    </div>
  );
};

export default Searchbar;
