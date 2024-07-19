import React, { useContext } from 'react'
import { Context } from '../main'
import { Navigate } from 'react-router-dom';
import NavBar from '../components/NavBar';


export const HeroPage = () => {
    const {isAuthrozied}=useContext(Context);
    if(!isAuthrozied){
    return <Navigate to={'/login'}/>
    }
  return (
    <section>
        <NavBar/>

        <h1>your hero section here</h1>
        <h2>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores consequuntur voluptatem, nostrum aliquam iste voluptatibus itaque odit soluta unde dolor,
             laboriosam, quaerat commodi esse ab reprehenderit ullam cumque nobis deserunt.</h2>
    </section>  )
}
