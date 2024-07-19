import React from 'react';

export const ResumeModal = ({ imageUrl, onClose }) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
      <div className='bg-white p-4 rounded-lg shadow-lg max-w-lg w-full'>
        <button 
          className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'
          onClick={onClose}
        >
          <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12'></path>
          </svg>
        </button>
        <img 
          src={imageUrl} 
          alt="resume" 
          className='w-full h-auto rounded-lg'
        />
      </div>
    </div>
  );
};
