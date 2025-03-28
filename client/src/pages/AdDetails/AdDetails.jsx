import React, { useEffect, useState } from "react";
import { MdOutlineDateRange } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { FaLocationArrow } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import { MdCategory } from "react-icons/md";
import SellerInfo from "./SellerInfo";
import CategorySidebar from "./CategorySidebar";

import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../Components/LoadingSpinner";
import { MdReportProblem } from "react-icons/md";
import toast from "react-hot-toast";

import GalleryImages from "../Components/GalleryImages";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import DynamicTitlePage from "../Components/DynamicTitlePage";


const AdDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState([]);
  const [errorService, setErrorService] = useState("");
  const [loadingService, setLoadingService] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchService = async () => {
      try {
        // Fetch categories from the API endpoint using the secure axios instance
        const response = await axiosSecure(`/service/${id}`);
        setService(response.data);
        setLoadingService(false);
      } catch (err) {
        setErrorService("Error loading services");
        setLoadingService(false);
      }
    };

    fetchService();
  }, []);

  if (loadingService)
    return (
      <div className="text-center text-[#014D48]">
        <LoadingSpinner></LoadingSpinner>
      </div>
    );
  if (errorService)
    return <div className="text-center text-[#FA8649]">{errorService}</div>;

  const {
    title,
    posted,
    price,
    country,
    state,
    city,
    category,
    subcategory,
    description,
    author,
    images,
  } = service;

  const handleServiceReport = async () => {
    const updatedService = {
      status: "reported",
    };

    try {
      await axiosSecure.put(`/service-report/${id}`, updatedService);
      toast.success("Service reported");
    } catch (err) {
      toast.error(err.response?.data || "Error reporting service");
    }
  };
 
 
  return (
    <>
      <DynamicTitlePage title={`${title} | SideGurus`} />

      <div className="flex flex-col justify-center md:flex-row gap-4 my-10 px-4">

        <div className="w-full md:w-2/3 bg-[#FFE5D5] p-4 space-y-4 rounded-2xl">
        <Carousel
        infiniteLoop={true}
        className="rounded-lg"
        showThumbs={false}
        showStatus={false}
        showIndicators={true}
        useKeyboardArrows={true}
      >
      
        {images?.map((image, index) => (
  <GalleryImages key={index} image={image}></GalleryImages>
  
))}
</Carousel>

          <div className="flex gap-2 justify-between">
            <div>
              <h1 className="text-2xl text-[#001C27] font-bold">{title}</h1>
              <p className="flex items-center gap-2 text-[#001C27]">
                <FaLocationArrow />
                {(city || state || country) && (
                  <span>
                    {[city, state, country].filter(Boolean).join(", ")}
                  </span>
                )}{" "}
              </p>
            </div>
            <p
              onClick={handleServiceReport}
              className="flex  items-center gap-2 btn btn-warning"
            >
              <MdReportProblem />
              Report Spam
            </p>
          </div>
          <div className="flex justify-between gap-4">
            <p className="flex items-center gap-2 text-[#014D48]">
              <MdOutlineDateRange />
              <span><p>{new Date(posted).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </span>
            </p>
            <p
              className="bg-[#FA8649] max-w-fit px-4 py-2 text-white font-bold relative"
              style={{
                clipPath: "polygon(0 0, 100% 0, 90% 50%, 100% 100%, 0 100%)",
              }}
            >
              Price: ${price}
            </p>
          </div>

          <div className="">
            <p className="flex items-center gap-2 text-[#001C27]">
              <BiCategoryAlt />
              <span>
                {category} | {subcategory}
              </span>
            </p>
        
          </div>
          <p className="text-2xl font-semibold text-[#001C27]">Description:</p>
          <p className="text-xl text-justify text-[#001C27]">
            {description}
            {/* Add the full description here */}
          </p>
        </div>
        <div className="space-y-10 w-full md:w-1/3">
          <SellerInfo author={author} />
          <CategorySidebar category={category} />
        </div>
      </div>
    </>
  );
};

export default AdDetails;
