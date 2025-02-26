import React from 'react'
import { Helmet } from 'react-helmet-async'
import Breadcrumb from '../Components/Breadcrumb'
import AdCard from '../Components/AdCard'
import { useParams } from 'react-router'

const SingleCategoryPage = () => {
  const { slug } = useParams();

  return (
    <div className="px-4 py-6">
      <Helmet>
        <title>{slug} | Category</title>
      </Helmet>

      <div className="space-y-4 mb-6">
        <Breadcrumb 
          title={slug}
          subTitle="Here you can update your service information"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AdCard />
        <AdCard />
        <AdCard />
      </div>
    </div>
  )
}

export default SingleCategoryPage
