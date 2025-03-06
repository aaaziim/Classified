import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Services from "./Services";
import Events from "./Events";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Breadcrumb from "../Components/Breadcrumb";

import AdCard from "../Components/AdCard";
import EventCard from "../Components/EventCard";

const SingleSubCategoryPage = () => {
  const { id, subId  } = useParams();
  const axiosSecure = useAxiosSecure();
  const [subcategory, setSubcategory] = useState("");
  const [services, setServices] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchSubCategory = async () => {
      try {
        const response = await axiosSecure(`/category/${id}`);
        const categoryData = response.data;
        
        // Find the matching subcategory by subId
        const foundSubcategory = categoryData.subcategories.find(
          (sub) => sub.id.toString() === subId
        );

        if (foundSubcategory) {
          setSubcategory(foundSubcategory.name);
          
          // Fetch services related to this subcategory
          const servicesResponse = await axiosSecure(`/servicesbysubcategory?subcategory=${foundSubcategory.name}`);
          setServices(servicesResponse.data);
          const eventResponse = await axiosSecure(`/eventsbysubcategory?subcategory=${foundSubcategory.name}`);
          setEvents(eventResponse.data);
        } else {
          setSubcategory("Unknown Subcategory");
        }
      } catch (error) {
        console.error("Error fetching subcategory:", error);
      }
    };

    fetchSubCategory();
  }, [id, subId, axiosSecure]);




 
  return (
  <>
    <div className="space-y-4 mb-6">
      <Breadcrumb
        title={ subcategory}
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
  </>
  );
};

export default SingleSubCategoryPage;
