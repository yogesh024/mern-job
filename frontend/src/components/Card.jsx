import React from 'react'
import {Link} from 'react-router-dom'
import {FiCalendar, FiClock, FiDollarSign, FiMapPin} from "react-icons/fi"
export const Card = ({data}) => {
    // console.log(data);
    const {_id,companyName,jobTitle, companyLogo,minPrice,maxPrice,salaryType,jobLocation,employmentType,postingDate,description}=data
  return (
    
    <section className='card'>
        <Link to={`/job/${_id}`} className='flex,gap-4 flex-col sm:flex-row items-start'>
            <img src={companyLogo}alt="" />
            <div className=''>
                <h4 className='text-blue font-bold mb-  '>{companyName}</h4>
                <h3>{jobTitle}</h3>
            </div>
            <div className='text-black text-base flex flex-wrap gap-2 mb-2'>
                <span><FiMapPin/>{jobLocation}</span>
                <span><FiClock/>{employmentType}</span>
                <span><FiDollarSign/>{minPrice}-{maxPrice}k</span>
                <span><FiCalendar/>{postingDate}</span>
            </div>
            <p className='text-base text-black/70'>{description}</p>
        </Link>

    </section>
  )
}
