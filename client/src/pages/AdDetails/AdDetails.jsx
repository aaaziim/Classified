import React from 'react'
import { MdOutlineDateRange } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { FaLocationArrow } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import { MdCategory } from "react-icons/md";
import SellerInfo from './SellerInfo';
import CategorySidebar from './CategorySidebar';
import { Helmet } from 'react-helmet-async';

const AdDetails = () => {
  return (
  <>
   <Helmet>
      <title>Ad Details</title>
   </Helmet>
   <div className='flex flex-col justify-center md:flex-row gap-4 my-10'>
     <div className='w-full md:w-2/3 bg-[#FFE5D5] p-4 space-y-4 rounded-2xl'>
       <img className='w-full h-96' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2z-Qg3pe-RY9Lv8kQ4Ik3uFlebhYk4I9R0Q&s" alt="" />
       <div className='flex justify-between gap-4'> 
         <p className='flex items-center gap-2 text-[#014D48]'>
           <MdOutlineDateRange />
           <span>12,12,2025</span>
         </p>
         <p 
           className="bg-[#FA8649] max-w-fit px-4 py-2 text-white font-bold relative"
           style={{ clipPath: "polygon(0 0, 100% 0, 90% 50%, 100% 100%, 0 100%)" }}
         >
           Price: $220
         </p>
       </div>
       <div className='grid grid-cols-2 gap-4'> 
         <p className='flex items-center gap-2 text-[#001C27]'>
           <FaLocationArrow />
           <span>State: Dhaka</span>
         </p>
         <p className='flex items-center gap-2 text-[#001C27]'>
           <IoLocationOutline />
           <span>City: Barishal</span>
         </p>
         <p className='flex items-center gap-2 text-[#001C27]'>
           <BiCategoryAlt />
           <span>Category: Service</span>
         </p>
         <p className='flex items-center gap-2 text-[#001C27]'>
           <MdCategory />
           <span>SubCategory: Wellbeing</span>
         </p>
       </div>
       <p className='text-2xl font-semibold text-[#001C27]'>Description:</p>
       <p className='text-xl text-justify text-[#001C27]'>
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis quaerat ducimus quidem. 
         {/* Add the full description here */}
       </p>
     </div>
     <div className='space-y-10 w-full md:w-1/3'>
       <SellerInfo />
       <CategorySidebar />
     </div>
   </div>
  </>
  )
}

export default AdDetails
