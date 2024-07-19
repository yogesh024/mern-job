import React, { useState } from 'react';
import { BsSearch } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";

const Banner = ({ query, handleInputChange }) => {
  const [location, setLocation] = useState("");

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 md:py-20 py-14'>
      <h1 className='text-5xl font-bold text-black mb-0'>
        Find your <span className='text-blue-500'>new job</span> today
      </h1>
      <p className='text-lg text-black/70 mb-8'>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio, unde rem laborum enim ipsam praesentium repellat quae aut doloribus quasi repudiandae ea ex voluptate ad corrupti, maxime, omnis non esse!
      </p>
      <form action="" className='space-y-4'>
        <div className='flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x'>
          <div className='relative w-full md:flex-1'>
            <input 
              type="text" 
              placeholder="Job Title or Keyword" 
              className='w-full px-4 py-2 border-2 border-gray-500 rounded-md md:rounded-l-md md:rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white'
              value={query}
              onChange={handleInputChange}
            />
            <BsSearch className='absolute right-3 top-3 text-blue-500' />
          </div>
          <div className='relative w-full md:flex-1'>
            <input 
              type="text" 
              placeholder="Location" 
              className='w-full px-4 py-2 border-2 border-gray-500 rounded-md md:rounded-l-md md:rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white'
              value={location}
              onChange={handleLocationChange}
            />
            <CiLocationOn className='absolute right-3 top-3 text-blue-500' />
          </div>
          <div className='w-full md:w-auto'>
            <button 
              type="submit" 
              className='w-full md:w-auto px-6 py-2.5 bg-blue text-wht rounded-md md:rounded-r-md md:rounded-l-md hover:bg-blue focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center'
            >
              <BsSearch className='mr-2' />
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Banner;
