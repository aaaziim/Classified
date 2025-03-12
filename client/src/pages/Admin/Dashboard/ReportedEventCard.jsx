import React from 'react'
import { Link } from 'react-router';

const ReportedEventCard = ({event, handleDelete, handleEventApprove}) => {
    const {title, description, _id} = event;
 

  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-4 bg-[#FFE5D5] rounded-lg shadow-md hover:shadow-lg transition mb-4 space-y-2">
    <div className="flex items-center space-x-4">
      <img src="https://static.vecteezy.com/system/resources/thumbnails/005/048/106/small_2x/black-and-yellow-grunge-modern-thumbnail-background-free-vector.jpg" alt="Service Thumbnail" className="w-16 h-16 object-cover rounded-lg border border-[#014D48]" />
      <div>
        <h3 className="text-lg font-semibold text-[#014D48]">{title}</h3>
        <p className="text-[#001C27]">{description}...</p>
      </div>
    </div>
    <div className="flex gap-4 flex-row flex-wrap ">
    <button onClick={()=>handleEventApprove(_id)}  className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-[#000] transition">
        Approve
      </button>
     <Link to={`/event-details/${_id}`} >
     <button className="px-4 py-2 bg-[#014D48] text-white rounded-lg shadow hover:bg-[#000] transition">
        View
      </button>
     </Link>
      {/* <Link to={`/event-update/${_id}`} >
      <button className="px-4 py-2 bg-[#FA8649] text-white rounded-lg shadow hover:bg-[#E06D36] transition">
        Edit
      </button>
      </Link> */}
      <button onClick={()=>handleDelete(_id)} className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition">
        Delete
      </button>
    </div>
  </div>
  )
}

export default ReportedEventCard
