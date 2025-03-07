import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
 
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Breadcrumb from "../Components/Breadcrumb";

import AdCard from "../Components/AdCard";
import EventCard from "../Components/EventCard";
import Pagination from "../Components/Pagination";
import SubCategoryEvents from "./SubCategoryEvents";
import SubCategoryServices from "./SubCategoryServices";

const SingleSubCategoryPage = () => {
  const { id, subId  } = useParams();
  const axiosSecure = useAxiosSecure();
  const [subcategory, setSubcategory] = useState("");
  const [services, setServices] = useState([]);
  const [events, setEvents] = useState([]);

       const [page, setPage] = useState(1); 
       const [pageEvent, setPageEvent] = useState(1); 
       const [totalPages, setTotalPages] = useState(1);
       const [totalEventPages, setTotalEventPages] = useState(1);
       const limit = 3;

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
        } else {
          setSubcategory("Unknown Subcategory");
        }
      } catch (error) {
        console.error("Error fetching subcategory:", error);
      }
    };

    fetchSubCategory();
  }, [id, subId, axiosSecure, page, pageEvent]);




 
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
            <SubCategoryServices
              subcategory={subcategory}
              >
            </SubCategoryServices>
          </TabPanel>
        </div>
        <div className="my-10">
          <TabPanel>
            <SubCategoryEvents subcategory={subcategory}
            ></SubCategoryEvents>
          </TabPanel>
        </div>

       
      </Tabs>
  </>
  );
};

export default SingleSubCategoryPage;
