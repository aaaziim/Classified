import React, { useEffect, useState } from 'react'
import useAxiosSecure from './useAxiosSecure';

const useServices = () => {

    
    const [services, setServices] = useState([]);
    const [errorServices, setErrorServices] = useState('');
    const [loadingServices, setLoadingServices] = useState(true);
    
    const axiosSecure = useAxiosSecure();



  useEffect(() => {
   


    const fetchServices = async () => {
      try {
        // Fetch categories from the API endpoint using the secure axios instance
        const response = await axiosSecure("/services")
        setServices(response.data.services);
        setLoadingServices(false);
      } catch (err) {
        setErrorServices('Error loading services');
        setLoadingServices(false);
      }
    };
 
 
    fetchServices();
    
  }, []);


  return [services, loadingServices, errorServices, setServices, setLoadingServices, setErrorServices ]
}

export default useServices
