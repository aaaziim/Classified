import React, { useEffect, useState } from 'react'
import Breadcrumb from '../Components/Breadcrumb'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import LoadingSpinner from '../Components/LoadingSpinner';
import toast from 'react-hot-toast';

const EventUpdate = () => {

  const { id } = useParams(); 
  const [event, setEvent] = useState([]);
  const [errorEvent, setErrorEvent] = useState('');
 const [loadingEvent, setLoadingEvent] = useState(true);
  const axiosSecure = useAxiosSecure();
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [country, setCountry] = useState("");
  const [locations, setLocations] = useState([]);
const [loadingLocations, setLoadingLocations] = useState(true);
const [errorLocations, setErrorLocations] = useState('');
const [categories, setCategories] = useState([]);
const [loadingCategories, setLoadingCategories] = useState(true);
const [errorCategories, setErrorCategories] = useState('');
  const [stateIndex, setStateIndex] = useState(0); 
const navigate = useNavigate()


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

    
  const fetchCategories = async () => {
    try {
      // Fetch categories from the API endpoint using the secure axios instance
      const response = await axiosSecure("/categories")
      setCategories(response.data);
      setLoadingCategories(false);
    } catch (err) {
      setErrorCategories('Error loading categories');
      setLoadingCategories(false);
    }
  };
  
  const fetchLocations = async () => {
    try {
      const response = await axiosSecure("/locations")
      
      setLocations(response.data);
      setLoadingLocations(false);
    } catch (err) {
      setErrorLocations('Error loading locations');
      setLoadingLocations(false);
    }
  };
  
  fetchCategories();
  fetchLocations();

  
  
    fetchEvent();
     
  }, []);
  
    
  if (loadingEvent) return <div className="text-center text-[#014D48]"><LoadingSpinner></LoadingSpinner></div>;
  if (errorEvent) return <div className="text-center text-[#FA8649]">{errorEvent}</div>;
  
  const {title,   price,   description  } = event;
  



  const handleUpdateEvent = async(e) => {
    e.preventDefault();
    const form = e.target;
    const updatedEvent = {
      title: form.event_title.value,
      category: form.event_category.value,
      subcategory: form.event_subcategory.value,
      price: form.event_price.value,
      description: form.event_description.value,
      startDate: form.event_start_date.value,
      endDate: form.event_end_date.value,
      
      country: form.event_country.value,
      state: form.event_state?.value,
      city: form.event_city?.value, 
      
    };
    try{
      const {data} = await axiosSecure.put(`/event-update/${id}`, updatedEvent) 
      toast.success("Event updated successfully")
      navigate("/my-events")
     } catch(err){ 
        toast.error(err.response.data)
     }
  };










  return (
    <div className="">
      <Helmet>
        <title>Update Event</title>
      </Helmet>

      <div className="space-y-4 mb-6">
        <Breadcrumb 
          title="Update Events"
          subTitle="Here you can update your event information"
        />
      </div>

      <div>
    
        <form onSubmit={handleUpdateEvent} className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-[#014D48] mb-4">
          <fieldset className="space-y-4">
            <legend className="text-lg font-semibold text-[#014D48] mb-4">Event Details</legend>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="block">
                <span className="text-[#001C27]">Title</span>
                <input onChange={(e)=>console.log(e.target.value)} type="text" name="event_title" className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]" required defaultValue={title} />
              </label>
              <label className='block'>
              <span className='text-[#001C27]'>Category</span>
              <select name='event_category' required className='mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#014D48]'  onChange={(e) => setCategoryIndex(e.target.selectedIndex - 1)} >
                <option value=''>Select Category</option>
                {
    categories.map((category, index) => (
        <option 
            key={index} 
            value={category.name} 
           // Wrap the function call in an anonymous function
        >
            {category.name}
        </option>
    ))
}
              </select>
            </label>
            <label className='block'>
              <span className='text-[#001C27]'>Sub-Category</span>
              <select name='event_subcategory' required className='mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#014D48]'>
                <option value='sub'>Select Sub-Category</option>
                {

categories[categoryIndex]?.subcategories?.map((subcategory, index) => (
    <option 
        key={index} 
        value={subcategory.name} 
    >
        {subcategory.name}
    </option>
))
                                }
              </select>
            </label>
              

              <label className="block">
                <span className="text-[#001C27]">Ticket Price</span>
                <input type="number" name="event_price" className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]" required defaultValue={price} />
              </label>

              <label className="block md:col-span-2">
                <span className="text-[#001C27]">Description</span>
                <textarea name="event_description" className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]" required defaultValue={description}></textarea>
              </label>

              <label className='block'>
              <span className='text-[#001C27]'>Event Starts</span>
              <input type='date' name='event_start_date' required className='mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#014D48]' />
            </label>
            <label className='block'>
              <span className='text-[#001C27]'>Event Ends</span>
              <input type='date' name='event_end_date' required className='mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#014D48]' />
            </label>

              <label className='block'>
                            <span className='text-[#001C27]'>Country</span>
                            <select   onChange={(e) => setCountry(e.target.value)} name='event_country' className='mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]' required>
                            <option value=''>Select Country</option>
                            {
    locations.map((location, index) => (
        <option 
            key={index} 
            value={location.name} 
           // Wrap the function call in an anonymous function
        >
            {location.name}
        </option>
    ))
}

                            
                            </select>
                        </label>
                        {
    country === "USA" && (
        <label className="block">
            <span className="text-[#001C27]">State</span>
            <select
                name="service_state"
                className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]"
                required
                onChange={(e) => setStateIndex(e.target.selectedIndex - 1)} 
                
                 
            >
                <option value="">Select State</option>
                {locations.length > 0 && locations[0].state ? (
                    locations[0].state.map((location, index) => (
                        <option key={index} value={location.name}>
                            {location.name}
                        </option>
                    ))
                ) : null}
            </select>
        </label>
    )
}

                        {
                            country === "USA"?
                            <label className='block'>
                            <span className='text-[#001C27]'>City</span>
                            <select name='service_city' className='mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]' required>
                            {
    locations.length > 0 &&
    locations[0].state &&
    stateIndex !== undefined &&
    stateIndex < locations[0].state.length &&
    locations[0].state[stateIndex].cities ? (
        locations[0].state[stateIndex].cities.map((city, index) => (
            <option 
                key={index} 
                value={city.name} 
            >
                {city.name}
            </option>
        ))
    ) : null
}

                            </select>
                        </label> : null
                        }

              <label className="block">
                <span className="text-[#001C27]">Upload Image</span>
                <input type="file" name="service_image" className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]" />
              </label>
            </div>
          </fieldset>

          
          <button type="submit" className="w-full bg-[#FA8649] text-white py-2 rounded-lg hover:bg-[#E06D36] transition mt-6">
            Update Event
          </button>
        </form>
      </div>
    </div>
  )
}

export default EventUpdate
