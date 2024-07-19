import React from 'react';
import { FaEnvelopeOpenText, FaRocket } from 'react-icons/fa6';

export const Newsletter = () => {
  return (
    <>
      <div>
        <h3 className='text-lg font-bold mb-2 flex items-center gap-2'>
          <FaEnvelopeOpenText />
          Email me for jobs
        </h3>
        <p className='text-black/75 text-base mb-4'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Nostrum voluptatum asperiores distinctio saepe 
          dignissimos deserunt non odit in dolores vel 
          iste, excepturi commodi iure laboriosam iusto 
          soluta quibusdam, porro consectetur.
        </p>
        <div className='w-full space-y-4'>
          <input
            type="email"
            name="email"
            id="email"
            placeholder='name@gmail.com'
            className='w-full py-2 pl-3 border focus:outline-none'
          />
          <input
            type="submit"
            value="Subscribe"
            className='w-full py-2 pl-3 border focus:outline-none bg-blue rounded-sm text-wht cursor-pointer font-semibold'
          />
        </div>
      </div>

      {/* 2nd part */}
      <div className='mt-8'>
        <h3 className='text-lg font-bold mb-2 flex items-center gap-2'>
          <FaRocket />
          Get noticed faster
        </h3>
        <p className='text-black/75 text-base mb-4'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Nostrum voluptatum asperiores distinctio saepe 
          dignissimos deserunt non odit in dolores vel 
          iste, excepturi commodi iure laboriosam iusto 
          soluta quibusdam, porro consectetur.
        </p>
        <div className='w-full space-y-4'>
          <input
            type="submit"
            value="Upload your resume"
            className='w-full py-2 pl-3 border focus:outline-none bg-blue rounded-sm text-wht cursor-pointer font-semibold'
          />
        </div>
      </div>
    </>
  );
};
