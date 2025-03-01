import React, { useEffect, useState } from 'react'
import LoadingSpinner from '../Components/LoadingSpinner'
import AdCard from '../Components/AdCard'
import { Helmet } from 'react-helmet-async'
import Breadcrumb from '../Components/Breadcrumb'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import Pagination from '../Components/Pagination'
import { useNavigate } from 'react-router'
import useAuth from '../../hooks/useAuth'

const AllServices = () => {

  const {user} = useAuth()
  const [services, setServices] = useState([]);
  const [events, setEvents] = useState([]);


  const [errorServices, setErrorServices] = useState('');
const [errorEvents, setErrorEvents] = useState('');
 const [loadingServices, setLoadingServices] = useState(true);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const axiosSecure = useAxiosSecure();





  const [locations, setLocations] = useState([]);
  const [country, setCountry] = useState("");
  const [stateIndex, setStateIndex] = useState(0);
  const [category, setCategory] = useState(null);
  const [subcategory, setSubCategory] = useState(null);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [state, setState] = useState();
const [categories, setCategories] = useState([]);
const [loadingCategories, setLoadingCategories] = useState(true);
const [loadingLocations, setLoadingLocations] = useState(true);
const [errorCategories, setErrorCategories] = useState('');
const [errorLocations, setErrorLocations] = useState('');
 
const navigate = useNavigate()







useEffect(() => {
 
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

  

  const fetchServices = async () => {
    try {
      // Fetch categories from the API endpoint using the secure axios instance
      const response = await axiosSecure("/services")
      setServices(response.data);
      setLoadingServices(false);
    } catch (err) {
      setErrorServices('Error loading services');
      setLoadingServices(false);
    }
  };
 
  fetchCategories();
  fetchLocations();
  fetchServices();
  
}, []);


const fetchServicesbyCategory = async (name) => {
  console.log(name)
  try {
    // Fetch categories from the API endpoint using the secure axios instance
    const response = await axiosSecure(`/servicesbycategory?category=${encodeURIComponent(name)}`);
    setServices(response.data);
    setLoadingServices(false);
  } catch (err) {
    setErrorServices('Error loading services');
    setLoadingServices(false);
  }
};


const fetchServicesbySubCategory = async (name,category) => {
  console.log(category, name)
  try {
    // Fetch categories from the API endpoint using the secure axios instance
    const response = await axiosSecure(`/servicesbysubcategory?category=${encodeURIComponent(category)}&subcategory=${encodeURIComponent(name)}`);
    setServices(response.data);
    setLoadingServices(false);
  } catch (err) {
    setErrorServices('Error loading services');
    setLoadingServices(false);
  }
};




if (loadingServices) return <div className="text-center text-[#014D48]"><LoadingSpinner></LoadingSpinner></div>;


if (errorServices) return <div className="text-center text-[#FA8649]">{errorServices}</div>;




  return (
    <div>
        <Helmet>
                          <title>All Services</title>
          </Helmet>
          <div className='space-y-4 mb-4'>
      <Breadcrumb
       title={"All Services"}
       subTitle={"Here you can find"}>
       </Breadcrumb>
    </div>
    <div><div>
    <form className="flex justify-center">
  <div className="flex p-1 border rounded-md w-64 mx-auto focus-within:ring focus-within:ring-[#FA8649]">
    <input
      className="px-2 py-1 w-full text-gray-700 placeholder-gray-500 bg-white outline-none text-sm"
      type="text"
      name="search"
      placeholder="Search..."
      aria-label="Search"
    />
    <button className="px-3 py-1 text-xs font-medium text-white bg-[#014D48] rounded-md hover:bg-[#FA8649] transition">
      Search
    </button>
  </div>
</form>

          </div></div>
         
        <div className='container px-6 py-10 mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between'>
          
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          
        <div className=' '>
          <div>
          <select name='service_category' className='mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]' required
                             onChange={(e) => {
                              setServices([])
                              setCategory(e.target.value)
                              fetchServicesbyCategory(e.target.value)
                              setCategoryIndex(e.target.selectedIndex - 1)
                             }} 
                            >
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
          </div>
         {
          category &&  <div>
          <select name='service_subcategory' 
          onChange={(e)=>{
            setServices([])
            setSubCategory(e.target.value)
            fetchServicesbySubCategory(e.target.value, category)
          }} className='mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]' required>
                                <option value=''>Select Sub-Category</option>
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
          </div>

         }
        
    
         
        </div>





        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4 flex-1">
      {
          services.map((service, index) =><AdCard key={index} service={service}></AdCard>)
         }
           </div>









          </div>
         
        
      <div>
       
      </div>
       
  

    <Pagination></Pagination>
    </div>
      
 
    </div>
  )
}

export default AllServices;
