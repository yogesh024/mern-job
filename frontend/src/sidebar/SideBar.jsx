import React from 'react';
import { Location } from './Location';
import { Salary } from './Salary';
import { JobPostingData } from './JobPostingData';
import WorkExperience from './WorkExperience';
import { EmployementType } from './EmployementType';

export const SideBar = ({ handleChange, handleClick }) => {
  return (
    <div className=' space-y-5'>
      <h3 className=' text-lg font-bold mb-2'>Filter</h3>

      <Location handleChange={handleChange}/>
      <Salary handleClick={handleClick} handleChange={handleChange}/>
      <JobPostingData handleChange={handleChange}/>
      <WorkExperience handleChange={handleChange}/>
      <EmployementType handleChange={handleChange}/>

    </div>
  );
};
