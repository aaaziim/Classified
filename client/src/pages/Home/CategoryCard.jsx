import React from 'react'
import { FcElectronics } from "react-icons/fc";
import { Link } from 'react-router';
const CategoryCard = () => {
  return (
    <Link to={`/category/electronics`}>
    <div className="p-6 bg-white shadow-lg rounded-lg flex flex-col items-center text-center">
      <span className="text-4xl mb-3"><FcElectronics /></span>
      <h3 className="text-lg font-semibold">Electronics</h3>
    </div>
    </Link>
  )
}

export default CategoryCard
