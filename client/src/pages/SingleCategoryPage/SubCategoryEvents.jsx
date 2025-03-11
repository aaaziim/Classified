import React, { useEffect, useState } from 'react';
import Pagination from '../Components/Pagination';
import AdCard from '../Components/AdCard';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import EventCard from '../Components/EventCard';

const SubCategoryEvents = ({ subcategory }) => {
  const axiosSecure = useAxiosSecure();

  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 3;

  useEffect(() => {
    const fetchEvents = async () => {
      if (!subcategory) return; // ✅ Prevent fetching if subcategory is missing

      try {
        const eventsResponse = await axiosSecure(
          `/eventsbysubcategory?subcategory=${subcategory}&page=${page}&limit=${limit}`
        );
        setEvents(eventsResponse.data.events);
        setTotalPages(eventsResponse.data.totalPages);
      } catch (error) {
        console.error('Error fetching subcategory:', error);
      }
    };

    fetchEvents();
  }, [subcategory, page]); // ✅ Added `subcategory`

  return (
    <div>
        {
             totalPages >1 ? <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
             {events?.map((event) => (
               <EventCard key={event._id} event={event} />
             ))}
           </div>:<p>No Events Found</p>
  
        }
     

      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default SubCategoryEvents;
