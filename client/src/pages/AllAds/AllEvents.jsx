import React, { useEffect, useState } from 'react'
import LoadingSpinner from '../Components/LoadingSpinner'
import AdCard from '../Components/AdCard'
import { Helmet } from 'react-helmet-async'
import Breadcrumb from '../Components/Breadcrumb'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import Pagination from '../Components/Pagination'
import { useNavigate } from 'react-router'
import useAuth from '../../hooks/useAuth'
import useCategory from '../../hooks/useCategory'
import useLocations from '../../hooks/useLocations'
import useEvents from '../../hooks/useEvents'
import EventCard from '../Components/EventCard'

const AllEvents = () => {

  const {user} = useAuth()
  const [categories, loadingCategories, errorCategories ] = useCategory()
  const [locations, loadingLocations,errorLocations ] = useLocations()

   
  const [events, setEvents] = useState([]);
  const [errorEvents, setErrorEvents] = useState('');
  const [loadingEvents, setLoadingEvents] = useState(true);
  
  const [page, setPage] = useState(1); // Current page
    const [totalPages, setTotalPages] = useState(1); // Total number of pages

    const limit = 3; // Number of events per page


  const axiosSecure = useAxiosSecure();


  useEffect(() => {
    const fetchEvents = async () => {
        try {
            // Fetch events with pagination
            const response = await axiosSecure(`/events?page=${page}&limit=${limit}`);
            setEvents(response.data.events);  // Use 'events' from the response
            setTotalPages(response.data.totalPages);  // Set the totalPages from the backend
            setLoadingEvents(false);
        } catch (err) {
            setErrorEvents('Error loading events');
            setLoadingEvents(false);
        }
    };

    fetchEvents();
}, [page]);  // The effect re-runs whenever the page changes


 



  
  const [searchText, setSearchText] = useState("")
  const [category, setCategory] = useState("");
  const [subcategory, setSubCategory] = useState("");
  const [categoryIndex, setCategoryIndex] = useState(0);

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [stateIndex, setStateIndex] = useState(0);
 
  
 
const navigate = useNavigate()









const fetchEventsWithFilter = async (searchText, category, subcategory, country, state, city) => {
  console.log(searchText, category, subcategory, country, state, city);

  try {
    // Build the query string dynamically, ensuring that each parameter is properly encoded
    const response = await axiosSecure(
      `/eventsbyfilter?searchtext=${encodeURIComponent(searchText)}&category=${encodeURIComponent(category)}&subcategory=${encodeURIComponent(subcategory)}&country=${encodeURIComponent(country)}&state=${encodeURIComponent(state)}&city=${encodeURIComponent(city)}&page=${page}&limit=${limit}`
    );
    setEvents(response.data.events);  // Use 'events' from the response
    setTotalPages(response.data.totalPages); 
   
    setLoadingEvents(false);
  } catch (err) {
    setErrorEvents('Error loading events');
    setLoadingEvents(false);
  }
};

const handleFilter = (e) => {
  e.preventDefault(); // Corrected method name
  fetchEventsWithFilter(searchText, category, subcategory, country, state, city);
}

 


if (loadingEvents) return <div className="text-center text-[#014D48]"><LoadingSpinner></LoadingSpinner></div>;


if (errorEvents) return <div className="text-center text-[#FA8649]">{errorEvents}</div>;






  return (
    <div>
        <Helmet>
                          <title>Events</title>
          </Helmet>
          <div className='space-y-4 mb-4'>
      <Breadcrumb
       title={"Events"}
       subTitle={"Here you can find"}>
       </Breadcrumb>
    </div>
    <div></div>
         
        <div className='container px-6 py-10 mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between'>
          
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          
        <div>
  <div>
    <form onSubmit={handleFilter}>
      <div className='flex p-1 overflow-hidden border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-[#FA8649] focus-within:ring-[#FA8649]'>
        <input
        onChange={(e)=>setSearchText(e.target.value)}
          className='px-6 py-2 text-[#001C27] w-full placeholder-gray-500 bg-white outline-none focus:placeholder-transparent'
          type='text'
          name='search'
          placeholder='Enter Job Title'
          aria-label='Enter Job Title'
        />

        <input type='submit' value="Search" className='px-1 md:px-4 py-3 mx-2 text-sm font-medium tracking-wider text-white uppercase transition-colors duration-300 transform bg-[#014D48] rounded-md hover:bg-[#001C27] focus:bg-[#001C27] focus:outline-none'/>
         
      </div>
    </form>
  </div>

  <div>
    <label className='block'>
      <span className='text-[#001C27]'>Category</span>
      <select
        name='event_category'
        className='mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]'
        required
        onChange={(e) => {
         
          setCategory(e.target.value)
        
          setCategoryIndex(e.target.selectedIndex - 1)
        }}
      >
        <option value=''>Select Category</option>
        {categories.map((category, index) => (
          <option key={index} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
    </label>
  </div>

  {category && (
    <div>
      <label className='block'>
        <span className='text-[#001C27]'>Sub-Category</span>
        <select
          name='event_subcategory'
          onChange={(e) => {
        
            setSubCategory(e.target.value) 
          }}
          className='mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]'
          required
        >
          <option value=''>Select Sub-Category</option>
          {categories[categoryIndex]?.subcategories?.map((subcategory, index) => (
            <option key={index} value={subcategory.name}>
              {subcategory.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  )}

  <label className='block'>
    <span className='text-[#001C27]'>Country</span>
    <select
      onChange={(e) => setCountry(e.target.value)}
      name='event_country'
      className='mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]'
      required
    >
      <option value=''>Select Country</option>
      {locations.map((location, index) => (
        <option key={index} value={location.name}>
          {location.name}
        </option>
      ))}
    </select>
  </label>

  {country === 'USA' && (
    <label className='block'>
      <span className='text-[#001C27]'>State</span>
      <select
        name='event_state'
        className='mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]'
        required
        onChange={(e) => {
        
          setState(e.target.value)
          setStateIndex(e.target.selectedIndex - 1)
        }}
      >
        <option value=''>Select State</option>
        {locations.length > 0 && locations[0].state ? (
          locations[0].state.map((location, index) => (
            <option key={index} value={location.name}>
              {location.name}
            </option>
          ))
        ) : null}
      </select>
    </label>
  )}

  {country === 'USA' && (
    <label className='block'>
      <span className='text-[#001C27]'>City</span>
      <select
        name='event_city'
        onChange={(e)=> setCity(e.target.value)}
        className='mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]'
        required
      >
        {locations.length > 0 &&
          locations[0].state &&
          stateIndex !== undefined &&
          stateIndex < locations[0].state.length &&
          locations[0].state[stateIndex].cities ? (
          locations[0].state[stateIndex].cities.map((city, index) => (
            <option key={index} value={city.name}>
              {city.name}
            </option>
          ))
        ) : null}
      </select>
    </label>
  )}
 <button onClick={handleFilter} className='w-full px-1 md:px-4 py-3 my-2 text-sm font-medium tracking-wider text-white uppercase transition-colors duration-300 transform bg-[#014D48] rounded-md hover:bg-[#001C27] focus:bg-[#001C27] focus:outline-none'>
  Apply Filter
</button>

</div>



{
  totalPages > 0?  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4 flex-1">
      {
          events.map((event, index) =><EventCard key={index} event={event}></EventCard>)
         }
           </div> : <p>No Service Found</p>
}








          </div>
         
        
      <div>
       
      </div>

 

       
      <Pagination
          page={page}
          setPage={setPage} 
          totalPages={totalPages}
        />
    </div>
      
 
    </div>
  )
}

export default AllEvents;
