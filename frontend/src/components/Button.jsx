import React from 'react';

export const Button = ({ onClickHandler, value, title }) => {
  return (
    <button onClick={onClickHandler} value={value} className='px-10 py-3 border text-base hover:bg-blue hover:text-wht'>
      {title}
    </button>
  );
};
