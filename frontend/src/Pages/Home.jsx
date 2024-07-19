import React, { useContext, useEffect, useState } from 'react';
import Banner from '../components/Banner';
import { Jobs } from './Jobs';
import { Card } from '../components/Card';
import { SideBar } from '../sidebar/SideBar';
import { Newsletter } from '../components/Newslatter';
import { Context } from '../main';

export const Home = () => {
  const  {isAuthrozied}=useContext(Context);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Fetching data from API
  useEffect(() => {
    setIsLoading(true);

    fetch("http://localhost:3002/api/postjobs/all-jobs")
      .then(res => res.json())
      .then(data => {
        setJobs(data);
        setIsLoading(false);
      });
  }, [isAuthrozied]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  // Filter jobs by title
  const filteredItems = jobs.filter((job) => {
    return job.jobTitle.toLowerCase().includes(query.toLowerCase());
  });

  // Radio-based filtering
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Button-based filtering
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Calculating the index range
  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  // Function for the next page
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function for the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Main function
  const filteredData = (jobs, selected, query) => {
    let filteredJobs = jobs;
    // Filtering input items
    if (query) {
      filteredJobs = filteredItems;
    }


    // Category filtering
    if (selected) {
      filteredJobs = filteredJobs.filter(({
         jobLocation, 
         maxPrice, 
         experienceLevel, 
         salaryType, 
         employmentType,
          postingDate
         }) => {
        return (
          jobLocation.toLowerCase() === selected.toLowerCase() ||
          parseInt(maxPrice) <= parseInt(selected) ||
          postingDate>= selected ||
          salaryType.toLowerCase() === selected.toLowerCase() ||
          experienceLevel.toLowerCase() === selected.toLowerCase()||
          employmentType.toLowerCase() === selected.toLowerCase()
        );
      });
    }


    // Slice the database for the current page
    const { startIndex, endIndex } = calculatePageRange();
    filteredJobs = filteredJobs.slice(startIndex, endIndex);

    return filteredJobs.map((data, i) => <Card key={i} data={data} />);
  };

  const result = filteredData(jobs, selectedCategory, query);

  return (
    <div className='text-blue'>
      <Banner query={query} handleInputChange={handleInputChange} />
      <div className='bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 py-12'>
        {/* Left side */}
        <div className='bg-wht p-4 rounded'>
          <SideBar handleChange={handleChange} handleClick={handleClick} />
        </div>
        
        {/* Job cards */}
        <div className='col-span-2 ng-wgt p-4 rounded-sm'>
          {isLoading ? (
            <p className='font-medium'>Loading...</p>
          ) : result.length > 0 ? (
            <Jobs result={result} />
          ) : (
            <>
              <h3 className='text-lg font-bold mb-2'>0 Jobs</h3>
              <p>No data found</p>
            </>
          )}
          {/* Pagination */}
          {result.length > 0 && (
            <div className='flex justify-center mt-4 space-x-8'>
              <button onClick={prevPage} disabled={currentPage === 1}
              className='hover:underline'>Previous</button>
              <span>Page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage)}</span>
              <button onClick={nextPage} disabled={currentPage === Math.ceil(filteredItems.length / itemsPerPage)}
              className='hover:underline'>Next</button>
            </div>
          )}
        </div>
        {/* Right side */}
        <div className='bg-wht p-4 rounded'>
          <Newsletter/>
        </div>
      </div>
    </div>
  );
};

export default Home;
