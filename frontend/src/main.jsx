import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Router/Router.jsx'
// import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// import 'tailwindcss/tailwind.css';

export const Context=createContext({isAuthroized:false});
const AppWrapper=()=>{
  const[isAuthroized ,setIsAuthroized]=useState(false);
  const[user,setUser]=useState({});
  return(
    <Context.Provider value={{isAuthroized,setIsAuthroized,user,setUser}}>
       <RouterProvider router={router}/>
    </Context.Provider>
  )

}



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <AppWrapper/>
  </React.StrictMode>
) 
