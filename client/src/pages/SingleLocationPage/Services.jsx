import React, { useEffect, useState } from "react";

import AdCard from "../Components/AdCard";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../Components/LoadingSpinner";
import Pagination from "../Components/Pagination";

const Services = ({ id }) => {
  const axiosSecure = useAxiosSecure();

  // State Declarations
  const [location, setLocation] = useState(null);
  const [stateIndex, setStateIndex] = useState(null);

  const [loadingLocation, setLoadingLocation] = useState(true);
  const [errorLocation, setErrorLocation] = useState("");

  const [services, setServices] = useState([]);
  const [errorServices, setErrorServices] = useState("");
  const [loadingServices, setLoadingServices] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 3;

  useEffect(() => {
    const fetchLocationAndServices = async () => {
      try {
        // Fetch location data
        const locationResponse = await axiosSecure(`/location/${id}`);
        setLocation(locationResponse.data);
        const name = locationResponse.data.name;
        console.log(name);

        // Now that location is set, fetch services
        const serviceResponse = await axiosSecure(
          `/servicesbycountry?country=${encodeURIComponent(
            name
          )}&page=${page}&limit=${limit}`
        );
        setServices(serviceResponse.data.services);
        setTotalPages(serviceResponse.data.totalPages);
      } catch (err) {
        setErrorLocation("Error loading location");
        setErrorServices("Error loading services");
      } finally {
        setLoadingLocation(false);
        setLoadingServices(false);
      }
    };

    fetchLocationAndServices();
  }, [id, page]); // Runs when `id` changes

  const fetchServicesbyState = async (name) => {
    console.log(name);
    try {
      // Fetch categories from the API endpoint using the secure axios instance
      const response = await axiosSecure(
        `/servicesbystate?state=${encodeURIComponent(
          name
        )}&page=${page}&limit=${limit}`
      );
      setServices(response.data.services);
      setTotalPages(response.data.totalPages);
      setLoadingServices(false);
    } catch (err) {
      setErrorServices("Error loading services");
      setLoadingServices(false);
    }
  };

  const fetchServicesbyCity = async (name) => {
    console.log(name);
    try {
      // Fetch categories from the API endpoint using the secure axios instance
      const response = await axiosSecure(
        `/servicesbycity?city=${encodeURIComponent(name)}`
      );
      setServices(response.data);
      setLoadingServices(false);
    } catch (err) {
      setErrorServices("Error loading services");
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
    return <div className="text-center text-[#FA8649]">{errorLocation}</div>;
  }
  if (errorServices) {
    return <div className="text-center text-[#FA8649]">{errorServices}</div>;
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
      <div className="flex flex-col md:flex-row gap-6">
        <div>
          {location?.state && (
            <>
              {" "}
              {/* <h2 className="text-lg bg-[#014D48] font-semibold mb-2 cursor-pointer p-3 border border-[#014D48] rounded-lg transition duration-300 hover:bg-[#FA8649]  text-white hover:border-[#FA8649] active:bg-[#014D48] active:text-white">
                Filter By States
              </h2> */}
              <select
                onChange={(e) => {
                  fetchServicesbyState(e.target.value);
                  setStateIndex(e.target.selectedIndex - 1);
                }}
                className="p-3 border bg-[#014D48] text-white   rounded-lg transition duration-300 hover:bg-[#FA8649] hover:text-white focus:outline-none w-full"
              >
                <option value="">Filter By State</option>
                {location?.state?.map((st, index) => (
                  <option key={index} value={st.name}>
                    {st.name}
                  </option>
                ))}
              </select>
            </>
          )}
          {location?.state &&
            stateIndex !== undefined &&
            location.state[stateIndex] && (
              <div className="my-4">
               

                <select
                  onChange={(e) => fetchServicesbyCity(e.target.value)}
                    className="p-3 border bg-[#014D48] text-white   rounded-lg transition duration-300 hover:bg-[#FA8649] hover:text-white focus:outline-none w-full"
                >
                  <option value="">Filter By City</option>
                  {location.state[stateIndex]?.cities?.map((city, index) => (
                    <option key={index} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
        </div>
        {totalPages > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4 flex-1">
            {services?.map((service, index) => (
              <AdCard key={index} service={service}></AdCard>
            ))}
          </div>
        ) : (
          <p>No Service Found</p>
        )}
      </div>
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </>
  );
};

export default Services;
