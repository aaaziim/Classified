import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Breadcrumb from '../Components/Breadcrumb'
import AdCard from '../Components/AdCard'
import { useParams } from 'react-router'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import LoadingSpinner from '../Components/LoadingSpinner'

const SingleLocationPage = () => {
  const { id } = useParams(); 
  const axiosSecure = useAxiosSecure();

  // State Declarations
  const [location, setLocation] = useState(null);
  const [stateIndex, setStateIndex] = useState(null);
 
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [errorLocation, setErrorLocation] = useState("");

  const [services, setServices] = useState([]);
    const [errorServices, setErrorServices] = useState('');
    const [loadingServices, setLoadingServices] = useState(true);
  

 useEffect(() => {
  const fetchLocationAndServices = async () => {
    try {
      // Fetch location data
      const locationResponse = await axiosSecure(`/location/${id}`);
      setLocation(locationResponse.data);
      const name = locationResponse.data.name
      console.log(name)

      // Now that location is set, fetch services
      const serviceResponse = await axiosSecure(`/servicesbycountry?country=${encodeURIComponent(name)}`);
      setServices(serviceResponse.data);
    } catch (err) {
      setErrorLocation("Error loading location");
      setErrorServices("Error loading services");
    } finally {
      setLoadingLocation(false);
      setLoadingServices(false);
    }
  };

  fetchLocationAndServices();
}, [id]); // Runs when `id` changes


const fetchServicesbyState = async (name) => {
  console.log(name)
  try {
    // Fetch categories from the API endpoint using the secure axios instance
    const response = await axiosSecure(`/servicesbystate?state=${encodeURIComponent(name)}`);
    setServices(response.data);
    setLoadingServices(false);
  } catch (err) {
    setErrorServices('Error loading services');
    setLoadingServices(false);
  }
};

const fetchServicesbyCity = async (name) => {
  console.log(name)
  try {
    // Fetch categories from the API endpoint using the secure axios instance
    const response = await axiosSecure(`/servicesbycity?city=${encodeURIComponent(name)}`);
    setServices(response.data);
    setLoadingServices(false);
  } catch (err) {
    setErrorServices('Error loading services');
    setLoadingServices(false);
  }
};






  // Handle loading and error states
  if (loadingLocation) {
    return (
      <div className="text-center text-[#014D48]">
        <LoadingSpinner />
      </div>
    );
  }

  if (errorLocation) {
    return (
      <div className="text-center text-[#FA8649]">
        {errorLocation}
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
    <div className="px-4 py-6">
      <Helmet>
        <title>Location</title>
      </Helmet>

      <div className="space-y-4 mb-6">
        <Breadcrumb 
          title={location.name}
          subTitle="Here you can update your service information"
        />
      </div>

      <div className="flex justify-between gap-6">
    <div >
{
  location?.state && <>    <h2 className="text-lg bg-[#014D48] font-semibold mb-2 cursor-pointer p-3 border border-[#014D48] rounded-lg transition duration-300 hover:bg-[#FA8649]  text-white hover:border-[#FA8649] active:bg-[#014D48] active:text-white">States</h2>
  <select  onChange={(e) => {
    fetchServicesbyState(e.target.value)
    setStateIndex(e.target.selectedIndex - 1)
  }}  className="p-3 border border-[#014D48] rounded-lg transition duration-300 hover:bg-[#FA8649] hover:text-white focus:outline-none">
  <option  value="">
  Select State
</option>
{location.state.map((st,index) => (
<option   key={index}  value={st.name}>
  {st.name}
</option>
))}

</select></>
}
{location?.state && stateIndex !== undefined && location.state[stateIndex] && (
  <div className='my-4'>
    <h2 className="text-lg bg-[#014D48] font-semibold mb-2 cursor-pointer p-3 border border-[#014D48] rounded-lg transition duration-300 hover:bg-[#FA8649] text-white hover:border-[#FA8649] active:bg-[#014D48] active:text-white">
      Cities
    </h2>

    <select onChange={(e)=> fetchServicesbyCity(e.target.value)} className="p-3 border border-[#014D48] rounded-lg transition duration-300 hover:bg-[#FA8649] hover:text-white focus:outline-none">
    <option  value="">
  Select City
</option>
      {location.state[stateIndex]?.cities?.map((city, index) => (
        <option key={index} value={city.name}>
          {city.name}
        </option>
      ))}
    </select>
  </div>
)}

    </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
        {services.map(service =><AdCard key={service._id} service={service}></AdCard>)}
        {services.map(service =><AdCard key={service._id} service={service}></AdCard>)}
        {services.map(service =><AdCard key={service._id} service={service}></AdCard>)}
      </div>
      </div>

    </div>
  )
}

export default SingleLocationPage
