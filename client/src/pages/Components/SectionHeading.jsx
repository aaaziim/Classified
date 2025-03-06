import React from 'react'

const SectionHeading = ({heading, subHeading}) => {
  return (
    <div className='text-center space-y-2 lg:w-4/12 mx-auto my-4'>
    <p className='text-[#FA8649]'>--- {subHeading} ---</p>
    <h2 className='text-2xl font-bold uppercase border-y-2 py-2 text-[#014D48] border-[#FFE5D5]'>{heading}</h2>
  </div>
  )
}

export default SectionHeading
