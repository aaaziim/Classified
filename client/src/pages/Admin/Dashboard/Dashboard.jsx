import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ProfileCard from './ProfileCard';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../Components/LoadingSpinner';
import ServiceCard from '../../UserAuthentication/Profile/ServiceCard';
import Swal from 'sweetalert2';
import EventCard from '../../UserAuthentication/Profile/EventCard';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('manage-users'); // State for active tab

  const axiosSecure = useAxiosSecure();
  const [profiles, setProfiles] = useState([])
  const [loadingProfiles, setLoadingProfiles] = useState(true)
  const [errorProfiles, setErrorProfiles] = useState("")


  const [services, setServices] = useState([]);
  const [errorServices, setErrorServices] = useState('');
  const [loadingServices, setLoadingServices] = useState(true);

  const [events, setEvents] = useState([]);
    const [loadingEvents, setLoadingEvents] = useState(true);
    const [errorEvents, setErrorEvents] = useState('');

  useEffect(()=>{
    const fetchProfiles = async () => {
        try {
          // Fetch categories from the API endpoint using the secure axios instance
          const response = await axiosSecure("/profiles")
          setProfiles(response.data);
          setLoadingProfiles(false);
        } catch (err) {
        errorProfiles('Error loading categories');
          loadingProfiles(false);
        }
      };

      
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

      const fetchEvents = async () => {
        try {
          // Fetch categories from the API endpoint using the secure axios instance
          const response = await axiosSecure("/events")
          setEvents(response.data.events);
          setLoadingEvents(false);
        } catch (err) {
          setErrorEvents('Error loading Events');
          setLoadingEvents(false);
        }
      };

      fetchProfiles()
      fetchServices()
      fetchEvents()




  },[])


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
  

    const handleEventDelete = async (_id) => {
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
            const response = await axiosSecure.delete(`/event/${_id}`)
            setEvents(events.filter(event => event._id !== _id));
            
            if (response.status === 200) {
              Swal.fire('Deleted!', 'Your event has been deleted.', 'success');
            } else {
              Swal.fire('Error!', 'Something went wrong, please try again.', 'error');
            }
          } catch (error) {
            Swal.fire('Error!', 'Something went wrong, please try again.', 'error');
          }
        }
      };
    
  



  if (loadingProfiles || loadingServices || loadingEvents) return <div className="text-center text-[#014D48]"><LoadingSpinner></LoadingSpinner></div>;
  if (errorProfiles) return <div className="text-center text-[#FA8649]">{errorProfiles}</div>;
  if (errorServices) return <div className="text-center text-[#FA8649]">{errorServices}</div>;
  if (errorEvents) return <div className="text-center text-[#FA8649]">{errorEvents}</div>;
  




  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-full lg:w-64 bg-dark-navy bg-[#FA8649] text-[#014D48]">
        <h1 className="text-2xl font-bold mb-6 text-center p-6 bg-[#FFE5D5]">Admin Dashboard</h1>
        <Tabs>
          <TabList className="space-y-4">
            <Tab
              className="cursor-pointer bg-[#001C27] border-y-2 border-white w-full text-lg py-2 px-4 rounded-md  transition relative hover:bg-[#014D48] text-white"
              selectedClassName="bg-dark-teal text-[#014D48]"
              onClick={() => setActiveTab('manage-users')}
            >
              Manage Users
            </Tab>
            <Tab
              className="cursor-pointer bg-[#001C27] border-y-2 border-white w-full text-lg py-2 px-4 rounded-md  transition relative hover:bg-[#014D48] text-white"
              selectedClassName="bg-dark-teal text-[#014D48]"
              onClick={() => setActiveTab('manage-services')}
            >
              Manage Services
            </Tab>
            <Tab
              className="cursor-pointer bg-[#001C27] border-y-2 border-white w-full text-lg py-2 px-4 rounded-md  transition relative hover:bg-[#014D48] text-white"
              selectedClassName="bg-dark-teal text-[#014D48]"
              onClick={() => setActiveTab('manage-events')}
            >
              Manage Events
            </Tab>
            <Tab
              className="cursor-pointer border-y-2 bg-[#001C27] border-white w-full text-lg py-2 px-4 rounded-md   transition relative hover:bg-[#014D48] text-white"
              selectedClassName="bg-dark-teal text-[#014D48]"
              onClick={() => setActiveTab('reported-listings')}
            >
              Reported Listings
            </Tab>
          </TabList>
        </Tabs>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Active Tab Content */}
        {activeTab === 'manage-users' && (
          <div className="bg-white shadow-md rounded-lg p-6 space-y-2">
            <h2 className="text-xl font-semibold mb-4 text-dark-teal">Total : {profiles.length} Users Profile</h2>
            {
                profiles?.map((profile) => (
                  <ProfileCard key={profile._id} profile={profile} />
                ))
  
            }

          </div>
        )}

        {activeTab === 'manage-services' && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-dark-teal">Total : {services?.length} Services Listings</h2>
            <div className="bg-gray-200 p-4 rounded-lg">
                {
                    services?.map((service) => (
                        <ServiceCard key={service._id} service={service} handleDelete={handleDelete} />
                    ))
                }
            </div>
          </div>
        )}

{activeTab === 'manage-events' && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-dark-teal">Total : {events.length} Events Listing</h2>
            <div className="bg-gray-200 p-4 rounded-lg">
             {
                events.map((event) => (
                    <EventCard key={event._id} event={event} handleDelete={handleEventDelete} />
                ))
             }
            </div>
          </div>
        )}

        {activeTab === 'reported-listings' && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-dark-teal">Reported Listings</h2>
            <div className="bg-gray-200 p-4 rounded-lg">
              <p className="text-dark-navy">Reported listings details will be shown here.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
