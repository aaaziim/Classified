import React from 'react';
import { FcElectronics } from 'react-icons/fc';
import { Link } from 'react-router-dom';

const LocationCard = ({ location }) => {
  const {_id, name, slug } = location;
  const states = ["New York", "California", "Florida", "Texas", "Georgia", "Pennsylvania"];

  return (
 
<div className="bg-[#FFE5D5] shadow-lg rounded-2xl p-5 w-full my-10">

  <div className="space-y-4">

    <div className="bg-white rounded-lg p-4 shadow-md ">
      <div className=' bg-gray-100 p-4 rounded-2xl overflow-hidden'>
      <div className='flex justify-between items-center'>
      <Link to={`/location/${_id}`}>
      <button className="w-full text-center font-bold text-[#014D48] text-2xl cursor-pointer" title={name}>

      {name}
      </button>
      </Link>
      <Link to="/all-locations">
                <button className="px-6 py-3 bg-[#014D48] text-white rounded-lg shadow-md hover:bg-[#FA8649] transition w-60">
                  All Locations
                </button>
        </Link>

      </div>
      </div>
  
      <ul className=" grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mt-3 space-y-2 pl-5 text-center">
      {
  location?.state?.map((sub, index) => (
    states.includes(sub.name) &&
      <li key={sub.id} className="block text-[#FA8649] text-lg hover:text-[#001C27] transition duration-300">
        <Link to={`/category/${sub.id}`}>
          {sub.name}
        </Link>
      </li>
  
  ))
}
{/* 
<li className="block text-[#FA8649] text-sm hover:text-[#001C27] transition duration-300 absolute bottom-0">
<Link to={`/category/${_id}`}>
      <button className=" btn text-left font-medium text-[#014D48] text-lg focus:outline-none">
      View More
      </button>
      </Link>
</li> */}
      
      </ul>
    </div>

 
  
  </div>
</div>

 
  );
};

export default LocationCard;
