import React, { useState, useEffect } from 'react';

export const SalaryPage = () => {
  const [jobs, setJobs] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetch("salary.json")
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(error => console.error("Error fetching jobs:", error));
  }, [searchText]);

  const handleSearch = () => {
    fetch("salary.json")
      .then(res => res.json())
      .then(data => {
        const filteredJobs = data.filter((job) =>
          job.title.toLowerCase().includes(searchText.toLowerCase())
        );
        setJobs(filteredJobs);
      })
      .catch(error => console.error("Error fetching jobs:", error));
  };

  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
<h1 className='text-center p-4 text-4xl text-blue'>Estimate Salary</h1>
<div className='mt-5'>
        <div className='search-box p-2 text-center mb-2 flex'>
          <input
            type="text"
            name="search"
            id="search"
            className='w-full px-4 py-2 border-2 border-blue rounded-md md:rounded-l-md md:rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue bg-wht'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button onClick={handleSearch} 
          className='bg-blue text-wht font-semibold px-8 py-2  ml-2 rounded-md md:rounded-l-md md:rounded-r-md '
          >
            Search
          </button>
        </div>
      </div>
      <div className="job-results grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-12 my-12 items-center">
        {jobs.map((job, index) => (
          <div key={index} className="job-item p-4 border-b shadow-lg bg-white rounded-lg">
            <h3 className="font-semibold">{job.title}</h3>
            <p className='my-2 font-medium text-blue text-lg'>{job.salary}</p>
            <p className='my-2 font-medium text-gray text-md'>{job.skills}</p>
            <p className='my-2 font-medium text-gray text-md'>{job.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

