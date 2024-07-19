import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../main';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ResumeModal } from '../Pages/ResumeModal';
import { AiOutlineEye, AiOutlineDelete } from 'react-icons/ai';

export const MyApplication = () => {
  const [apply, setApply] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState('');


  const {isAuthroized,user}=useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        let res;
        if (user && user.isRecruiter) {
          res = await axios.get('http://localhost:3002/api/apply/employer/getall', {
            withCredentials: true,
          });
          setApply(res.data.apply);
        //   console.log("applyE",res.data)
        } else {
          res = await axios.get('http://localhost:3002/api/apply/jobSeeker/getAll', {
            withCredentials: true,
          });
        }
        setApply(res.data.apply);
        // console.log("applyS",res.data)
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error fetching applications');
      }
    };
    // console.log("dsfsfa",isAuthroized)
    

    if (isAuthroized) {
      fetchApplications();
    } else {
      navigateTo('/login');
    }
  }, [isAuthroized, navigateTo, user]);

  const deleteApply = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3002/api/apply/delete/${id}`, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      setApply((prevApply) => prevApply.filter((apply) => apply._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error deleting application');
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
//   console.log("user",user.isRecruiter);


  return (
    <section className="my_applications page">
      <div className="container">
        <h1>{user && user.isRecruiter ? 'Applications From Job Seekers' : 'My Applications'}</h1>
        {apply.length === 0 ? (
          <h4>No Applications Found</h4>
        ) : (
          apply.map((element) => (
            user && user.isRecruiter===false ? (
                <JobSeekerCard
                element={element}
                key={element._id}
                deleteApply={deleteApply}
                openModal={openModal}
              />
            ) : (
              <EmployerCard
                element={element}
                key={element._id}
                openModal={openModal}
              />
            )
          ))
        )}
      </div>
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

const JobSeekerCard = ({ element, deleteApply, openModal }) => {
    return (
         <div className="bg-white shadow-lg rounded-lg p-4 mb-4 border border-gray-200 relative bg-[url('/path/to/your/image.jpg')] bg-cover bg-center">
    <div className="flex items-center mb-4">
      <div className="flex-grow">
        <h2 className="text-xl font-semibold text-dark-blue">{element.name}</h2>
        <p className="text-blue"><span className="font-medium">Email:</span> {element.email}</p>
        <p className="text-blue"><span className="font-medium">Phone:</span> {element.phone}</p>
        <p className="text-blue"><span className="font-medium">Address:</span> {element.address}</p>
        <p className="text-blue"><span className="font-medium">Cover Letter:</span> {element.coverLetter}</p>
        {/* <p className="text-blue text-sm mt-2"><span className="font-medium">ID:</span> {element._id}</p> */}
      </div>
      <div className="ml-4">
        <img
          src={element.resume.url}
          alt="resume"
          className="w-16 h-16 object-cover cursor-pointer rounded-lg"
          onClick={() => openModal(element.resume.url)}
        />
      </div>
    </div>
    <div className="flex justify-between items-center">
      <button
        onClick={() => openModal(element.resume.url)}
        className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300"
      >
        <AiOutlineEye className="w-5 h-5 mr-1" />
        View Resume
      </button>
      <button
        onClick={() => deleteApply(element._id)}
        className="flex items-center text-red-600 hover:text-red-800 transition-colors duration-300"
      >
        <AiOutlineDelete className="w-5 h-5 mr-1" />
        Delete Application
      </button>
    </div>
  </div>
);
};


export const EmployerCard = ({ element, openModal }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200 relative bg-[url('/path/to/your/image.jpg')] bg-cover bg-center">
      <div className="flex items-center mb-4">
        <div className="flex-grow">
          <h2 className="text-xl font-semibold text-dark-blue">{element.name}</h2>
          <p className="text-blue"><span className="font-medium">Email:</span> {element.email}</p>
          <p className="text-blue"><span className="font-medium">Phone:</span> {element.phone}</p>
          <p className="text-blue"><span className="font-medium">Address:</span> {element.address}</p>
          <p className="text-blue"><span className="font-medium">Cover Letter:</span> {element.coverLetter}</p>
        </div>
        <div className="ml-4">
          <img
            src={element.resume.url}
            alt="resume"
            className="w-16 h-16 object-cover cursor-pointer rounded-lg border-2 border-blue-500 hover:opacity-75 transition-opacity duration-300"
            onClick={() => openModal(element.resume.url)}
          />
        </div>
      </div>
      <div className="flex justify-end items-center mt-2">
        <button
          onClick={() => openModal(element.resume.url)}
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300"
        >
          <AiOutlineEye className="w-5 h-5 mr-1" />
          View Resume
        </button>
      </div>
    </div>
  );
};