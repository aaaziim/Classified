import React from 'react';
import { FcElectronics } from 'react-icons/fc';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  const {_id, name, slug } = category;
  return (
    <Link to={`/category/${_id}`}>
      <div className="h-52 p-6 bg-white shadow-lg rounded-lg flex flex-col items-center text-center transition-all transform hover:scale-105 hover:shadow-2xl hover:border-[#FA8649] hover:text-[#FA8649]">
        <span className="text-4xl mb-3">
          <FcElectronics />
        </span>
        <h3 className="text-lg font-semibold text-[#014D48]">{name}</h3>
      </div>
    </Link>
  );
};

export default CategoryCard;
