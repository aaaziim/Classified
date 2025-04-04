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
import DynamicTitlePage from '../../Components/DynamicTitlePage';

const Dashboard = () => {

  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState('manage-users'); // State for active tab

  const axiosSecure = useAxiosSecure();
  const [profiles, setProfiles] = useState([])
  const [admins, setAdmins] = useState([])
  const [loadingProfiles, setLoadingProfiles] = useState(true)
  const [errorProfiles, setErrorProfiles] = useState("")
  const [loading, setLoading] = useState(false);

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

    const fetchAdmins = async () => {
      try {
        // Fetch categories from the API endpoint using the secure axios instance
        const response = await axiosSecure.get("/admins")
        console.log(response.data)
        setAdmins(response.data);
         
      } catch (err) {
      console.log('Error loading categories');
     
      }
    }

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
    fetchAdmins();
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

    const handleAdminSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
  
      const adminData = {
        name: e.target.name.value,
        email: e.target.email.value,
      };
  
      try {
        const { data } = await axiosSecure.post('/add-admin', adminData);
        toast.success(data.message);
        fetchAdmins();
        e.target.reset() // Refresh the user list
      } catch (err) {
        toast.error('Failed to add admin: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
  
    // const makeAdmin = async (email) => {
    //   try {
    //     const result = await axiosSecure.put(`/make-admin/${email}`);
    //     if(result.status === 200){
    //       toast.success("User promoted to admin");
    //       fetchProfiles(); // Refresh the user list
    //     }
       
        
    //   } catch (err) {
    //     toast.error("Only Admin can promote a user");
    //   }
    // };
    
    const removeAdmin = async (email) => {
      try {
        const result = await axiosSecure.put(`/remove-admin/${email}`);
        if(result.status === 200){
          toast.success("Admin rights removed");
          fetchProfiles(); 
          fetchAdmins(); // Refresh the user list
        }

       
      } catch (err) {
        toast.error("Only Admin can remove admin");
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
          await axiosSecure.put(`/service-report-close/${_id}`, updatedService);
          toast.success("Service Approved");
          setReportedServices(reportedServices.filter(service => service._id !== _id));
          
        } catch (err) {
          toast.error(err.response?.data || "Only Admin can approve service");
        }
      };



      const handleEventApprove = async (_id) => {
        const updatedEvent = {
          status: "active",
        };
      
        try {
          await axiosSecure.put(`/event-report-close/${_id}`, updatedEvent);
          toast.success("Event Approved");
          setReportedEvents(reportedEvents.filter(event => event._id !== _id));
          
        } catch (err) {
          toast.error(err.response?.data || "Only Admin can approve event");
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
      <DynamicTitlePage title={`Admin | SideGurus`} />

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
              className="cursor-pointer border-y-2 bg-[#001C27] border-white w-full text-lg py-2 px-4 rounded-md   transition relative hover:bg-[#014D48] text-white"
              selectedClassName="bg-dark-teal text-[#014D48]"
              onClick={() => setActiveTab('admins')}
            >
              Manage Admins
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
        {activeTab === 'admins' && (
          <div className="bg-white shadow-md rounded-lg p-6 space-y-2">
            <div className='bg-[#014D48] text-white shadow-sm rounded-2xl'>
            <h2 className="text-3xl  mb-4 text-white text-center font-bold py-4">Add Admin</h2>
            <form onSubmit={handleAdminSubmit} className="space-y-4 mb-10 text-white mx-10 pb-4">
      <label className="block">
        <span  >Name</span>
        <input type="text" name="name" required className="mt-1 block w-full border border-white rounded-lg p-2  " />
      </label>
      <label className="block">
        <span  >Email</span>
        <input type="email" name="email" required className="mt-1 block w-full border border-white rounded-lg p-2  " />
      </label>
      
       
      
      <button type="submit" className="w-full bg-black text-white py-2 rounded-lg hover:bg-[#012F2B] transition">
        Add Admin
      </button>
    </form>
            </div>
            <div >
            <h2 className="text-xl font-semibold mb-4 text-dark-teal">Total : {admins.length} Users Profile</h2>
            {admins.map((profile) => (
  <div key={profile._id} className="flex justify-between p-4 border-b">
    <ProfileCard profile={profile}   removeAdmin={removeAdmin}/>
  </div>
))}
            </div>
          </div>
        )}

        {activeTab === 'manage-users' && (
          <div className="bg-white shadow-md rounded-lg p-6 space-y-2">
            <h2 className="text-xl font-semibold mb-4 text-dark-teal">Total : {profiles.length} Users Profile</h2>
            {profiles.map((profile) => (
  <div key={profile._id} className="flex justify-between p-4 border-b">
    <ProfileCard profile={profile}   removeAdmin={removeAdmin}/>
  </div>
))}
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
