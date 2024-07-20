import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { DiBitbucket } from 'react-icons/di';
import { FaAlignJustify, FaUserCircle } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";
import { useAuth } from './context/AuthContext';
import { Context } from '../main';
import toast from 'react-hot-toast';
import axios from 'axios';


const NavBar = () => {
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  // const { isLoggedIn ,setIsLoggedIn} = useAuth();

  const navigate = useNavigate();
  const {isAuthroized,setIsAuthroized,user}=useContext(Context);
  const handleMenuToggler = () => {

    setIsMenuOpen(!isMenuOpen);
  };

  const handleProfileToggler = () => {
    setIsProfileOpen(!isProfileOpen);
  };
  const handleLogout=async()=>{
    const res=await axios.get("http://localhost:3002/api/auth/logout",{withCredentials:true});
    toast.success(res.data.message);
    setIsAuthroized(false);
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <header className="bg-blue-600 p-4 max-w-screen-2xl container mx-auto xl:px-24">
      <nav className="container mx-auto flex justify-between items-center">
        <NavLink to="/" className="text-white text-2xl font-bold flex items-center">
          <DiBitbucket className="mr-2" />
          JobPortal
        </NavLink>
        <div className="hidden md:flex space-x-4">
          <NavLink to="/" exact activeClassName="text-blue-400" className="text-white">
            Start Search
          </NavLink>
         { isAuthroized &&user&&user.isRecruiter? <NavLink to="/My-Job" activeClassName="text-blue-400" className="text-white">
            My Job
          </NavLink>
          : null }
          <NavLink to="/Salary" activeClassName="text-blue-400" className="text-white">
            Salary
          </NavLink>
          {isAuthroized &&user&&user.isRecruiter?<NavLink to="/postJobs" activeClassName="text-blue-400" className="text-white">
            Post Jobs
          </NavLink>
          :null}
          <NavLink to="/My-apply" activeClassName="text-blue-400" className="text-white">
           MyApply
          </NavLink>
          {/* <NavLink to="http://localhost:3000/" activeClassName="text-blue-400" className="text-white">
            Freelance
          </NavLink> */}
          {isAuthroized ? (
            <div className="relative">
              <button onClick={handleProfileToggler} className="text-white text-2xl">
                <FaUserCircle />
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-wht rounded-md shadow-lg py-1 z-20">
                  <NavLink to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                    View Profile
                  </NavLink>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsProfileOpen(false);
                       navigate("/login");
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className='text-base text-primary font-medium space-x-5 hidden lg:block'>
              <NavLink to="/login" activeClassName="text-blue-400" className="py-2 px-5 border rounded bg-blue text-white">
                Login
              </NavLink>
            </div>
          )}
        </div>
        <button
          className="md:hidden text-white"
          onClick={handleMenuToggler}
        >
          {isMenuOpen ? <AiOutlineClose /> : <FaAlignJustify />}
        </button>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden flex flex-col space-y-2 p-4 bg-black">
          <NavLink to="/" exact activeClassName="text-blue-400" className="text-white flex items-center gap-2 text-2xl" onClick={handleMenuToggler}>
            Start Search
          </NavLink>
          { isAuthroized &&user&&user.isRecruiter? <NavLink to="/My-Job" activeClassName="text-blue-400" className="text-white">
            My Job
          </NavLink>
          : null }
          <NavLink to="/Salary" activeClassName="text-blue-400" className="flex items-center gap-2 text-2xl text-wht" onClick={handleMenuToggler}>
            Salary
          </NavLink>
          {isAuthroized &&user&&user.isRecruiter?<NavLink to="/postJobs" activeClassName="text-blue-400" className="text-wht">
            Post Jobs
          </NavLink>
          :null}
          <NavLink to="/My-apply" activeClassName="text-blue-400" className="text-wht">
           MyApply
          </NavLink>
          {/* <NavLink to="https://www.google.com/" activeClassName="text-blue-400" className="flex items-center gap-2 text-2xl text-white" onClick={handleMenuToggler}>
            Freelance
          </NavLink> */}
          {
            isAuthroized
          // user||isLoggedIn 
          ? (
            <div className="flex items-center gap-2 text-2xl text-white">
              <button onClick={handleProfileToggler} className="text-white text-2xl">
                <FaUserCircle />
              </button>
              {isProfileOpen && (
                <div className="flex flex-col p-4 bg-wht text-gray rounded-md shadow-lg">
                  <NavLink to="/profile" className="py-2" onClick={handleMenuToggler}>
                    View Profile
                  </NavLink>
                  <button
                    onClick={() => {
                      handleLogout();
                      handleMenuToggler();
                    }}
                    className="py-2"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className='text-base text-primary font-medium space-x-5 lg:block'>
              <NavLink to="/login" activeClassName="text-blue-400" className="py-2 px-5 bg-blue border text-white rounded">
                Login
              </NavLink>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default NavBar;
