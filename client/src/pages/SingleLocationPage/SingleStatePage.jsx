import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Breadcrumb from '../Components/Breadcrumb'
 
import { useParams } from 'react-router'
import useAxiosSecure from '../../hooks/useAxiosSecure'
 
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
 
import AdCard from '../Components/AdCard'
import EventCard from '../Components/EventCard'
 
 
const SingleLocationPage = () => {

  const { stateName } = useParams(); // Get state from URL
  const axiosSecure = useAxiosSecure();
  const [services, setServices] = useState([]);
  const [events, setEvents] = useState([]);

 

 

    useEffect(() => {
      const fetchStateServices = async () => {
        try {
          const response = await axiosSecure(`/servicesbystate?state=${stateName}`);
          setServices(response.data.services);
        } catch (error) {
          console.error("Error fetching services by state:", error);
        }
      };
      const fetchStateEvents = async () => {
        try {
          const response = await axiosSecure(`/eventsbystate?state=${stateName}`);
          setEvents(response.data.events);
        } catch (error) {
          console.error("Error fetching events by state:", error);
        }
      };
      fetchStateEvents()
  
      fetchStateServices();
    }, [stateName, axiosSecure]);




  return (
    <div className="px-4 py-6">
      <Helmet>
        <title>{stateName}</title>
      </Helmet>

      <div className="space-y-4 mb-6">
        <Breadcrumb 
          title={stateName}
          subTitle="Here you can update your service information"
        />
      </div>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
          {services.map(service =><AdCard key={service._id} service={service}></AdCard>)}
          </div>
          </TabPanel>
        </div>
        <div className="my-10">
          <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
          {events.map(event =><EventCard key={event._id} event={event}></EventCard>)}
          </div>
          </TabPanel>
        </div>
      </Tabs>

      

    </div>
  )
}

export default SingleLocationPage
