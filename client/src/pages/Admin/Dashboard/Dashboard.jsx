import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ProfileCard from './ProfileCard';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../Components/LoadingSpinner';
import ServiceCard from '../../UserAuthentication/Profile/ServiceCard';
import Swal from 'sweetalert2';
import EventCard from '../../UserAuthentication/Profile/EventCard';
import ReportedEventCard from './ReportedEventCard';
import toast from 'react-hot-toast';
import ReportedServiceCard from './ReportedServiceCard';
import { Navigate } from 'react-router';

const Dashboard = () => {

  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState('manage-users'); // State for active tab

  const axiosSecure = useAxiosSecure();
  const [profiles, setProfiles] = useState([])
  const [loadingProfiles, setLoadingProfiles] = useState(true)
  const [errorProfiles, setErrorProfiles] = useState("")


  const [services, setServices] = useState([]);
  const [errorServices, setErrorServices] = useState('');
  const [loadingServices, setLoadingServices] = useState(true);

  const [reportedServices, setReportedServices] = useState([]);
  const [reportedEvents, setReportedEvents] = useState([]);


  const [events, setEvents] = useState([]);
    const [loadingEvents, setLoadingEvents] = useState(true);
    const [errorEvents, setErrorEvents] = useState('');

    const fetchAdminStatus = async () => {
      const user = await axiosSecure.get("/userprofile");
      setIsAdmin(user.data.isAdmin);
      console.log(user.data)
    };

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

    const fetchReportedServices= async () => {
      try {
        // Fetch categories from the API endpoint using the secure axios instance
        const response = await axiosSecure(`servicesbyfilter?status=reported`)
        setReportedServices(response.data.services);
      
        setLoadingServices(false);
      } catch (err) {
        setErrorServices('Error loading services');
        setLoadingServices(false);
      }
    };
    const fetchReportedEvents = async () => {
      try {
        // Fetch categories from the API endpoint using the secure axios instance
        const response = await axiosSecure(`eventsbyfilter?status=reported`)
        setReportedEvents(response.data.events);
        setLoadingEvents(false);
      } catch (err) {
        setErrorEvents('Error loading events');
        setLoadingEvents(false);
      }
    };
  useEffect(()=>{
  
    fetchAdminStatus();

      fetchProfiles()
      fetchServices()
      fetchEvents()
      fetchReportedServices()
      fetchReportedEvents()




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
          setReportedServices(reportedServices.filter(service => service._id !== _id));
          
          if (response.status === 200) {
            Swal.fire('Deleted!', 'Your service has been deleted.', 'success');
          }  else {
            Swal.fire('Error!', 'Something went wrong, please try again.', 'error');
          }
        } catch (error) {
          Swal.fire('Error!', 'Something went wrong, please try again.', 'error');
        }
      }
    };
  
    const makeAdmin = async (email) => {
      try {
        await axiosSecure.put(`/make-admin/${email}`);
        toast.success("User promoted to Admin");
        fetchProfiles(); // Refresh the user list
      } catch (err) {
        toast.error("Error promoting user");
      }
    };
    
    const removeAdmin = async (email) => {
      try {
        await axiosSecure.put(`/remove-admin/${email}`);
        toast.success("Admin rights removed");
        fetchProfiles(); // Refresh the user list
      } catch (err) {
        toast.error("Error removing admin");
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
          setReportedEvents(reportedEvents.filter(service => service._id !== _id));

            
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
    
      const handleServiceApprove = async (_id) => {
        const updatedService = {
          status: "active",
        };
      
        try {
          await axiosSecure.put(`/service-report/${_id}`, updatedService);
          toast.success("Service Approved");
          setReportedServices(reportedServices.filter(service => service._id !== _id));
          
        } catch (err) {
          toast.error(err.response?.data || "Error approving service");
        }
      };



      const handleEventApprove = async (_id) => {
        const updatedEvent = {
          status: "active",
        };
      
        try {
          await axiosSecure.put(`/event-report/${_id}`, updatedEvent);
          toast.success("Event Approved");
          setReportedEvents(reportedEvents.filter(event => event._id !== _id));
          
        } catch (err) {
          toast.error(err.response?.data || "Error approving event");
        }
      };
    




  if (loadingProfiles || loadingServices || loadingEvents) return <div className="text-center text-[#014D48]"><LoadingSpinner></LoadingSpinner></div>;
  if (errorProfiles) return <div className="text-center text-[#FA8649]">{errorProfiles}</div>;
  if (errorServices) return <div className="text-center text-[#FA8649]">{errorServices}</div>;
  if (errorEvents) return <div className="text-center text-[#FA8649]">{errorEvents}</div>;
  

  if (!isAdmin) {
    return <Navigate to="/" />;
  }
  


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
              onClick={() => setActiveTab('reported-services')}
            >
              Reported Services
            </Tab>
            <Tab
              className="cursor-pointer border-y-2 bg-[#001C27] border-white w-full text-lg py-2 px-4 rounded-md   transition relative hover:bg-[#014D48] text-white"
              selectedClassName="bg-dark-teal text-[#014D48]"
              onClick={() => setActiveTab('reported-events')}
            >
              Reported Events
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
            {profiles.map((profile) => (
  <div key={profile._id} className="flex justify-between p-4 border-b">
    <ProfileCard profile={profile} />
    
    {profile.isAdmin ? (
      <button onClick={() => removeAdmin(profile.email)} className="bg-red-500 text-white px-3 py-1 rounded">
        Remove Admin
      </button>
    ) : (
      <button onClick={() => makeAdmin(profile.email)} className="bg-green-500 text-white px-3 py-1 rounded">
        Make Admin
      </button>
    )}
  </div>
))}

            {/* {
                profiles?.map((profile) => (
                  <ProfileCard key={profile._id} profile={profile} />
                ))
  
            } */}

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

        {activeTab === 'reported-services' && (
          <div className="bg-white shadow-md rounded-lg p-6">
             <h2 className="text-xl font-semibold mb-4 text-dark-teal">Total : {reportedServices?.length} Reported Services </h2>
            <div className="bg-gray-200 p-4 rounded-lg">
                {
                    reportedServices?.map((service) => (
                        <ReportedServiceCard key={service._id} service={service} handleDelete={handleDelete} handleServiceApprove={handleServiceApprove} />
                    ))
                }
            </div>
          </div>
        )}


{activeTab === 'reported-events' && (
          <div className="bg-white shadow-md rounded-lg p-6">
             <h2 className="text-xl font-semibold mb-4 text-dark-teal">Total : {reportedEvents?.length} Reported Events </h2>
            <div className="bg-gray-200 p-4 rounded-lg">
                {
                    reportedEvents?.map((event) => (
                        <ReportedEventCard key={event._id} event={event} handleDelete={handleEventDelete} handleEventApprove={handleEventApprove} />
                    ))
                }
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
