import React from 'react'

const CategorySidebar = () => {
  return (
    <div>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h3 className="text-lg font-semibold border-b pb-2 mt-6 text-[#014D48]">Categories</h3>
        <ul className="mt-3 space-y-2">
          <li>
            <a href="#" className="flex items-center text-[#001C27] hover:text-[#FA8649]">
              <i className="fa fa-tag mr-2"></i> Electronics
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center text-[#001C27] hover:text-[#FA8649]">
              <i className="fa fa-car mr-2"></i> Vehicles
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center text-[#001C27] hover:text-[#FA8649]">
              <i className="fa fa-home mr-2"></i> Real Estate
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center text-[#001C27] hover:text-[#FA8649]">
              <i className="fa fa-couch mr-2"></i> Furniture
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center text-[#001C27] hover:text-[#FA8649]">
              <i className="fa fa-bicycle mr-2"></i> Sports & Outdoors
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default CategorySidebar
