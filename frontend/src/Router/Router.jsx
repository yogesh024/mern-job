import { createBrowserRouter } from "react-router-dom";
import { Home } from "../Pages/Home";
import { About } from "../Pages/About";
import { CreateJob } from "../Pages/CreateJob";
import { MyJob } from "../Pages/MyJob";
import { SalaryPage } from "../Pages/SalaryPage";
import { Login } from "../components/Login";
import { SignUp } from "../components/SignUp";
import { JobDetails } from "../Pages/JobDetails";
import App from "../App";
import Profile from "../Pages/Profile";
import { Apply } from "../Pages/Apply";
import { NotFound } from "../Pages/NotFound";
import { MyApplication } from "../components/MyApplication";


const router= createBrowserRouter(
    [
    {path:'/',
    element:<App/>,
    children:[
        {path:"/",element:<Home/>},
        {path:"/about",element:<About/>},
        {path:"/postJobs",element:<CreateJob/>},
        {path:"/My-Job",element:<MyJob/>},
        {path:"/Salary",element:<SalaryPage/>},
        {path:"/Login",element:<Login/>},
        {path:"/signUp",element:<SignUp/>},
        {path:"/profile",element:<Profile/>},
        {path:"/My-apply",element:<MyApplication/>},
         {path:"/apply/:id",element:<Apply/>},
        {path:"/*",element:<NotFound/>},
        
        {
            path:"edit-job/:id",
            element:"",
            loader:({params})=>fetch(`http://localhost:3002/all-jobs/${params.id}`)
        },
        {
            path:"/job/:id",
            element:<JobDetails/>,
            

        },

   
        
        
        
    ]
}
    
])
export default router;

