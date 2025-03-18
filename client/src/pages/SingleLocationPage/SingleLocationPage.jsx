import React, { useEffect, useState } from "react";
import Breadcrumb from "../Components/Breadcrumb";
import AdCard from "../Components/AdCard";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../Components/LoadingSpinner";
import { Link } from "react-router";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Services from "./Services";
import Events from "./Events";
import DynamicTitlePage from "../Components/DynamicTitlePage";
const SingleLocationPage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const [locationName, setLocationName] = useState("");

  useEffect(() => {
    const fetchLocation = async () => {
      const locationResponse = await axiosSecure(`/location/${id}`);
      setLocationName(locationResponse.data.name);
    };

    fetchLocation();
  }, [id]); // Runs when `id` changes

  return (
    <div className="px-4 py-6">
       <DynamicTitlePage title={`${locationName} | SideGurus`} />

      <div className="space-y-4 mb-6">
        <Breadcrumb
          title={locationName}
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
            <Services id={id}></Services>
          </TabPanel>
        </div>
        <div className="my-10">
          <TabPanel>
            <Events id={id}></Events>
          </TabPanel>
        </div>
      </Tabs>
    </div>
  );
};

export default SingleLocationPage;
