import React from 'react'
import { Helmet } from 'react-helmet-async'
import Breadcrumb from '../Components/Breadcrumb'
import AdCard from '../Components/AdCard'
import { useParams } from 'react-router'

const SingleLocationPage = () => {
  const { slug } = useParams();

  return (
    <div className="px-4 py-6">
      <Helmet>
        <title>{slug} | Location</title>
      </Helmet>

      <div className="space-y-4 mb-6">
        <Breadcrumb 
          title={slug}
          subTitle="Here you can update your service information"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <AdCard />
        <AdCard />
      </div>
    </div>
  )
}

export default SingleLocationPage
