import React from 'react'
import { Helmet } from 'react-helmet-async'
import Breadcrumb from '../Components/Breadcrumb'
import AdCard from '../Components/AdCard'
import { useParams } from 'react-router'

const SingleCategoryPage = () => {
  const { slug } = useParams();
  return (
    <div>
       <Helmet>
                          <title>Category Name</title>
          </Helmet>
          <div className='space-y-4 mb-4'>
      <Breadcrumb
        title={`${slug}`} 
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

export default SingleCategoryPage
