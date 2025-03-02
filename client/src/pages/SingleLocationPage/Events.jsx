 
import React, { useEffect, useState } from 'react'
 
 
import AdCard from '../Components/AdCard'
 
import useAxiosSecure from '../../hooks/useAxiosSecure'
import LoadingSpinner from '../Components/LoadingSpinner'
import EventCard from '../Components/EventCard'

const Events = ({id}) => {
 
    const axiosSecure = useAxiosSecure();
  
    // State Declarations
    const [location, setLocation] = useState(null);
    const [stateIndex, setStateIndex] = useState(null);
   
    const [loadingLocation, setLoadingLocation] = useState(true);
    const [errorLocation, setErrorLocation] = useState("");
  
    const [events, setEvents] = useState([]);
      const [errorEvents, setErrorEvents] = useState('');
      const [loadingEvents, setLoadingEvents] = useState(true);
    
  
   useEffect(() => {
    const fetchLocationAndEvents = async () => {
      try {
        // Fetch location data
        const locationResponse = await axiosSecure(`/location/${id}`);
        setLocation(locationResponse.data);
        const name = locationResponse.data.name
        console.log(name)
  
        // Now that location is set, fetch events
        const eventResponse = await axiosSecure(`/eventsbycountry?country=${encodeURIComponent(name)}`);
        setEvents(eventResponse.data);
      } catch (err) {
        setErrorLocation("Error loading location");
        setErrorEvents("Error loading events");
      } finally {
        setLoadingLocation(false);
        setLoadingEvents(false);
      }
    };
  
    fetchLocationAndEvents();
  }, [id]); // Runs when `id` changes
  
  
  const fetchEventsbyState = async (name) => {
    console.log(name)
    try {
      // Fetch categories from the API endpoint using the secure axios instance
      const response = await axiosSecure(`/eventsbystate?state=${encodeURIComponent(name)}`);
      setEvents(response.data);
      setLoadingEvents(false);
    } catch (err) {
      setErrorEvents('Error loading events');
      setLoadingEvents(false);
    }
  };
  
  const fetchEventsbyCity = async (name) => {
    console.log(name)
    try {
      // Fetch categories from the API endpoint using the secure axios instance
      const response = await axiosSecure(`/eventsbycity?city=${encodeURIComponent(name)}`);
      setEvents(response.data);
      setLoadingEvents(false);
    } catch (err) {
      setErrorEvents('Error loading events');
      setLoadingEvents(false);
    }
  };
  
  
  
  
  
  
    // Handle loading and error states
    if (loadingLocation) {
      return (
        <div className="text-center text-[#014D48]">
          <LoadingSpinner />
        </div>
      );
    }
  
    if (errorLocation) {
      return (
        <div className="text-center text-[#FA8649]">
          {errorLocation}
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
    <div className="flex justify-between gap-6">
    <div >
{
  location?.state && <>    <h2 className="text-lg bg-[#014D48] font-semibold mb-2 cursor-pointer p-3 border border-[#014D48] rounded-lg transition duration-300 hover:bg-[#FA8649]  text-white hover:border-[#FA8649] active:bg-[#014D48] active:text-white">States</h2>
  <select  onChange={(e) => {
    fetchEventsbyState(e.target.value)
    setStateIndex(e.target.selectedIndex - 1)
  }}  className="p-3 border border-[#014D48] rounded-lg transition duration-300 hover:bg-[#FA8649] hover:text-white focus:outline-none">
  <option  value="">
  Select State
</option>
{location.state.map((st,index) => (
<option   key={index}  value={st.name}>
  {st.name}
</option>
))}

</select></>
}
{location?.state && stateIndex !== undefined && location.state[stateIndex] && (
  <div className='my-4'>
    <h2 className="text-lg bg-[#014D48] font-semibold mb-2 cursor-pointer p-3 border border-[#014D48] rounded-lg transition duration-300 hover:bg-[#FA8649] text-white hover:border-[#FA8649] active:bg-[#014D48] active:text-white">
      Cities
    </h2>

    <select onChange={(e)=> fetchEventsbyCity(e.target.value)} className="p-3 border border-[#014D48] rounded-lg transition duration-300 hover:bg-[#FA8649] hover:text-white focus:outline-none">
    <option  value="">
  Select City
</option>
      {location.state[stateIndex]?.cities?.map((city, index) => (
        <option key={index} value={city.name}>
          {city.name}
        </option>
      ))}
    </select>
  </div>
)}

    </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
        {events.map(event =><EventCard key={event._id} event={event}></EventCard>)}
    </div>
      </div>
  )
}

export default Events
