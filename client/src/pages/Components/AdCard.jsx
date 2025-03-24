import React from 'react';
import { Link } from 'react-router-dom';
import placeholder from "../../assets/images/placeholder.webp"
const AdCard = ({service}) => {
  
  const {title, description, _id, images} = service;
  return (
 <>
    <Link to={`/ad-details/${_id}`} className="block">
    <div className="card bg-[#FFE5D5] shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105">
      <figure>
            {
             images ?  <img className="w-full h-48 object-cover" src={images[0]} />:   <img
             src={placeholder}
             alt="Event Image"
             className="w-full h-48 object-cover"
           />
           }
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-[#014D48] text-lg font-bold">{title?.slice(0,20)}...</h2>
        <p className="text-[#001C27] text-sm">
        {description?.slice(0,20)} ...
        </p>
        {/* <div className="card-actions ">
          <button className="btn rounded-xl bg-[#FA8649] text-white hover:bg-[#014D48]">
            View Service
          </button>
        </div> */}
      </div>
    </div>
  </Link>
 </>
  );
};

export default AdCard;
