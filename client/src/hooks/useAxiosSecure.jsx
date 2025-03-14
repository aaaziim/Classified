import axios from 'axios';
import { useEffect } from 'react';
 
import { useNavigate } from 'react-router-dom';
// import useAuth from './useAuth';
import {
    getAuth,
    signOut,
  } from 'firebase/auth'
  import { app } from "../firebase/firebase.config.js"
  const auth = getAuth(app)
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
                   
                     
                        await axiosSecure("/logout");
                        return signOut(auth)
                      
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
