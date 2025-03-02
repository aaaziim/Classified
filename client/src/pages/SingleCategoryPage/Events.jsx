import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../Components/LoadingSpinner";
import Breadcrumb from "../Components/Breadcrumb";
import AdCard from "../Components/AdCard";
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
  
 useEffect(() => {
  const fetchCategoryAndEvents = async () => {
    try {
      // Fetch category data
      const categoryResponse = await axiosSecure(`/category/${id}`);
      setCategory(categoryResponse.data);
      const name = categoryResponse.data.name
      console.log(name)

      // Now that category is set, fetch events
      const eventResponse = await axiosSecure(`/eventsbycategory?category=${encodeURIComponent(name)}`);
      setEvents(eventResponse.data);
    } catch (err) {
      setErrorCategory("Error loading category");
      setErrorEvents("Error loading events");
    } finally {
      setLoadingCategory(false);
      setLoadingEvents(false);
    }
  };

  fetchCategoryAndEvents();
}, [id]); // Runs when `id` changes




const fetchEventsbySubCategory = async (name) => {
  console.log(name)
  try {
    // Fetch categories from the API endpoint using the secure axios instance
    const response = await axiosSecure(`/eventsbysubcategory?subcategory=${encodeURIComponent(name)}`);
    setEvents(response.data);
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
    <div className="px-4 py-6">
    <Helmet>
      <title>{category?.name || "Category"}</title>
    </Helmet>

   
    <div className="flex flex-col lg:flex-row justify-between gap-6">
  <div >
  <h2 className="text-lg bg-[#014D48] font-semibold mb-2 cursor-pointer p-3 border border-[#014D48] rounded-lg transition duration-300 hover:bg-[#FA8649]  text-white hover:border-[#FA8649] active:bg-[#014D48] active:text-white text-center">Subcategories</h2>
        <ul className="space-y-2">
          {
            category.subcategories.map(subcategory =>   <li onClick={(e)=>fetchEventsbySubCategory(subcategory.name)} key={subcategory.id}  className="cursor-pointer p-3 border border-[#014D48] rounded-lg transition duration-300 hover:bg-[#FA8649] hover:text-white hover:border-[#FA8649] active:bg-[#014D48] active:text-white">
            {subcategory.name}
              </li>)
          }
   
         
           
        
        </ul>
  </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
      {events.map(event =><EventCard key={event._id} event={event}></EventCard>)}
     
    </div>
    </div>

   
  </div>
  )
}

export default Events
