import React, { useEffect, useState } from 'react'
import LoadingSpinner from '../Components/LoadingSpinner'
import AdCard from '../Components/AdCard'
import Breadcrumb from '../Components/Breadcrumb'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import Pagination from '../Components/Pagination'
import { useNavigate } from 'react-router'
import useAuth from '../../hooks/useAuth'
import useCategory from '../../hooks/useCategory'
import useLocations from '../../hooks/useLocations'
import useServices from '../../hooks/useServices'

const AllServices = () => {

  const {user} = useAuth()
  const [categories, loadingCategories, errorCategories ] = useCategory()
  const [locations, loadingLocations,errorLocations ] = useLocations()

   
  const [services, setServices] = useState([]);
  const [errorServices, setErrorServices] = useState('');
  const [loadingServices, setLoadingServices] = useState(true);
  
  const [page, setPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1);
  const limit = 3;
  const axiosSecure = useAxiosSecure();


  useEffect(() => {
    const fetchServices = async () => {
        try {
            // Fetch services with pagination
            const response = await axiosSecure(`/services?page=${page}&limit=${limit}`);
            setServices(response.data.services);  // Use 'services' from the response
            setTotalPages(response.data.totalPages);  // Set the totalPages from the backend
            setLoadingServices(false);
        } catch (err) {
            setErrorServices('Error loading services');
            setLoadingServices(false);
        }
    };

    fetchServices();
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









const fetchServicesWithFilter = async (searchText, category, subcategory, country, state, city) => {
 

  try {
    // Build the query string dynamically, ensuring that each parameter is properly encoded
    const response = await axiosSecure(
      `/servicesbyfilter?searchtext=${encodeURIComponent(searchText)}&category=${encodeURIComponent(category)}&subcategory=${encodeURIComponent(subcategory)}&country=${encodeURIComponent(country)}&state=${encodeURIComponent(state)}&city=${encodeURIComponent(city)}&page=${page}&limit=${limit}`
    );
    setServices(response.data.services);  // Use 'services' from the response
    setTotalPages(response.data.totalPages); 
   
    setLoadingServices(false);
  } catch (err) {
    setErrorServices('Error loading services');
    setLoadingServices(false);
  }
};

const handleFilter = (e) => {
  e.preventDefault(); // Corrected method name
  fetchServicesWithFilter(searchText, category, subcategory, country, state, city);
}

 


if (loadingServices) return <div className="text-center text-[#014D48]"><LoadingSpinner></LoadingSpinner></div>;


if (errorServices) return <div className="text-center text-[#FA8649]">{errorServices}</div>;






  return (
    <div>
      
          <div className='space-y-4 mb-4'>
      <Breadcrumb
       title={"Services"}
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
        name='service_category'
        className='mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]'
        required
        onChange={(e) => {
         
          setCategory(e.target.value)
        
          setCategoryIndex(e.target.selectedIndex - 1)
        }}
      >
        <option value=''>Select Category</option>
        {categories?.map((category, index) => (
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
          name='service_subcategory'
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
      name='service_country'
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
        name='service_state'
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
        name='service_city'
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
          services.map((service, index) =><AdCard key={index} service={service}></AdCard>)
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

export default AllServices;
