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
 
import AllAds from "../pages/AllAds/AllServices";
import AdDetails from "../pages/AdDetails/AdDetails";
import PostServices from "../pages/PostAds/PostServices";
import PostEvents from "../pages/PostAds/PostEvents";
import UpdateProfile from "../pages/UserAuthentication/Profile/UpdateProfile";
import MyServices from "../pages/UserAuthentication/Profile/MyServices";
import MyEvents from "../pages/UserAuthentication/Profile/MyEvents";
import ServiceUpdate from "../pages/UpdateAds/ServiceUpdate";
import EventUpdate from "../pages/UpdateAds/EventUpdate";
import SingleCategoryPage from "../pages/SingleCategoryPage/SingleCategoryPage";
import SingleLocationPage from "../pages/SingleLocationPage/SingleLocationPage";
import EventDetails from "../pages/AdDetails/EventDetails";
import PrivateRoute from "./PrivateRoute";
import AllServices from "../pages/AllAds/AllServices";
import AllEvents from "../pages/AllAds/AllEvents";

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
                element:<PrivateRoute> <Profile></Profile></PrivateRoute>
            },
            {
                path:"/my-services",
                element:<PrivateRoute> <MyServices></MyServices></PrivateRoute>
            },
            {
                path:"/my-events",
                element:<PrivateRoute> <MyEvents></MyEvents></PrivateRoute>
            },
            {
                path:"/post",
                element:<PrivateRoute> <PostAds></PostAds></PrivateRoute>
            },
            {
                path:"/post-services",
                element:<PrivateRoute> <PostServices></PostServices></PrivateRoute>
            },
            {
                path:"/post-events",
                element:<PrivateRoute> <PostEvents></PostEvents></PrivateRoute>
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
                element:<PrivateRoute> <ServiceUpdate></ServiceUpdate></PrivateRoute>
            },
            {
                path:"/event-update",
                element:<PrivateRoute> <EventUpdate></EventUpdate></PrivateRoute>
            },
            {
                path:"/update-profile",
                element:<PrivateRoute> <UpdateProfile></UpdateProfile></PrivateRoute>
            },
            {
                path:"/all-services",
                element:<AllServices></AllServices>
            },
            {
                path:"/all-events",
                element:<AllEvents></AllEvents>
            },
            {
                path:"/ad-details",
                element:<AdDetails></AdDetails>
            },
            {
                path:"/event-details",
                element:<EventDetails></EventDetails>
            },
            {
                path:`/category/:slug`,
                element:<SingleCategoryPage></SingleCategoryPage>
            },
            {
                path:`/location/:slug`,
                element:<SingleLocationPage></SingleLocationPage>
            },
            
           
        ]
    },

])


export default routes;