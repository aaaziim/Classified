import React, { useEffect, useState } from "react";

import AdCard from "../Components/AdCard";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../Components/LoadingSpinner";
import Pagination from "../Components/Pagination";
import EventCard from "../Components/EventCard";
import { Link } from "react-router";

const Events = ({ id }) => {
  const axiosSecure = useAxiosSecure();

  // State Declarations
  const [location, setLocation] = useState(null);
  const [stateIndex, setStateIndex] = useState(null);

  const [loadingLocation, setLoadingLocation] = useState(true);
  const [errorLocation, setErrorLocation] = useState("");

  const [events, setEvents] = useState([]);
  const [errorEvents, setErrorEvents] = useState("");
  const [loadingEvents, setLoadingEvents] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 12;

  useEffect(() => {
    const fetchLocationAndEvents = async () => {
      try {
        // Fetch location data
        const locationResponse = await axiosSecure(`/location/${id}`);
        setLocation(locationResponse.data);
        const name = locationResponse.data.name;
        

        // Now that location is set, fetch events
        const eventResponse = await axiosSecure(
          `/eventsbycountry?country=${encodeURIComponent(
            name
          )}&page=${page}&limit=${limit}`
        );
        setEvents(eventResponse.data.events);
        setTotalPages(eventResponse.data.totalPages);
      } catch (err) {
        setErrorLocation("Error loading location");
        setErrorEvents("Error loading events");
      } finally {
        setLoadingLocation(false);
        setLoadingEvents(false);
      }
    };

    fetchLocationAndEvents();
  }, [id, page]); // Runs when `id` changes

  const fetchEventsbyState = async (name) => {
 
    try {
      // Fetch categories from the API endpoint using the secure axios instance
      const response = await axiosSecure(
        `/eventsbystate?state=${encodeURIComponent(
          name
        )}&page=${page}&limit=${limit}`
      );
      setEvents(response.data.events);
      setTotalPages(response.data.totalPages);
      setLoadingEvents(false);
    } catch (err) {
      setErrorEvents("Error loading events");
      setLoadingEvents(false);
    }
  };

  const fetchEventsbyCity = async (name) => {
    
    try {
      // Fetch categories from the API endpoint using the secure axios instance
      const response = await axiosSecure(
        `/eventsbycity?city=${encodeURIComponent(name)}`
      );
      setEvents(response.data);
      setLoadingEvents(false);
    } catch (err) {
      setErrorEvents("Error loading events");
      setLoadingEvents(false);
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
  if (errorEvents) {
    return <div className="text-center text-[#FA8649]">{errorEvents}</div>;
  }
  if (loadingEvents) {
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
                States
              </h2> */}
              <select
                onChange={(e) => {
                  fetchEventsbyState(e.target.value);
                  setStateIndex(e.target.selectedIndex - 1);
                }}
                className="p-3 border bg-[#014D48] text-white   rounded-lg transition duration-300 hover:bg-[#FA8649] hover:text-white focus:outline-none w-full"
              >
                <option value="">Filter By State</option>
                {location.state?.map((st, index) => (
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
                  onChange={(e) => fetchEventsbyCity(e.target.value)}
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
              <Link className="flex justify-center my-4" to="/all-locations">
          <button className="px-6 py-3 bg-[#014D48] text-white rounded-lg shadow-md hover:bg-[#FA8649] transition md:w-40">
           All Locations
          </button>
        </Link>
        </div>
        {totalPages > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4 flex-1">
            {events?.map((event, index) => (
              <EventCard key={index} event={event}></EventCard>
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

export default Events;
