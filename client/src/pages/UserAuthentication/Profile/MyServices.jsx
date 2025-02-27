import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../Components/Breadcrumb'
import { Helmet } from 'react-helmet-async'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../Components/LoadingSpinner';
import ServiceCard from './ServiceCard';
import useAuth from '../../../hooks/useAuth';

const MyServices = () => {

const {user} = useAuth()

  const [services, setServices] = useState([]);

  const [loadingServices, setLoadingServices] = useState(true);
  
  const [errorServices, setErrorServices] = useState('');

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
  
    const fetchServices = async () => {
      try {
        // Fetch categories from the API endpoint using the secure axios instance
        const response = await axiosSecure(`/services/${user.email}`)
        setServices(response.data);
        setLoadingServices(false);
      } catch (err) {
        setErrorServices('Error loading services');
        setLoadingServices(false);
      }
    };

 
    fetchServices(); 
  }, []);

  if ( loadingServices  ) return <div className="text-center text-[#014D48]"><LoadingSpinner></LoadingSpinner></div>;
 
  if (errorServices) return <div className="text-center text-[#FA8649]">{errorServices}</div>;
 



  return (
    <div className="mb-6">
      <Helmet>
        <title>My Services</title>
      </Helmet>

      <div className="space-y-4 mb-6">
        <Breadcrumb 
          title="My Services"
          subTitle="Here are the services you have listed."
        />
      </div>

      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-[#014D48]">
        <div className="space-y-6">
              {
                services.map((service,index)=><ServiceCard key={index} service={service}></ServiceCard>)
              }
        </div>
      </div>
    </div>
  )
}

export default MyServices
