import React from 'react';
import { FcElectronics } from 'react-icons/fc';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  const {_id, name, slug } = category;
  return (
 
<div className="bg-[#FFE5D5] shadow-lg rounded-2xl p-5 w-full max-w-md">

  <div className="space-y-4">

    <div className="bg-white rounded-lg p-4 shadow-md ">
      <div className=' bg-gray-100 p-4 rounded-2xl overflow-hidden h-20'>
      <Link to={`/category/${_id}`}>
      <button className="w-full text-center font-medium text-[#014D48] text-xl focus:outline-none cursor-pointer" title={name}>

      {name}
      </button>
      </Link>
      </div>
  
      <ul className="mt-3 space-y-2 pl-5 pt-4 h-92 relative">
      {
  category.subcategories?.map((sub, index) => (
    index < 6 && (
      <li key={sub.id} className="block text-[#FA8649] text-lg hover:text-[#001C27] transition duration-300">
        <Link to={`/category/${_id}/subcategory/${sub.id}`}>
          {sub.name}
        </Link>
      </li>
    )
  ))
}

<li className="block text-[#FA8649] text-sm hover:text-[#001C27] transition duration-300 absolute bottom-0">
<Link to={`/category/${_id}`}>
      <button className=" btn text-left font-medium text-[#014D48] text-lg focus:outline-none">
      View More
      </button>
      </Link>
</li>
      
      </ul>
    </div>

 
  
  </div>
</div>

 
  );
};

export default CategoryCard;
