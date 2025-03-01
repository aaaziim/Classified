import React from 'react';
import { FaLocationCrosshairs } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const LocationCard = ({ location }) => {
  const { _id, name, slug } = location;
  return (
    <Link to={`/location/${_id}`}>
      <div className="p-6 bg-white shadow-lg rounded-lg flex flex-col items-center text-center transition-all transform hover:scale-105 hover:shadow-2xl hover:border-[#FA8649] hover:text-[#FA8649]">
        <span className="text-4xl mb-3 text-[#014D48]">
          <FaLocationCrosshairs />
        </span>
        <h3 className="text-lg font-semibold text-[#014D48]">{name}</h3>
      </div>
    </Link>
  );
};

export default LocationCard;
