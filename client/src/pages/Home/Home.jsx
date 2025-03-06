import Banner from "../Components/Banner";
import CategorySlider from "../Components/CategorySlider";
import TypeTab from "../Components/TypeTab";
import { Helmet } from 'react-helmet-async';
import CategoryCard from "./CategoryCard";
import LocationCard from "./LocationCard";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from 'axios';
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../Components/LoadingSpinner";
import useCategory from "../../hooks/useCategory";
import useLocations from "../../hooks/useLocations";
import SectionHeading from "../Components/SectionHeading";

const Home = () => {
 
  const [categories, loadingCategories, errorCategories ] = useCategory();
   const [locations, loadingLocations,errorLocations ] = useLocations()
   const serviceCategories = [
    "Beauty & Personal Care Services",
    "Health & Wellness",
    "Event Services",
    "Home Improvement & Repair Services",
    "Pet Services",
    "Educational & Tutoring Services",
    "Cleaning & Maintenance Services"
  ];
 




  if (loadingCategories || loadingLocations) return <div className="text-center text-[#014D48]"><LoadingSpinner></LoadingSpinner></div>;
  if (errorCategories) return <div className="text-center text-[#FA8649]">{errorCategories}</div>;
  if (errorLocations) return <div className="text-center text-[#FA8649]">{errorLocations}</div>;

  return (
    <div className="text-[#001C27]">
      <Helmet>
        <title>Home</title>
      </Helmet>

      <Banner />

      <div className="my-10">
      <SectionHeading
      heading={"Browse From Top Categories"}
      subHeading={"Find what interests you the most"}
      ></SectionHeading>
  
  
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-10">
        {categories.map(category => (
          serviceCategories.includes(category.name) &&  <CategoryCard key={category.id} category={category} />
         
        ))}
        
      </div>

      <Link className="flex justify-center" to="/all-categories">
                <button className="px-6 py-3 bg-[#014D48] text-white rounded-lg shadow-md hover:bg-[#FA8649] transition w-60">
                  All Categories
                </button>
        </Link>
        </div>

      <SectionHeading
      heading={"Latest Ads"}
      subHeading={"Find what interests you the most"}
      ></SectionHeading>

      <TypeTab />

      <SectionHeading
      heading={"Browse From Top Location"}
      subHeading={"Find what interests you the most"}
      ></SectionHeading>


 
      <div className="  my-10">

      <LocationCard key={location.id} location={locations[0]} />
      </div>

   
 
    </div>
  );
}

export default Home;