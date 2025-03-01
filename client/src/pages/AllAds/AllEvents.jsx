import React, { useEffect, useState } from 'react'
import LoadingSpinner from '../Components/LoadingSpinner'
import AdCard from '../Components/AdCard'
import { Helmet } from 'react-helmet-async'
import Breadcrumb from '../Components/Breadcrumb'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import EventCard from '../Components/EventCard'
import Pagination from '../Components/Pagination'

const AllEvents = () => {




 
  const [events, setEvents] = useState([]); 
const [errorEvents, setErrorEvents] = useState(''); 
  const [loadingEvents, setLoadingEvents] = useState(true);
  const axiosSecure = useAxiosSecure();



useEffect(() => {
 

 
  const fetchEvents = async () => {
    try {
      // Fetch categories from the API endpoint using the secure axios instance
      const response = await axiosSecure("/events")
      setEvents(response.data);
      setLoadingEvents(false);
    } catch (err) {
      setErrorEvents('Error loading Events');
      setLoadingEvents(false);
    }
  };
 
  fetchEvents();
}, []);




if (loadingEvents) return <div className="text-center text-[#014D48]"><LoadingSpinner></LoadingSpinner></div>;


if (errorEvents) return <div className="text-center text-[#FA8649]">{errorEvents}</div>;



















  const pages = [1, 2, 3, 4, 5]
  return (
    <div>
        <Helmet>
                          <title>All Events</title>
          </Helmet>
          <div className='space-y-4 mb-4'>
      <Breadcrumb
       title={" All Events"}
       subTitle={"Here you can find"}>
       </Breadcrumb>
    </div>
     
        <div className='container px-6 py-10 mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between'>
      <div>
        <div className='flex flex-col md:flex-row justify-center items-center gap-5 '>
          <div>
            <select
              name='category'
              id='category'
              className='border p-4 rounded-lg'
            >
              <option value=''>Filter By Category</option>
              <option value='Web Development'>Web Development</option>
              <option value='Graphics Design'>Graphics Design</option>
              <option value='Digital Marketing'>Digital Marketing</option>
            </select>
          </div>

          <form>
            <div className='flex p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300'>
              <input
                className='px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent'
                type='text'
                name='search'
                placeholder='Enter Job Title'
                aria-label='Enter Job Title'
              />

              <button className='px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'>
                Search
              </button>
            </div>
          </form>
    
          <button className='btn'>Reset</button>
        </div>
       
      </div>
  
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
      {
          events.map((event, index) =><EventCard key={index} event={event}></EventCard>)
         }
           </div>

      <Pagination></Pagination>
    
    </div>
      
 
    </div>
  )
}

export default AllEvents;
