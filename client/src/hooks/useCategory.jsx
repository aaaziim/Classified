import React, { useEffect, useState } from 'react'
import useAxiosSecure from './useAxiosSecure';
 

const useCategory = () => {
    const axiosSecure = useAxiosSecure();
      const [categories, setCategories] = useState([]);
      const [loadingCategories, setLoadingCategories] = useState(true);
      const [errorCategories, setErrorCategories] = useState('');
      
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
        fetchCategories()
    },[])
  
      
  return [categories, loadingCategories, errorCategories ]
}

export default useCategory;
