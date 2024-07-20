import { useContext, useEffect, useState } from 'react'
import './App.css'
import { Navigate, Outlet } from 'react-router-dom'
import NavBar from './components/NavBar'
import { AuthProvider } from './components/context/AuthContext'
import {Toaster} from 'react-hot-toast'
import { Context } from './main'
import axios from 'axios'

// import 'mdb-react-ui-kit/dist/css/mdb.min.css';



function App() {
  const {isAuthroized,setIsAuthroized,setUser}=useContext(Context);
  useEffect(()=>{
    const fetchUser=async()=>{
      try {
        const res=await axios.get("http://localhost:3002/api/auth/getUser",{withCredentials:true});
        setUser(res.data.user);
        setIsAuthroized(true);
       } catch (error) {
        setIsAuthroized(false);
        
       }
    }
    fetchUser();
  },[isAuthroized])

  return (
    <>
    {/* <AuthProvider> */}
    <NavBar/>
    <Toaster position='top-right' toastOptions={{duration:2000}}/>
    <Outlet/>
    {/* </AuthProvider> */}
    </>
  )
}

export default App
