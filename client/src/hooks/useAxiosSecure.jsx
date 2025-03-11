import axios from 'axios';
import { useEffect } from 'react';
 
import { useNavigate } from 'react-rOuter-dom';
import useAuth from './useAuth';

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

const useAxiosSecure = () => {
    

    useEffect(() => {
        const interceptor = axiosSecure.interceptors.response.use(
            (response) => response, // Return response normally
            async (error) => {
                console.error('Axios Secure Error:', error.response);

                if (error.response?.status === 401 || error.response?.status === 403) {
                    console.log("Log Out")
                }

                return Promise.reject(error);
            }
        );

        // Cleanup function to remove interceptor when component unmounts
        return () => {
            axiosSecure.interceptors.response.eject(interceptor);
        };
    }, [ ]); // Run only when logOut or navigate changes

    return axiosSecure;
};

export default useAxiosSecure;
