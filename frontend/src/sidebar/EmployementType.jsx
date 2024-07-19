import React from 'react'
import { InputField } from '../components/InputField'

export const EmployementType = ({handleChange}) => {
  return (
    <div>
    <h4 className='text-lg font-medium mb-2'>Employment Type</h4>
    <div>
      <label className='sidebar-label-container'>
        <input 
          type="radio" 
          name="location" 
          id='test'
          value="" 
          onChange={handleChange} 
        />
        <span className='checkmark'></span>
        Any Experience
      </label>
      <InputField handleChange={handleChange} value="Full-time" title="Full Time" name="test" />
      <InputField handleChange={handleChange} value="Part-time" title="Part Time" name="test" />
      <InputField handleChange={handleChange} value="Temporary" title="Temporary" name="test" />
  
    </div>
  </div>
  )
}
