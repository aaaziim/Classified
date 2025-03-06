import React, { useEffect, useState } from 'react'
import useAxiosSecure from './useAxiosSecure';

const useEvents = () => {
    
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
        setErrorEvents('Error loading Events');
        setLoadingEvents(false);
      }
    };
    fetchEvents();
  }, []);
  return  [events, loadingEvents, errorEvents, setEvents, setLoadingEvents, setErrorEvents]
}

export default useEvents
