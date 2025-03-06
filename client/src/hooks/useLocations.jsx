import React, { useEffect, useState } from 'react'
import useAxiosSecure from './useAxiosSecure';

const useLocations = () => {
    const axiosSecure = useAxiosSecure();
      const [locations, setLocations] = useState([]);
      const [loadingLocations, setLoadingLocations] = useState(true);
      const [errorLocations, setErrorLocations] = useState('');
    
      useEffect(() => {
        const fetchLocations = async () => {
          try {
            const response = await axiosSecure("/locations")
            setLocations(response.data)
          } catch (err) {
            setErrorLocations("Error loading locations")
          } finally {
            setLoadingLocations(false) // Ensure loading state is updated regardless of success or failure
          }
        }
      
        fetchLocations()
      }, []) 
      



  return [locations, loadingLocations,errorLocations ]
}

export default useLocations
