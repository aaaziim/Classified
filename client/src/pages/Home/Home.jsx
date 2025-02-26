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

const Home = () => {
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingLocations, setLoadingLocations] = useState(true);
  const [errorCategories, setErrorCategories] = useState('');
  const [errorLocations, setErrorLocations] = useState('');
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Fetch categories from the API endpoint using the secure axios instance
        const response = await axiosSecure("/categories")
        setCategories(response.data);
        setLoadingCategories(false);
      } catch (err) {
        setErrorCategories('Error loading categories');
        setLoadingCategories(false);
      }
    };

    const fetchLocations = async () => {
      try {
        const response = await axiosSecure("/locations")
        
        setLocations(response.data);
        setLoadingLocations(false);
      } catch (err) {
        setErrorLocations('Error loading locations');
        setLoadingLocations(false);
      }
    };

    fetchCategories();
    fetchLocations();
  }, []);

  if (loadingCategories || loadingLocations) return <div className="text-center text-[#014D48]"><LoadingSpinner></LoadingSpinner></div>;
  if (errorCategories) return <div className="text-center text-[#FA8649]">{errorCategories}</div>;
  if (errorLocations) return <div className="text-center text-[#FA8649]">{errorLocations}</div>;

  return (
    <div className="text-[#001C27]">
      <Helmet>
        <title>Home</title>
      </Helmet>

      <Banner />

      <div className='text-center space-y-2 lg:w-4/12 mx-auto my-4'>
        <p className='text-[#FA8649]'>---Find what interests you the most---</p>
        <h2 className='text-2xl font-bold uppercase border-y-2 py-2 text-[#014D48] border-[#FFE5D5]'>Browse From Top Categories</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 my-10">
        {categories.map(category => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>

      <div className='text-center space-y-2 lg:w-4/12 mx-auto my-4'>
        <p className='text-[#FA8649]'>---Find what interests you the most---</p>
        <h2 className='text-2xl font-bold uppercase border-y-2 py-2 text-[#014D48] border-[#FFE5D5]'>Latest Ads</h2>
      </div>

      <TypeTab />

      <div className='text-center space-y-2 lg:w-4/12 mx-auto my-4'>
        <p className='text-[#FA8649]'>---Find what interests you the most---</p>
        <h2 className='text-2xl font-bold uppercase border-y-2 py-2 text-[#014D48] border-[#FFE5D5]'>Browse From Top Locations</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 my-10">
        {locations.map(location => (
          <LocationCard key={location.id} location={location} />
        ))}
      </div>

      {/* <div className='my-4 text-center'>
        <Link to="/post-events">
          <button className="px-6 py-3 bg-[#014D48] text-white rounded-lg shadow-md hover:bg-[#012F2B] transition w-60">
            All Locations
          </button>
        </Link>
      </div> */}
    </div>
  );
}

export default Home;