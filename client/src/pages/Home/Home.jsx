import Banner from "../Components/Banner";
import CategorySlider from "../Components/CategorySlider";
import TypeTab from "../Components/TypeTab";
import { Helmet } from 'react-helmet-async';
import CategoryCard from "./CategoryCard";
import LocationCard from "./LocationCard";
import { Link } from 'react-router-dom';  // Corrected import
import { useEffect, useState } from "react";
import axios from 'axios';

const Home = () => {
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);  // Separate loading state for categories
  const [loadingLocations, setLoadingLocations] = useState(true);  // Separate loading state for locations
  const [errorCategories, setErrorCategories] = useState('');  // Separate error state for categories
  const [errorLocations, setErrorLocations] = useState('');  // Separate error state for locations

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('categories.json');
        setCategories(response.data);
        setLoadingCategories(false);
      } catch (err) {
        setErrorCategories('Error loading categories');
        setLoadingCategories(false);
      }
    };

    const fetchLocations = async () => {
      try {
        const response = await axios.get('locations.json');
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

  if (loadingCategories || loadingLocations) return <div>Loading...</div>;
  if (errorCategories) return <div>{errorCategories}</div>;
  if (errorLocations) return <div>{errorLocations}</div>;

  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className='text-center space-y-2 lg:w-4/12 mx-auto my-4'>
        <p className='text-yellow-600'>---Find what interests you the most---</p>
        <h2 className='text-2xl font-bold uppercase border-y-2 py-2'>Browse From Top Categories</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 my-10">
        {
          categories.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))
        }
      </div>

      <div>
        <div className='text-center space-y-2 lg:w-4/12 mx-auto my-4'>
          <p className='text-yellow-600'>---Find what interests you the most---</p>
          <h2 className='text-2xl font-bold uppercase border-y-2 py-2'>Latest Ads</h2>
        </div>
      </div>

      {/* <Banner /> */}
      <TypeTab />

      <div className='text-center space-y-2 lg:w-4/12 mx-auto my-4'>
        <p className='text-yellow-600'>---Find what interests you the most---</p>
        <h2 className='text-2xl font-bold uppercase border-y-2 py-2'>Browse From Top Locations</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 my-10">
        {
          locations.map(location => (
            <LocationCard key={location.id} location={location} />
          ))
        }
      </div>

      <div className='my-4 text-center'>
        <Link to="/post-events">
          <button className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition w-60">
            All Locations
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
