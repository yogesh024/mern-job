import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Context } from '../main';
import axios from 'axios';

export const MyJob = () => {
  const [jobs, setJobs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const {isAuthroized,user}=useContext(Context);
  
  const navigate=useNavigate();

  const fetchJobs = async() => {
    
   try {
    const{data}= await axios.get("http://localhost:3002/api/postjobs/getMyjob",{
      withCredentials:true,
    })
    
    setJobs(data.jobs);
    setLoading(false);
    console.log(data.jobs);


   } catch (error) {
    toast.error(error.response.data.message);
    setJobs([]);
    setLoading(false);
   }
  };
  // console.log(jobs);
  // console.log(isAuthroized);
  console.log(user.isRecruiter);

  useEffect(() => {
    fetchJobs();
  }, []);

  if(!isAuthroized||user&& !user.isRecruiter){
    navigate("/login");
  }

  
  const handleSearch = async() => {
    try{
      setLoading(true);
    const {data}=await axios.get("http://localhost:3002/api/my-jobs/getMyjob",{
      withCredentials:true
    });
    const filteredJobs = data.jobs.filter(job =>
      job.jobTitle.toLowerCase().includes(searchText.toLowerCase())
    );
  
        setJobs(filteredJobs);
        setLoading(false);
    }catch(error) {
      toast.error(error.response.data.message);
        setLoading(false);
      }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3002/api/delete/${id}`, {
        withCredentials: true
      });
  
      if (response.data.acknowledged) {
        alert('Job deleted successfully!');
        // Refresh the job list (assuming fetchJobs is defined and refreshes the job list)
        fetchJobs();
      } else {
        alert('Failed to delete job.');
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      alert('Error deleting job.');
    }
  };
  


 


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = jobs.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (indexOfLastItem < jobs.length) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  return (
    <div className='max-w-6xl container mx-auto xl:px-24 px-4'>
      <div className='my-jobs-container'>
        <h1 className='text-center p-4'>ALL MY JOBS</h1>
        <div className='flex mb-4'>
          <input
            type="text"
            name="search"
            id="search"
            className='py-2 pl-3 border focus:outline-none lg:w-6/12 w-full'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button onClick={handleSearch} className='bg-blue text-wht font-semibold px-8 py-2 rounded-sm ml-2'>
            Search
          </button>
        </div>
      </div>
      <section className="py-1 bg-blueGray-50">
        <div className="w-full mb-12 px-4 mx-auto mt-5">
          <div className="relative flex flex-col min-w-0 break-words bg-wht w-full mb-6 shadow-lg rounded">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">All Jobs</h3>
                </div>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <Link to='/postjobs'>
                    <button className="bg-blue text-wht active:bg-blue- text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                      Post new job
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      No.
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Title
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Company name
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Salary
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Edit
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Delete
                    </th>
                  </tr>
                </thead>
                {isLoading ? (
                  <tbody>
                    <tr>
                      <td colSpan="6" className="text-center p-4">Loading...</td>
                    </tr>
                  </tbody>
                ) : (
                  <tbody>
                    {currentJobs.map((job, index) => (
                      <tr key={job._id}>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                          {indexOfFirstItem + index + 1}
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {job.jobTitle}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {job.companyName}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          ${job.minPrice} - ${job.maxPrice}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <Link to={`/edit-job/${job._id}`}>Edit</Link>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <button onClick={() => handleDelete(job._id)} className='bg-red text-wht py-2 px-6 rounded-sm'>Del</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
            {/* Pagination */}
            <div className="flex justify-between p-4">
              <button
                onClick={prevPage}
                className={`bg-blue-500 text-white font-semibold px-4 py-2 rounded-sm ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                onClick={nextPage}
                className={`bg-blue-500 text-white font-semibold px-4 py-2 rounded-sm ${indexOfLastItem >= jobs.length ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={indexOfLastItem >= jobs.length}
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <footer className="relative pt-8 pb-6 mt-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center md:justify-between justify-center">
              <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                <div className="text-sm text-blueGray-500 font-semibold py-1">
                  Made with <a href="https://www.creative-tim.com/product/notus-js" className="text-blueGray-500 hover:text-gray-800" target="_blank" rel="noopener noreferrer">Notus JS</a> by <a href="https://www.creative-tim.com" className="text-blueGray-500 hover:text-blueGray-800" target="_blank" rel="noopener noreferrer"> Creative Tim</a>.
                </div>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
};
