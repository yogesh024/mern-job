import React from 'react'

export const Jobs = ({result}) => {
  return (
  <>
    <div> 
      <h3 className='text-lg font-bold mb-2 text-black'>{result.length} Jobs</h3>
    </div>
    <section> {result}</section>
   
  </>
  )
}
