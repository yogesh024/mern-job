import React, { useContext, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Context } from '../main';
import { useNavigate } from 'react-router-dom';

export const CreateJob = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm();

  const {isAuthroized,user}=useContext(Context);
  const navigate=useNavigate();
   console.log(isAuthroized)

 

  const onSubmit = async (data, resetForm) => {

    try {
      const response = await axios.post("http://localhost:3002/api/postjobs/postjobs", data, {
        withCredentials: true, 
      });
        // Reset the form if needed
      toast.success(response.data.message);
      alert("data stored") ;
      resetForm();
    } catch (error) {
      toast.error(error.response.data.message || "Failed to post job"); // Show error message
      console.error("Error posting job:", error); 
    }
  };
  // useEffect(() => {
  //   if (!isAuthroized || (user && !user.isRecuriter)) {
  //     navigate('/login');
  //   }
  // }, [isAuthroized, user]);

  // console.log("aaaasssss",isAuthroized);
  // if(!isAuthroized|| user && !user.isRecuriter){
  //   navigate('/login');
  // }
  // else{
  //   navigate('/postJobs')
  // }
  
  

  const options = [
    { value: 'JavaScript', label: "JavaScript" },
    { value: 'C++', label: "C++" },
    { value: 'HTML', label: "HTML" },
    { value: 'CSS', label: "CSS" },
    { value: 'React', label: "React" },
    { value: 'Node', label: "Node" },
    { value: 'MongoDb', label: "MongoDb" },
    { value: 'Redux', label: "Redux" },
  ];

  const [imageUrl, setImageUrl] = useState('');

  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
      <div className='bg-white py-10 px-4 lg:px-16 shadow-lg rounded-lg'>
        <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* 1st row */}
          <div className='w-full shadow-lg rounded-md  border-blue p-4'>
            <label htmlFor="jobTitle" className='block mb-2 text-lg font-bold'>Job Title</label>
            <input 
              id="jobTitle"
              placeholder='abc'
              defaultValue="Web Developer"
              {...register("jobTitle", { required: true })} 
              className='block w-full bg-white py-1.5 pl-3 text-blue placeholder:text-gray focus:outline-none sm:text-sm sm:leading-6'
            />
            {errors.jobTitle && <p className='text-red-500'>Job title is required.</p>}
          </div>
          <div className='w-full shadow-lg rounded-md  border-blue p-4'>
            <label htmlFor="companyName" className='block mb-2 text-lg font-bold'>Company Name</label>
            <input 
              id="companyName"
              placeholder='Ex: Microsoft'
              defaultValue="Microsoft"
              {...register("companyName", { required: true })}  
              className='block w-full bg-white py-1.5 pl-3 text-blue placeholder:text-gray focus:outline-none sm:text-sm sm:leading-6'
            />
            {errors.companyName && <p className='text-red-500'>Company name is required.</p>}
          </div>
          {/* 2nd row */}
          <div className='w-full shadow-lg rounded-md  border-blue p-4'>
            <label htmlFor="minPrice" className='block mb-2 text-lg font-bold'>Minimum Salary</label>
            <input 
              id="minPrice"
              placeholder='$20k'
              defaultValue="$20k"
              {...register("minPrice", { required: true })}  
              className='block w-full bg-white py-1.5 pl-3 text-blue placeholder:text-gray focus:outline-none sm:text-sm sm:leading-6'
            />
            {errors.minPrice && <p className='text-red-500'>Minimum salary is required.</p>}
          </div>
          <div className='w-full shadow-lg rounded-md  border-blue p-4'>
            <label htmlFor="maxPrice" className='block mb-2 text-lg font-bold'>Maximum Salary</label>
            <input 
              id="maxPrice"
              placeholder='$100k'
              {...register("maxPrice", { required: true })}  
              className='block w-full bg-white py-1.5 pl-3 text-blue placeholder:text-gray focus:outline-none sm:text-sm sm:leading-6'
            />
            {errors.maxPrice && <p className='text-red-500'>Maximum salary is required.</p>}
          </div>
          {/* 3rd row */}
          <div className='w-full shadow-lg rounded-md  border-blue p-4'>
            <label htmlFor="postingDate" className='block mb-2 text-lg font-bold'>Job Posting Date</label>
            <input 
              id="postingDate"
              type='date'
              {...register("postingDate", { required: true })}  
              className='block w-full bg-white py-1.5 pl-3 text-blue placeholder:text-gray focus:outline-none sm:text-sm sm:leading-6'
            />
            {errors.postingDate && <p className='text-red-500'>Posting date is required.</p>}
          </div>
          <div className='w-full shadow-lg rounded-md  border-blue p-4'>
            <label htmlFor="experienceLevel" className='block mb-2 text-lg font-bold'>Experience Level</label>
            <select 
              id="experienceLevel"
              {...register("experienceLevel", { required: true })} 
              className='block w-full bg-white py-1.5 pl-3 text-blue placeholder:text-gray focus:outline-none sm:text-sm sm:leading-6'
            >
              <option value="">Select Experience Level</option>
              <option value="No experience">No experience</option>
              <option value="Internship">Internship</option>
              <option value="Work remotely">Work remotely</option>
            </select>
            {errors.experienceLevel && <p className='text-red-500'>Experience level is required.</p>}
          </div>
          {/* 4th row */}
          <div className='w-full shadow-lg rounded-md  border-blue p-4'>
            <label htmlFor="salaryType" className='block mb-2 text-lg font-bold'>Salary Type</label>
            <select 
              id="salaryType"
              {...register("salaryType", { required: true })} 
              className='block w-full bg-white py-1.5 pl-3 text-blue placeholder:text-gray focus:outline-none sm:text-sm sm:leading-6'
            >
              <option value="">Choose your salary type</option>
              <option value="Hourly">Hourly</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select>
            {errors.salaryType && <p className='text-red-500'>Salary type is required.</p>}
          </div>
          <div className='w-full shadow-lg rounded-md  border-blue p-4'>
            <label htmlFor="jobLocation" className='block mb-2 text-lg font-bold'>Job Location</label>
            <input 
              id="jobLocation"
              placeholder='Ex: New York'
              {...register("jobLocation", { required: true })}  
              className='block w-full bg-white py-1.5 pl-3 text-blue placeholder:text-gray focus:outline-none sm:text-sm sm:leading-6'
            />
            {errors.jobLocation && <p className='text-red-500'>Job location is required.</p>}
          </div>
          {/* 5th row */}
          <div className='w-full shadow-lg rounded-md  border-blue p-4'>
            <label htmlFor="skills" className='block mb-2 text-lg font-bold'>Required Skills</label>
            <Controller
              name="skills"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <CreatableSelect
                  isMulti
                  options={options}
                  className='basic-multi-select'
                  classNamePrefix="select"
                  {...field}
                />
              )}
            />
          </div>
          {/* 6th row */}
          <div className='w-full shadow-lg rounded-md border-blue p-4'>
            <label htmlFor="companyLogo" className='block mb-2 text-lg font-bold'>Company Logo</label>
            <input 
              id="companyLogo"
              placeholder='Enter your URL here'
              type="url"
              {...register("companyLogo", { required: true })}  
              className='block w-full bg-white py-1.5 pl-3 text-blue placeholder:text-gray focus:outline-none sm:text-sm sm:leading-6'
            />
          {imageUrl && (
          <div className='mt-4'>
            <img
            src={imageUrl}
            alt="Company Logo"
            style={{ width: '10px', height: '10px' }} // Adjust the size here
            className='mt-2'
            />
          </div>
      )}
          </div>
          <div className='w-full shadow-lg rounded-md border-blue p-4'>
            <label htmlFor="employmentType" className='block mb-2 text-lg font-bold'>Employment Type</label>
            <select 
              id="employmentType"
              {...register("employmentType", { required: true })} 
              className='block w-full bg-white py-1.5 pl-3 text-blue placeholder:text-gray focus:outline-none sm:text-sm sm:leading-6'
            >
              <option value="">Select Employment Type</option>
              <option value="Full-time">Full-time</option>
              <option value="Temporary">Temporary</option>
              <option value="Part-time">Part-time</option>
            </select>
          </div>
          {/* 7th row */}
          <div className='w-full col-span-2 shadow-lg rounded-md border-blue p-4'>
            <label className='block mb-2 text-lg font-bold'>Job Description</label>
            <textarea 
              className='w-full bg-white py-1.5 pl-3 focus:outline-none sm:text-sm sm:leading-6'
              rows={6}
              defaultValue="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum ullam praesentium sequi quasi perferendis illum obcaecati suscipit provident animi? Totam necessitatibus consequuntur debitis sequi dicta, a laudantium assumenda fugit blanditiis!"
              placeholder='Job description' 
              {...register("description")} 
            />
          </div>
          {/* Last row */}
          {/* <div className='w-full shadow-lg rounded-md  border-blue p-4'>
            <label htmlFor="postedBy" className='block mb-2 text-lg font-bold'>Job Posted By</label>
            <input 
              id="postedBy"
              // type='text'
              placeholder='Your id'
              {...register("postedBy")}  
              className='block w-full bg-white py-1.5 pl-3 text-blue placeholder:text-gray focus:outline-none sm:text-sm sm:leading-6'
            />
          </div> */}
          <div className='w-full flex justify-end col-span-2'>
            <input 
              type="submit"
              className='py-2 px-5 rounded bg-blue text-white mt-4 shadow-md cursor-pointer'
            />
          </div>
        </form>
      </div>
    </div>
  );
};
