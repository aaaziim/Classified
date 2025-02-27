import React, { useEffect, useState } from 'react'
import Breadcrumb from '../Components/Breadcrumb'
import { Helmet } from 'react-helmet-async'
import LoadingSpinner from '../Components/LoadingSpinner';
import { useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ServiceUpdate = () => {


  const { id } = useParams(); 
  const [service, setService] = useState([]);
  const [errorService, setErrorService] = useState('');
 const [loadingService, setLoadingService] = useState(true);
  const axiosSecure = useAxiosSecure();

useEffect(() => {


  const fetchService = async () => {
    try {
      // Fetch categories from the API endpoint using the secure axios instance
      const response = await axiosSecure(`/service/${id}`)
      setService(response.data);
      setLoadingService(false);
    } catch (err) {
      setErrorService('Error loading services');
      setLoadingService(false);
    }
  };


  fetchService();
   
}, []);

  
if (loadingService) return <div className="text-center text-[#014D48]"><LoadingSpinner></LoadingSpinner></div>;
if (errorService) return <div className="text-center text-[#FA8649]">{errorService}</div>;

const {title, posted, price, country, state, city, category, subcategory, description, author } = service;










  return (
    <div className="">
      <Helmet>
        <title>Update Service</title>
      </Helmet>

      <div className="space-y-4 mb-6">
        <Breadcrumb 
          title="Update Service"
          subTitle="Here you can update your service information"
        />
      </div>

      <div>
        <form className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-[#014D48] mb-4">
          <fieldset className="space-y-4">
            <legend className="text-lg font-semibold text-[#014D48] mb-4">Service Details</legend>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="block">
                <span className="text-[#001C27]">Title</span>
                <input type="text" name="service_title" className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]" required defaultValue={title}/>
              </label>

              <label className="block">
                <span className="text-[#001C27]">Category</span>
                <select name="service_category" className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]" required>
                  <option value="">Select Category</option>
                  <option value="Cleaning">Cleaning</option>
                  <option value="Repair">Repair</option>
                  <option value="IT Support">IT Support</option>
                </select>
              </label>

              <label className="block">
                <span className="text-[#001C27]">Sub-Category</span>
                <select name="service_subcategory" className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]" required>
                  <option value="">Select Sub-Category</option>
                </select>
              </label>

              <label className="block">
                <span className="text-[#001C27]">Price</span>
                <input type="number" name="service_price" className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]" required  defaultValue={price}/>
              </label>

              <label className="block md:col-span-2">
                <span className="text-[#001C27]">Description</span>
                <textarea name="service_description" className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]" required defaultValue={description}></textarea>
              </label>

              <label className="block">
                <span className="text-[#001C27]">Location</span>
                <input type="text" name="service_location" className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]" required />
              </label>

              <label className="block">
                <span className="text-[#001C27]">Upload Image</span>
                <input type="file" name="service_image" className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]" />
              </label>
            </div>
          </fieldset>

          
          <button type="submit" className="w-full bg-[#FA8649] text-white py-2 rounded-lg hover:bg-[#E06D36] transition mt-6">
            Update Service
          </button>
        </form>
      </div>
    </div>
  )
}

export default ServiceUpdate
