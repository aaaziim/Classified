import React from 'react'
import { Link } from 'react-router';

const ReportedServiceCard = ({service,handleDelete,handleServiceApprove}) => {
    const {title, description, _id, images} = service;
  return (
    <div className="flex flex-col md:flex-row mb-4 items-center justify-between p-4 bg-[#FFE5D5] rounded-lg shadow-md hover:shadow-lg transition space-y-2">
    <div className="flex items-center space-x-4">
    {
      images &&   <img className='w-20 rounded' src={images[0]} />
    }
      <div>
        <h3 className="text-lg font-semibold text-[#014D48]">{title}</h3>
        <p className="text-[#001C27]">
        {description?.slice(0,20)}...
          </p>
      </div>
    </div>
    <div className="flex gap-4 flex-row flex-wrap ">
    <button onClick={()=>handleServiceApprove(_id)}  className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-[#000] transition">
        Approve
      </button>
    <Link to={`/ad-details/${_id}`} >
     <button className="px-4 py-2 bg-[#014D48] text-white rounded-lg shadow hover:bg-[#000] transition">
        View
      </button>
     </Link>
     <Link to={`/service-update/${_id}`} >
          <button className="px-4 py-2 bg-[#FA8649] text-white rounded-lg shadow hover:bg-[#E06D36] transition">
            Edit
          </button>
          </Link>
      <button onClick={()=>handleDelete(_id)}  className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition">
        Delete
      </button>
    </div>
  </div>
  )
}

export default ReportedServiceCard
