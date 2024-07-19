import React, { useContext, useState } from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import useSignup from './hook/useSignup';
import { Context } from '../main';

export const SignUp = () => {
  const {loading,error,signup}=useSignup();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    userName: '',
    password: '',
    isRecruiter: false
  });
  const {isAuthroized,setIsAuthroized,user,setUser}=useContext(Context);
    const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
    signup(e) ;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, firstName, lastName, userName, password } = formData;
    if (!email || !firstName || !lastName || !userName || !password) {
      toast.error('Please fill in all fields.');
    } else {
      axios.post("http://localhost:3002/api/auth/register", formData)
      .then((response) => {
        toast.success("You are successfully registered! please login");
        setIsAuthroized(true);
        // setUser(response.data.user)
         navigate('/login')  // Redirect to the login page upon successful registration
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message || "An error occurred. Please try again.");

      });

    }
  };
  // if(isAuthroized){
  //   navigate('/');

  // }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        {/* Left side */}
        <div className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold">Welcome back</span>
          <span className="font-light text-gray-400 mb-8">
            Welcome back! Please Sign Up
          </span>
          <form onSubmit={handleSubmit}>
            <div className="py-4">
              <span className="mb-2 text-md">Email</span>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="py-4">
              <span className="mb-2 text-md">First Name</span>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="py-4">
              <span className="mb-2 text-md">Last Name</span>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="py-4">
              <span className="mb-2 text-md">Username</span>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
              />
            </div>
            <div className="py-4">
              <span className="mb-2 text-md">Password</span>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-between w-full py-4">
              <div className="mr-24">
                <input
                  type="checkbox"
                  name="isRecruiter"
                  id="isRecruiter"
                  className="mr-2"
                  checked={formData.isRecruiter}
                  onChange={handleChange}
                />
                <span className="text-md">I am a Recruiter</span>
              </div>
              <span className="font-bold text-md">Forgot password</span>
            </div>
            <button type="submit" className="w-full bg-black text-wht p-2 rounded-lg mb-6 hover:bg-white hover:text-blue hover:border hover:border-blue">
              Sign in
            </button>
          </form>
          <button className="w-full border border-gray text-md p-2 rounded-lg mb-6 hover:border hover:border-blue hover:bg-black hover:text-white">
            <img
               src="https://imgs.search.brave.com/K2bzYTWwzs1jK-LIjzjfDSF_tBhgNnw1Xql1Q8VZL5Q/rs:fit:500:0:0/g:ce/aHR0cHM6Ly8xMDAw/bG9nb3MubmV0L3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE2LzEx/L05ldy1Hb29nbGUt/TG9nby00OTd4NTAw/LmpwZw"
              alt="img"
              className="w-6 h-6 inline mr-2"
            />
            Sign up with Google
          </button>
          <div className="text-center text-gray-400">
            Already have an account?{' '}
            <NavLink to="/login" className="font-bold text-black hover:text-blue cursor-pointer">
              Sign in here
            </NavLink>
          </div>
        </div>
        {/* Right side */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1717588604502-6311afdb4e8d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="img"
            className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
          />
          {/* Text on image */}
          <div className="absolute hidden bottom-10 right-6 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
            <span className="text-white text-xl">
              We've been using Untitle to kick
              <br />
              start every new project and can't
              <br />
              imagine working without it.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
