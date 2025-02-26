import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import AdCard from './AdCard';
import { Link } from 'react-router';
import EventCard from './EventCard';
import { useEffect, useState } from "react";
import useAxiosSecure from '../../hooks/useAxiosSecure';
import LoadingSpinner from './LoadingSpinner';
 
const TypeTab = () => {


  
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
    const fetchEvents = async () => {
      try {
        // Fetch categories from the API endpoint using the secure axios instance
        const response = await axiosSecure("/events")
        setEvents(response.data);
        setLoadingEvents(false);
      } catch (err) {
        setErrorEvents('Error loading Events');
        setLoadingEvents(false);
      }
    };
 
    fetchServices();
    fetchEvents();
  }, []);



  
  if (setLoadingServices || setLoadingEvents) return <div className="text-center text-[#014D48]"><LoadingSpinner></LoadingSpinner></div>;


  if (errorServices) return <div className="text-center text-[#FA8649]">{errorServices}</div>;
  if (errorEvents) return <div className="text-center text-[#FA8649]">{errorEvents}</div>;






  return (
    <div className="my-4">
      <Tabs>
        <TabList className="flex justify-center space-x-8 mb-6">
          <Tab
            className="cursor-pointer text-lg py-2 px-4 rounded-md hover:bg-gray-200 transition relative"
            selectedClassName="bg-[#014D48] text-white"
          >
            Services
          </Tab>
          <Tab
            className="cursor-pointer text-lg py-2 px-4 rounded-md hover:bg-gray-200 transition relative"
            selectedClassName="bg-[#014D48] text-white"
          >
            Events
          </Tab>
        </TabList>

        <div className="my-10">
          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {
                services.map(service => (
                  <AdCard key={service.id} service={service} />
                ))
              }
            </div>
            <div className="my-4 text-center">
              <Link to="/all-services">
                <button className="px-6 py-3 bg-[#014D48] text-white rounded-lg shadow-md hover:bg-[#FA8649] transition w-60">
                  All Services
                </button>
              </Link>
            </div>
          </TabPanel>

          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {
              events.map(event => (
                <EventCard key={event.id} event={event} />
              ))

  
            }
            </div>
            <div className="my-4 text-center">
              <Link to="/all-events">
                <button className="px-6 py-3 bg-[#014D48] text-white rounded-lg shadow-md hover:bg-[#FA8649] transition w-60">
                  All Events
                </button>
              </Link>
            </div>
          </TabPanel>
        </div>
      </Tabs>
    </div>
  );
};

export default TypeTab;
