import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../Components/Breadcrumb'
import { Helmet } from 'react-helmet-async'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../Components/LoadingSpinner';
import ServiceCard from './ServiceCard';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2'; 
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
        const response = await axiosSecure(`/servicesbyauser`)
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
 
  const handleDelete = async (_id) => {
    // Show confirmation modal
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    // If confirmed, send delete request to API
    if (result.isConfirmed) {
      try {
        const response = await axiosSecure.delete(`/service/${_id}`)
        setServices(services.filter(service => service._id !== _id));
        
        if (response.status === 200) {
          Swal.fire('Deleted!', 'Your service has been deleted.', 'success');
        } else {
          Swal.fire('Error!', 'Something went wrong, please try again.', 'error');
        }
      } catch (error) {
        Swal.fire('Error!', 'Something went wrong, please try again.', 'error');
      }
    }
  };




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
                services?.map((service,index)=><ServiceCard key={index} service={service} handleDelete={handleDelete}></ServiceCard>)
              }
        </div>
      </div>
    </div>
  )
}

export default MyServices
