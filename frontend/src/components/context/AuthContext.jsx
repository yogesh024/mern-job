import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {useParams}from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token,setToken]=useState(null);
  const storedData=JSON.parse(localStorage.getItem('user_data'));
  console.log(storedData)
  useEffect(()=>{
    if(storedData){
      const {userToken,user}=storedData;
      setToken(userToken);
      setUser(user);
      setIsLoggedIn(true);
    }

  },[])



  const login = (newToken ,newData) => {
    localStorage.setItem("user_data", JSON.stringify({userToken:newToken,user:newData}),
  );
  setToken(newToken);
  setUser(newData);
  setIsLoggedIn(true);
  };
  console.log(token);

  const logout = async () => {
    localStorage.removeItem("user_data");
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);

  };

  return (
    <AuthContext.Provider value={{ user,setUser,login,logout, isLoggedIn,setIsLoggedIn ,token}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};











