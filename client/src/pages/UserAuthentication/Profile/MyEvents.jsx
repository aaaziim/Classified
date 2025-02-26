import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../Components/Breadcrumb'
import { Helmet } from 'react-helmet-async'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../Components/LoadingSpinner';
import EventCard from './EventCard';
 
const MyEvents = () => {


  const [events, setEvents] = useState([]);

  const [loadingEvents, setLoadingEvents] = useState(true);
  
  const [errorEvents, setErrorEvents] = useState('');

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
  
    const fetchEvents = async () => {
      try {
        // Fetch categories from the API endpoint using the secure axios instance
        const response = await axiosSecure("/events")
        setEvents(response.data);
        setLoadingEvents(false);
      } catch (err) {
        setErrorEvents('Error loading events');
        setLoadingEvents(false);
      }
    };

 
    fetchEvents(); 
  }, []);

  if ( loadingEvents  ) return <div className="text-center text-[#014D48]"><LoadingSpinner></LoadingSpinner></div>;
 
  if (errorEvents) return <div className="text-center text-[#FA8649]">{errorEvents}</div>;
 






  return (
    <div className="mb-6">
      <Helmet>
        <title>My Events</title>
      </Helmet>

      <div className="space-y-4 mb-6">
        <Breadcrumb
          title="My Events"
          subTitle="Here are the events you have listed."
        />
      </div>

      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-[#014D48]">
        <div className="space-y-6">
          
     {
      events.map((event, index)=><EventCard key={index} event={event}></EventCard> )
     }

        </div>
      </div>
    </div>
  )
}

export default MyEvents
