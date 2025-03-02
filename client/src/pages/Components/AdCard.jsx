import React from 'react';
import { Link } from 'react-router-dom';
import placeholder from "../../assets/images/placeholder.webp"
const AdCard = ({service}) => {
  console.log(service.title)
  const {title, description, _id} = service;
  return (
 <>
    <Link to={`/ad-details/${_id}`} className="block">
    <div className="card bg-[#FFE5D5] shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105">
      <figure>
        <img
          src={placeholder}
          alt="Ad Image"
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-[#014D48] text-lg font-bold">{title}</h2>
        <p className="text-[#001C27] text-sm">
        {description} 
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
