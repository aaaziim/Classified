import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../Components/LoadingSpinner";
import Breadcrumb from "../Components/Breadcrumb";
import AdCard from "../Components/AdCard";
import Pagination from "../Components/Pagination";
import EventCard from "../Components/EventCard";

const Events = ({id}) => {
    const axiosSecure = useAxiosSecure();

  // State Declarations
  const [category, setCategory] = useState(null);
  // const [filter, setFilter] = useState(null);
  const [loadingCategory, setLoadingCategory] = useState(true);
  const [errorCategory, setErrorCategory] = useState("");

  const [events, setEvents] = useState([]);
    const [errorEvents, setErrorEvents] = useState('');
    const [loadingEvents, setLoadingEvents] = useState(true);
 
     const [page, setPage] = useState(1); 
            const [totalPages, setTotalPages] = useState(1);
            const limit = 12;
      



 useEffect(() => {
  const fetchCategoryAndEvents = async () => {
    try {
      // Fetch category data
      const categoryResponse = await axiosSecure(`/category/${id}`);
      setCategory(categoryResponse.data);
      const name = categoryResponse.data.name
     

      // Now that category is set, fetch events
      const eventResponse = await axiosSecure(`/eventsbycategory?category=${encodeURIComponent(name)}&page=${page}&limit=${limit}`);
      setEvents(eventResponse.data.events);
    setTotalPages(eventResponse.data.totalPages);
    setLoadingEvents(false); 
    } catch (err) {
      setErrorCategory("Error loading category");
      setErrorEvents("Error loading events");
    } finally {
      setLoadingCategory(false);
      setLoadingEvents(false);
    }
  };

  fetchCategoryAndEvents();
}, [id,page]); // Runs when `id` changes




const fetchEventsbySubCategory = async (name) => {
  
  try {
    // Fetch categories from the API endpoint using the secure axios instance
    const response = await axiosSecure(`/eventsbysubcategory?subcategory=${encodeURIComponent(name)}&page=${page}&limit=${limit}`);
    setEvents(response.data.events);
    setTotalPages(response.data.totalPages);
    setLoadingEvents(false); 
  } catch (err) {
    setErrorEvents('Error loading events');
    setLoadingEvents(false);
  }
};



  // Handle loading and error states
  if (loadingCategory) {
    return (
      <div className="text-center text-[#014D48]">
        <LoadingSpinner />
      </div>
    );
  }

  if (errorCategory) {
    return (
      <div className="text-center text-[#FA8649]">
        {errorCategory}
      </div>
    );
  }
  if (errorEvents) {
    return (
      <div className="text-center text-[#FA8649]">
        {errorEvents}
      </div>
    );
  }
  if (loadingEvents) {
    return (
      <div className="text-center text-[#014D48]">
        <LoadingSpinner />
      </div>
    );
  }
  return (

    <>
      <div className="px-4 py-6">
   
  
    <div className="flex flex-col lg:flex-row  gap-6">
  <div >
  <h2 className="text-lg bg-[#014D48] font-semibold mb-2 cursor-pointer p-3 border border-[#014D48] rounded-lg transition duration-300 hover:bg-[#FA8649]  text-white hover:border-[#FA8649] active:bg-[#014D48] active:text-white text-center">Subcategories</h2>
        <ul className="space-y-2">
          {
            category.subcategories?.map(subcategory =>   <li onClick={(e)=>fetchEventsbySubCategory(subcategory.name)} key={subcategory.id}  className="cursor-pointer p-3 border border-[#014D48] rounded-lg transition duration-300 hover:bg-[#FA8649] hover:text-white hover:border-[#FA8649] active:bg-[#014D48] active:text-white">
            {subcategory.name}
              </li>)
          }
   
         
           
        
        </ul>
  </div>

  {
    totalPages >0 ?<div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
    {events?.map(event =><EventCard key={event._id} event={event}></EventCard>)}
  </div> : <p>No Event Found</p>
  }

    
    
    </div>

   
  </div>
    
    <Pagination
      page={page}
      setPage={setPage} 
      totalPages={totalPages}
    />
    </>
  
  )
}

export default Events
