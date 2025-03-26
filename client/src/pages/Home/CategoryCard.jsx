import React, { useState } from "react";
import { FcElectronics } from "react-icons/fc";
import { Link } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Import arrow icons

const CategoryCard = ({ category }) => {
  const { _id, name, slug } = category;
  const [isOpen, setIsOpen] = useState(false); // State to track collapse open/close

  const toggleCollapse = () => {
    setIsOpen(!isOpen); // Toggle collapse
  };

  return (
    <div className="bg-[#FFE5D5] shadow-lg rounded-2xl p-5 w-full max-w-md">
      <div className="space-y-4">
        <div className="bg-white rounded-lg p-4 shadow-md ">
          <div className="bg-gray-100 p-4 rounded-2xl overflow-hidden h-20 flex justify-center items-center mb-4">
            <Link to={`/category/${_id}`}>
              <button
                className="w-full text-center font-medium text-[#014D48] text-xl focus:outline-none cursor-pointer"
                title={name}
              >
                {name}
              </button>
            </Link>
          </div>

          {/* Collapsible Section */}
          <div className="collapse bg-base-100 border-base-300 border">
            <input
              type="checkbox"
              checked={isOpen} // Control checkbox state based on isOpen
              onChange={toggleCollapse} // Toggle collapse when checkbox changes
            />
            <div className="collapse-title font-semibold flex items-center justify-between">
              <span>View More</span>
              {/* Display the appropriate arrow icon based on isOpen */}
              {isOpen ? (
                <FaChevronUp className="text-[#014D48]" />
              ) : (
                <FaChevronDown className="text-[#014D48]" />
              )}
            </div>
            <div className="collapse-content text-sm">
              <ul className="mt-3 space-y-2 pl-5 pt-4   relative">
                {category.subcategories?.map(
                  (sub, index) =>
                     (
                      <li
                        key={sub.id}
                        className="block text-[#FA8649] text-lg hover:text-[#001C27] transition duration-300"
                      >
                        <Link to={`/category/${_id}/subcategory/${sub.id}`}>
                          {sub.name}
                        </Link>
                      </li>
                    )
                )}

                {/* <li className="block text-[#FA8649] text-sm hover:text-[#001C27] transition duration-300 absolute bottom-0">
                  <Link to={`/category/${_id}`}>
                    <button className="px-6 py-3 bg-[#014D48] text-white rounded-lg shadow-md hover:bg-[#FA8649] transition md:w-40">
                      View More
                    </button>
                  </Link>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
