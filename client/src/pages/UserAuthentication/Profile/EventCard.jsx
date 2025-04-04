import React from 'react'
import { Link } from 'react-router';
 
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const EventCard = ({event, handleDelete}) => {
    const {title, description, _id, images} = event;
 



  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-4 bg-[#FFE5D5] rounded-lg shadow-md hover:shadow-lg transition mb-4 space-y-2">
    <div className="flex items-center space-x-4">
    {
      images &&   <img className="w-16 h-16 object-cover rounded-lg border border-[#014D48]" src={images[0]} />
    }
     
      <div>
        <h3 className="text-lg font-semibold text-[#014D48]">{title?.slice(0,20)}...</h3>
        <p className="text-[#001C27]">
        {description?.slice(0,20)} ...
        </p>
      </div>
    </div>
    <div className="flex gap-4 flex-row flex-wrap ">
     <Link to={`/event-details/${_id}`} >
     <button className="px-4 py-2 bg-[#014D48] text-white rounded-lg shadow hover:bg-[#000] transition">
        View
      </button>
     </Link>
      <Link to={`/event-update/${_id}`} >
      <button className="px-4 py-2 bg-[#FA8649] text-white rounded-lg shadow hover:bg-[#E06D36] transition">
        Edit
      </button>
      </Link>
      <button onClick={()=>handleDelete(_id)} className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition">
        Delete
      </button>
    </div>
  </div>
  )
}

export default EventCard
