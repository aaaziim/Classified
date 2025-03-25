import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Services from "./Services";
import Events from "./Events";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Breadcrumb from "../Components/Breadcrumb";
import DynamicTitlePage from "../Components/DynamicTitlePage";

const SingleCategoryPage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [category, setCategory] = useState(null);
  useEffect(()=>{
    const handleCategoryFind = async()=>{
      const categoryResponse =  await axiosSecure(`/category/${id}`);
      const name = categoryResponse.data.name;
      setCategory(name)

    }
    handleCategoryFind();
  },[])
 

  return (
  <>
    <div className="space-y-4 mb-6">
 <DynamicTitlePage title={`${category} | SideGurus`} />

      <Breadcrumb
        title={ category}
        subTitle={`Here you can find all ads under ${category} category`} 
 
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
  </>
  );
};

export default SingleCategoryPage;
