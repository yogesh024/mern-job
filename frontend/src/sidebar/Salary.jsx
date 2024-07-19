import React from 'react'
import { Button } from '../components/Button'
import { InputField } from '../components/InputField'

export const Salary = ({handleChange,handleClick}) => {
  return (
    <div>
        <h4 className='text-lg font-medium mb-2'>Salary</h4>
        <div className='mb-4 '>
            <Button onclickHandler={handleClick} value="" title=" Hourly"/>
            <Button onclickHandler={handleClick} value="monthly" title=" Monthly"/>
            <Button onclickHandler={handleClick} value="yearly" title=" Yearly"/>
        </div>
        <div>
        <label className='sidebar-label-container'>
          <input 
            type="radio" 
            name="location" 
            value="" 
            onChange={handleChange} 
          />
          <span className='checkmark'></span>ALL
        </label>
        <InputField handleChange={handleChange} value={30} title="<30K" name="location" />
        <InputField handleChange={handleChange} value={50} title="<50K" name="location" />
        <InputField handleChange={handleChange} value={80} title="<80K" name="location" />
        <InputField handleChange={handleChange} value={100} title="<100" name="location" />
      </div>
    </div>
  )
}
