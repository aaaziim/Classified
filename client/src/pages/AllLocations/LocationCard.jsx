import React from 'react';
import { FcElectronics } from 'react-icons/fc';
import { Link } from 'react-router-dom';

const LocationCard = ({ location }) => {
  const {_id, name, slug } = location;
  return (
 
<div className="bg-[#FFE5D5] shadow-lg rounded-2xl p-5 w-full my-10">

  <div className="space-y-4">

    <div className="bg-white rounded-lg p-4 shadow-md ">
      <div className=' bg-gray-100 p-4 rounded-2xl overflow-hidden'>
        <Link to={`/location/${_id}`}>
      <button className="w-full text-center font-medium text-[#014D48] text-lg cursor-pointer" title={name}>

      {name}
      </button>
      </Link>
      </div>
  
      <ul className=" grid  grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-3 space-y-2 pl-5 text-center">
      {
  location?.state?.map((sub, index) => (
   
      <li key={sub._id} className="block text-[#FA8649] text-sm hover:text-[#001C27] transition duration-300">
        <Link  to={`/state/${sub.name}`}>
          {sub.name}
        </Link>
      </li>
  
  ))
}

      
      </ul>
    </div>

 
  
  </div>
</div>

 
  );
};

export default LocationCard;
