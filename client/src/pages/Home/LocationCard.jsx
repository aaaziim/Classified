import React from 'react'
import { FaLocationCrosshairs } from "react-icons/fa6";
const LocationCard = () => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg flex flex-col items-center text-center">
         <span className="text-4xl mb-3"><FaLocationCrosshairs /></span>
         <h3 className="text-lg font-semibold">New York</h3>
    </div>
  )
}

export default LocationCard
