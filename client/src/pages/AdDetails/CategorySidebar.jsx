import React, { useEffect, useState } from 'react'
import LoadingSpinner from '../Components/LoadingSpinner';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Link } from 'react-router';

const CategorySidebar = ({category}) => {

  const axiosSecure = useAxiosSecure()

  const [scategory, setSCategory] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [errorCategories, setErrorCategories] = useState('');


    useEffect(() => {
      const fetchCategory = async () => {
        try {
          // Fetch categories from the API endpoint using the secure axios instance

          
          const response = await axiosSecure(`/singlecategory?category=${encodeURIComponent(category)}`);

          
          setSCategory(response.data);
          setLoadingCategories(false);
        } catch (err) {
          setErrorCategories('Error loading categories');
          setLoadingCategories(false);
        }
      };
  
      
  
      fetchCategory();
  
    }, []);
  
    if (loadingCategories) return <div className="text-center text-[#014D48]"><LoadingSpinner></LoadingSpinner></div>;
    if (errorCategories) return <div className="text-center text-[#FA8649]">{errorCategories}</div>;
   

    
  
  
   
  return (
    <div>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h3 className="text-lg font-semibold border-b pb-2 mt-6 text-[#014D48]">Related Categories</h3>
        <ul className="mt-3 space-y-2">
         {
          scategory?.subcategories?.map(sub => (
            <Link to={`/category/${scategory._id}`} key={sub.id}> 
            <li className="cursor-pointer p-1 w-full mb-1 border border-[#014D48] rounded-lg transition duration-300 hover:bg-[#FA8649] hover:text-white hover:border-[#FA8649] active:bg-[#014D48] active:text-white">
              
            
                {sub.name}
             
            </li>
            </Link>
          ))
         }
        
        </ul>
      </div>
    </div>
  )
}

export default CategorySidebar
