import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../Components/LoadingSpinner";
import Breadcrumb from "../Components/Breadcrumb";
import AdCard from "../Components/AdCard";
import Pagination from "../Components/Pagination";

const Services = ({id}) => {
    const axiosSecure = useAxiosSecure();

  // State Declarations
  const [category, setCategory] = useState(null);
  // const [filter, setFilter] = useState(null);
  const [loadingCategory, setLoadingCategory] = useState(true);
  const [errorCategory, setErrorCategory] = useState("");

  const [services, setServices] = useState([]);
    const [errorServices, setErrorServices] = useState('');
    const [loadingServices, setLoadingServices] = useState(true);
 
     const [page, setPage] = useState(1); 
            const [totalPages, setTotalPages] = useState(1);
            const limit = 3;
      



 useEffect(() => {
  const fetchCategoryAndServices = async () => {
    try {
      // Fetch category data
      const categoryResponse = await axiosSecure(`/category/${id}`);
      setCategory(categoryResponse.data);
      const name = categoryResponse.data.name
      console.log(name)

      // Now that category is set, fetch services
      const serviceResponse = await axiosSecure(`/servicesbycategory?category=${encodeURIComponent(name)}&page=${page}&limit=${limit}`);
      setServices(serviceResponse.data.services);
    setTotalPages(serviceResponse.data.totalPages);
    setLoadingServices(false); 
    } catch (err) {
      setErrorCategory("Error loading category");
      setErrorServices("Error loading services");
    } finally {
      setLoadingCategory(false);
      setLoadingServices(false);
    }
  };

  fetchCategoryAndServices();
}, [id,page]); // Runs when `id` changes




const fetchServicesbySubCategory = async (name) => {
  console.log(name)
  try {
    // Fetch categories from the API endpoint using the secure axios instance
    const response = await axiosSecure(`/servicesbysubcategory?subcategory=${encodeURIComponent(name)}&page=${page}&limit=${limit}`);
    setServices(response.data.services);
    setTotalPages(response.data.totalPages);
    setLoadingServices(false); 
  } catch (err) {
    setErrorServices('Error loading services');
    setLoadingServices(false);
  }
};



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
  if (errorServices) {
    return (
      <div className="text-center text-[#FA8649]">
        {errorServices}
      </div>
    );
  }
  if (loadingServices) {
    return (
      <div className="text-center text-[#014D48]">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <>
 <div className="px-4 py-6">
    <Helmet>
      <title>{category?.name || "Category"}</title>
    </Helmet>

  
    <div className="flex flex-col lg:flex-row  gap-6">
  <div >
  <h2 className="text-lg bg-[#014D48] font-semibold mb-2 cursor-pointer p-3 border border-[#014D48] rounded-lg transition duration-300 hover:bg-[#FA8649]  text-white hover:border-[#FA8649] active:bg-[#014D48] active:text-white text-center">Subcategories</h2>
        <ul className="space-y-2">
          {
            category.subcategories.map(subcategory =>   <li onClick={(e)=>fetchServicesbySubCategory(subcategory.name)} key={subcategory.id}  className="cursor-pointer p-3 border border-[#014D48] rounded-lg transition duration-300 hover:bg-[#FA8649] hover:text-white hover:border-[#FA8649] active:bg-[#014D48] active:text-white">
            {subcategory.name}
              </li>)
          }
   
         
           
        
        </ul>
  </div>

  {
    totalPages >0 ?<div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
    {services.map(service =><AdCard key={service._id} service={service}></AdCard>)}
  </div> : <p>No Service Found</p>
  }

    
   
    </div>

   
  </div>

<Pagination
      page={page}
      setPage={setPage} 
      totalPages={totalPages}
    />
    </>
   
  )
}

export default Services
