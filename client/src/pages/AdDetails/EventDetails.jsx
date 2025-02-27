import { MdOutlineDateRange } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { FaLocationArrow } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import { MdCategory } from "react-icons/md";
import SellerInfo from './SellerInfo';
import CategorySidebar from './CategorySidebar';
import { Helmet } from 'react-helmet-async';
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../Components/LoadingSpinner";

const EventDetails = () => {

  const { id } = useParams(); 
  const [event, setEvent] = useState([]);
  const [errorEvent, setErrorEvent] = useState('');
 const [loadingEvent, setLoadingEvent] = useState(true);
  const axiosSecure = useAxiosSecure();


  useEffect(() => {


    const fetchEvent = async () => {
      try {
        // Fetch categories from the API endpoint using the secure axios instance
        const response = await axiosSecure(`/event/${id}`)
        setEvent(response.data);
        setLoadingEvent(false);
      } catch (err) {
        setErrorEvent('Error loading services');
        setLoadingEvent(false);
      }
    };
  
  
    fetchEvent();
     
  }, []);
  
    
  if (loadingEvent) return <div className="text-center text-[#014D48]"><LoadingSpinner></LoadingSpinner></div>;
  if (errorEvent) return <div className="text-center text-[#FA8649]">{errorService}</div>;
  
  const {title, posted, price, country, state, city, category, subcategory, description, startDate, endDate, author } = event;
  
















  return (
  <>
   <Helmet>
      <title>Event Details</title>
   </Helmet>
   <div className='flex flex-col justify-center md:flex-row gap-4 my-10'>
    
     <div className='w-full md:w-2/3 bg-[#FFE5D5] p-4 space-y-4 rounded-2xl'>
       <img className='w-full h-96' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2z-Qg3pe-RY9Lv8kQ4Ik3uFlebhYk4I9R0Q&s" alt="" />
            <div>
            <h1 className='text-2xl text-[#001C27] font-bold'>{title}</h1>
            <p className='flex items-center gap-2 text-[#001C27]'>
                  <FaLocationArrow />
                  <span>{city}, {state}, {country}</span>
                </p>
            </div>
       <div className='flex justify-between gap-4'>
       <p className='flex items-center gap-2 text-[#014D48]'>
             <MdOutlineDateRange />
             <span>{startDate} to {endDate}</span>
           </p>
         
         <p 
           className="bg-[#FA8649] max-w-fit px-4 py-2 text-white font-bold relative"
           style={{ clipPath: "polygon(0 0, 100% 0, 90% 50%, 100% 100%, 0 100%)" }}
         >
           Ticket: $220
         </p>
       </div>
      
     
         <p className='flex items-center gap-2 text-[#001C27]'>
           <BiCategoryAlt />
           <span>{category} | {subcategory}</span>
         </p>
        
       
       <p className='text-2xl font-semibold text-[#001C27]'>Description:</p>
       <p className='text-xl text-justify text-[#001C27]'>
       {description}
         {/* Add full description here */}
       </p>
     </div>
     <div className='space-y-10 w-full md:w-1/3'>
       <SellerInfo author={author} />
       <CategorySidebar />
     </div>
   </div>
  </>
  )
}

export default EventDetails
