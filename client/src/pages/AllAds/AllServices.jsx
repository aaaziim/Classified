import React, { useEffect, useState } from 'react'
import LoadingSpinner from '../Components/LoadingSpinner'
import AdCard from '../Components/AdCard'
import { Helmet } from 'react-helmet-async'
import Breadcrumb from '../Components/Breadcrumb'
import useAxiosSecure from '../../hooks/useAxiosSecure'

const AllServices = () => {

  const [services, setServices] = useState([]);
  const [events, setEvents] = useState([]);


  const [errorServices, setErrorServices] = useState('');
const [errorEvents, setErrorEvents] = useState('');
 const [loadingServices, setLoadingServices] = useState(true);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const axiosSecure = useAxiosSecure();



useEffect(() => {
 


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
 

  fetchServices();
  
}, []);




if (loadingServices) return <div className="text-center text-[#014D48]"><LoadingSpinner></LoadingSpinner></div>;


if (errorServices) return <div className="text-center text-[#FA8649]">{errorServices}</div>;















  const pages = [1, 2, 3, 4, 5]
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
          <div>
            <select
              name='category'
              id='category'
              className='border p-4 rounded-md'
            >
              <option value=''>Sort By Deadline</option>
              <option value='dsc'>Descending Order</option>
              <option value='asc'>Ascending Order</option>
            </select>
          </div>
          <button className='btn'>Reset</button>
        </div>
        
      </div>
       
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
      {
          services.map((service, index) =><AdCard key={index} service={service}></AdCard>)
         }
           </div>

      <div className='flex justify-center mt-12'>
        <button className='px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-500  hover:text-white'>
          <div className='flex items-center -mx-1'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6 mx-1 rtl:-scale-x-100'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M7 16l-4-4m0 0l4-4m-4 4h18'
              />
            </svg>

            <span className='mx-1'>previous</span>
          </div>
        </button>

        {pages.map(btnNum => (
          <button
            key={btnNum}
            className={`hidden px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-blue-500  hover:text-white`}
          >
            {btnNum}
          </button>
        ))}

        <button className='px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500'>
          <div className='flex items-center -mx-1'>
            <span className='mx-1'>Next</span>

            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6 mx-1 rtl:-scale-x-100'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M17 8l4 4m0 0l-4 4m4-4H3'
              />
            </svg>
          </div>
        </button>
      </div>
    
    </div>
      
 
    </div>
  )
}

export default AllServices;
