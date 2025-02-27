import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Breadcrumb from "../Components/Breadcrumb";
import { useParams } from "react-router";
import LoadingSpinner from "../Components/LoadingSpinner";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import AdCard from "../Components/AdCard";

const SingleCategoryPage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  // State Declarations
  const [category, setCategory] = useState(null);
  const [loadingCategory, setLoadingCategory] = useState(true);
  const [errorCategory, setErrorCategory] = useState("");

  const [services, setServices] = useState([]);
    const [errorServices, setErrorServices] = useState('');
    const [loadingServices, setLoadingServices] = useState(true);
    const [events, setEvents] = useState([]);


  useEffect(() => {
    // Fetch category data
    const fetchCategory = async () => {
      try {
        const response = await axiosSecure(`/category/${id}`);
        setCategory(response.data);
        setLoadingCategory(false);
      } catch (err) {
        setErrorCategory("Error loading category");
        setLoadingCategory(false);
      }
    };

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

     
    fetchServices();

    fetchCategory();
  }, [id]); // Runs when `id` changes

  // Handle loading and error states
  if (loadingCategory) {
    return (
      <div className="text-center text-[#014D48]">
        <LoadingSpinner />
      </div>
    );
  }

  if (errorCategory) {
    return (
      <div className="text-center text-[#FA8649]">
        {errorCategory}
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      <Helmet>
        <title>{category?.name || "Category"}</title>
      </Helmet>

      <div className="space-y-4 mb-6">
        <Breadcrumb
          title={category?.name || "Category"}
          subTitle="Here you can update your service information"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map(service =><AdCard key={service._id} service={service}></AdCard>)}
      </div>
    </div>
  );
};

export default SingleCategoryPage;
