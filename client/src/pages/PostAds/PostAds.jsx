import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router'

const PostAds = () => {
  return (
<div className="min-h-[calc(100vh-400px)] flex flex-col justify-center items-center">
    <Helmet>
                            <title>Post Ad</title>
            </Helmet>

  <div className="flex flex-col items-center gap-4">
   <Link to="/post-services">
   <button className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition w-60">
     Post Service
    </button>
   
   </Link>
  <Link to="/post-events">
  <button className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition w-60">
     Post Event
    </button>
  </Link>
  </div>
</div>

  )
}

export default PostAds
