import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';



const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const {isLoggedIn,token}=useAuth();
  const [job, setJob] = useState(null); 
//   const id=userParams()
  useEffect(()=>{
    if(isLoggedIn){
        fetch(`http://localhost:3000/api/job/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            
            },
        })
    }
    
  },[])
  return (
    <JobContext.Provider value={{ job}}>
      {children}
    </JobContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(JobContext);
};











