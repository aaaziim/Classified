import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../Components/Breadcrumb';
import { useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import AdCard from '../Components/AdCard';
import EventCard from '../Components/EventCard';
import Pagination from '../Components/Pagination';

const SingleLocationPage = () => {
  const { stateName } = useParams(); // Get state from URL
  const axiosSecure = useAxiosSecure();

  // State for Services
  const [services, setServices] = useState([]);
  const [servicePage, setServicePage] = useState(1);
  const [serviceTotalPages, setServiceTotalPages] = useState(1);

  // State for Events
  const [events, setEvents] = useState([]);
  const [eventPage, setEventPage] = useState(1);
  const [eventTotalPages, setEventTotalPages] = useState(1);

  const limit = 3; // Number of items per page

  useEffect(() => {
    const fetchStateServices = async () => {
      try {
        const response = await axiosSecure(
          `/servicesbystate?state=${stateName}&page=${servicePage}&limit=${limit}`
        );
        setServices(response.data.services || []);
        setServiceTotalPages(response.data.totalPages || 1);
      } catch (error) {
        console.error('Error fetching services by state:', error);
      }
    };

    const fetchStateEvents = async () => {
      try {
        const response = await axiosSecure(
          `/eventsbystate?state=${stateName}&page=${eventPage}&limit=${limit}`
        );
        setEvents(response.data.events || []);
        setEventTotalPages(response.data.totalPages || 1);
      } catch (error) {
        console.error('Error fetching events by state:', error);
      }
    };

    fetchStateServices();
    fetchStateEvents();
  }, [stateName, servicePage, eventPage]); // ✅ Dependency array includes page numbers

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

        {/* Services Section */}
        <div className="my-10">
          <TabPanel>
            {services.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
                  {services.map((service) => (
                    <AdCard key={service._id} service={service} />
                  ))}
                </div>
                {serviceTotalPages > 1 && (
                  <Pagination 
                    page={servicePage} 
                    setPage={setServicePage} 
                    totalPages={serviceTotalPages} 
                  />
                )}
              </>
            ) : (
              <p className="text-center text-gray-500">No Services Found</p>
            )}
          </TabPanel>
        </div>

        {/* Events Section */}
        <div className="my-10">
          <TabPanel>
            {events.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
                  {events.map((event) => (
                    <EventCard key={event._id} event={event} />
                  ))}
                </div>
                {eventTotalPages > 1 && (
                  <Pagination 
                    page={eventPage} 
                    setPage={setEventPage} 
                    totalPages={eventTotalPages} 
                  />
                )}
              </>
            ) : (
              <p className="text-center text-gray-500">No Events Found</p>
            )}
          </TabPanel>
        </div>
      </Tabs>
    </div>
  );
};

export default SingleLocationPage;
