import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout/Layout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import SignIn from "../pages/UserAuthentication/SignIn/SignIn";
import SignUp from "../pages/UserAuthentication/Register/SignUp";
import Profile from "../pages/UserAuthentication/Profile/Profile";
 
import PostAds from "../pages/PostAds/PostAds";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Privacy from "../pages/Privacy/Privacy";
import Cookies from "../pages/Cookies/Cookies";
 
import AllAds from "../pages/AllAds/AllAds";
import AdDetails from "../pages/AdDetails/AdDetails";
import PostServices from "../pages/PostAds/PostServices";
import PostEvents from "../pages/PostAds/PostEvents";
import UpdateProfile from "../pages/UserAuthentication/Profile/UpdateProfile";
import MyServices from "../pages/UserAuthentication/Profile/MyServices";
import MyEvents from "../pages/UserAuthentication/Profile/MyEvents";
import ServiceUpdate from "../pages/UpdateAds/ServiceUpdate";
import EventUpdate from "../pages/UpdateAds/EventUpdate";


const routes = createBrowserRouter([
    {
        path: "/",
        element:<Layout></Layout>,
        errorElement: <ErrorPage></ErrorPage>,
        children:[

            {
                index:true,
                element:<Home></Home>, 
            },
            {
                path:"/signin",
                element:<SignIn></SignIn>
            },
            {
                path:"/signup",
                element:<SignUp></SignUp>
            },
            {
                path:"/profile",
                element:<Profile></Profile>
            },
            {
                path:"/my-services",
                element:<MyServices></MyServices>
            },
            {
                path:"/my-events",
                element:<MyEvents></MyEvents>
            },
            {
                path:"/post",
                element:<PostAds></PostAds>
            },
            {
                path:"/post-services",
                element:<PostServices></PostServices>
            },
            {
                path:"/post-events",
                element:<PostEvents></PostEvents>
            },
            {
                path:"/about",
                element:<About></About>
            },
            {
                path:"/contact",
                element:<Contact></Contact>
            },
            {
                path:"/privacy",
                element:<Privacy></Privacy>
            },
            {
                path:"/cookies",
                element:<Cookies></Cookies>
            },
            {
                path:"/service-update",
                element:<ServiceUpdate></ServiceUpdate>
            },
            {
                path:"/event-update",
                element:<EventUpdate></EventUpdate>
            },
            {
                path:"/update-profile",
                element:<UpdateProfile></UpdateProfile>
            },
            {
                path:"/all-ads",
                element:<AllAds></AllAds>
            },
            {
                path:"/ad-details",
                element:<AdDetails></AdDetails>
            },
            
           
        ]
    },

])


export default routes;