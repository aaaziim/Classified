import React from 'react'
import { Helmet } from 'react-helmet-async'
import Breadcrumb from '../Components/Breadcrumb'
import AdCard from '../Components/AdCard'

const SingleLocationPage = () => {
  return (
    <div>
        <Helmet>
                          <title>Location Name</title>
          </Helmet>
          <div className='space-y-4 mb-4'>
      <Breadcrumb
       title={"Location Name"}
       subTitle={"Here you can update your service information"}>
       </Breadcrumb>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <AdCard></AdCard>
           <AdCard></AdCard>
           </div>
    </div>
  )
}

export default SingleLocationPage
