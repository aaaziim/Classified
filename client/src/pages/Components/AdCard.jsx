import React from 'react';
import { Link } from 'react-router-dom';

const AdCard = () => {
  return (
    <Link to="/ad-details" className="block">
      <div className="card bg-[#FFE5D5] shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Ad Image"
            className="w-full h-48 object-cover"
          />
        </figure>
        <div className="card-body p-4">
          <h2 className="card-title text-[#014D48] text-lg font-bold">Card Title</h2>
          <p className="text-[#001C27] text-sm">
            A card component has a figure, a body part, and inside body there are title and actions parts.
          </p>
          {/* <div className="card-actions ">
            <button className="btn rounded-xl bg-[#FA8649] text-white hover:bg-[#014D48]">
              View Service
            </button>
          </div> */}
        </div>
      </div>
    </Link>
  );
};

export default AdCard;
