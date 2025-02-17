import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout/Layout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import SignIn from "../pages/UserAuthentication/SignIn/SignIn";
import SignUp from "../pages/UserAuthentication/Register/SignUp";
import Profile from "../pages/UserAuthentication/Profile/Profile";
import MyAds from "../pages/MyAds/MyAds";
import MyEvents from "../pages/MyEvents/MyEvents";
import PostAds from "../pages/PostAds/PostAds";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Privacy from "../pages/Privacy/Privacy";
import Cookies from "../pages/Cookies/Cookies";
import UpdateAds from "../pages/UpdateAds/UpdateAds";
import AllAds from "../pages/AllAds/AllAds";


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
                path:"/my-ads",
                element:<MyAds></MyAds>
            },
            {
                path:"/my-events",
                element:<MyEvents></MyEvents>
            },
            {
                path:"/post-ad",
                element:<PostAds></PostAds>
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
                path:"/update-ads",
                element:<UpdateAds></UpdateAds>
            },
            {
                path:"/all-ads",
                element:<AllAds></AllAds>
            },
            
           
        ]
    },

])


export default routes;