import React, { useEffect, useState } from "react";
import Breadcrumb from "../../Components/Breadcrumb";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Components/LoadingSpinner";
import EventCard from "./EventCard";

import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import DynamicTitlePage from "../../Components/DynamicTitlePage";
const MyEvents = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);

  const [loadingEvents, setLoadingEvents] = useState(true);

  const [errorEvents, setErrorEvents] = useState("");

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Fetch categories from the API endpoint using the secure axios instance
        const response = await axiosSecure(`eventsbyauser`);
        setEvents(response.data);
        setLoadingEvents(false);
      } catch (err) {
        setErrorEvents("Error loading events");
        setLoadingEvents(false);
      }
    };

    fetchEvents();
  }, [events]);

  if (loadingEvents)
    return (
      <div className="text-center text-[#014D48]">
        <LoadingSpinner></LoadingSpinner>
      </div>
    );

  if (errorEvents)
    return <div className="text-center text-[#FA8649]">{errorEvents}</div>;

  const handleDelete = async (_id) => {
    // Show confirmation modal
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    // If confirmed, send delete request to API
    if (result.isConfirmed) {
      try {
        const response = await axiosSecure.delete(`/event/${_id}`);
        setEvents(events.filter((event) => event._id !== _id));

        if (response.status === 200) {
          Swal.fire("Deleted!", "Your event has been deleted.", "success");
        } else {
          Swal.fire(
            "Error!",
            "Something went wrong, please try again.",
            "error"
          );
        }
      } catch (error) {
        Swal.fire("Error!", "Something went wrong, please try again.", "error");
      }
    }
  };

  return (
    <div className="mb-6">
       <DynamicTitlePage title={`My Events | SideGurus`} />
      <div className="space-y-4 mb-6">
        <Breadcrumb
          title="My Events"
          subTitle="Here are the events you have listed."
        />
      </div>
<div className="px-4">
  
{events?.length>0 ? (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-[#014D48]">
          <div className="space-y-6">
            {events?.map((event, index) => (
              <EventCard
                key={index}
                event={event}
                handleDelete={handleDelete}
              ></EventCard>
            ))}
          </div>
        </div>
      ):<p>No Event Posted</p>}
</div>
    </div>
  );
};

export default MyEvents;
