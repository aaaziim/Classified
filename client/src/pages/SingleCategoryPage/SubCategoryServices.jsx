import React, { useEffect, useState } from 'react';
import Pagination from '../Components/Pagination';
import AdCard from '../Components/AdCard';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const SubCategoryServices = ({ subcategory }) => {
  const axiosSecure = useAxiosSecure();

  const [services, setServices] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 3;

  useEffect(() => {
    const fetchServices = async () => {
      if (!subcategory) return; // ✅ Prevent fetching if subcategory is missing

      try {
        const servicesResponse = await axiosSecure(
          `/servicesbysubcategory?subcategory=${subcategory}&page=${page}&limit=${limit}`
        );
        setServices(servicesResponse.data.services);
        setTotalPages(servicesResponse.data.totalPages);
      } catch (error) {
        console.error('Error fetching subcategory:', error);
      }
    };

    fetchServices();
  }, [subcategory, page]); // ✅ Added `subcategory`

  return (
    <div>
    {
        totalPages >1 ?  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
        {services.map((service) => (
          <AdCard key={service._id} service={service} />
        ))}
      </div>:<p>No Service Found</p>
  
    }

      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default SubCategoryServices;
