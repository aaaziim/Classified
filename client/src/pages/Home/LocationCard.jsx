import React from 'react'
import { FaLocationCrosshairs } from "react-icons/fa6";
import { Link } from 'react-router';
const LocationCard = ({location}) => {
  const {id, name, slug} = location;
  return (
    <Link to={`/location/${slug}`}>
    <div className="p-6 bg-white shadow-lg rounded-lg flex flex-col items-center text-center">
         <span className="text-4xl mb-3"><FaLocationCrosshairs /></span>
         <h3 className="text-lg font-semibold">{name}</h3>
    </div>
    </Link>
  )
}

export default LocationCard
