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
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import AllCategories from "../pages/AllCategories/AllCategories";
import AllLocations from "../pages/AllLocations/AllLocations";
import SingleSubCategoryPage from "../pages/SingleCategoryPage/SingleSubCategoryPage";
import SingleStatePage from "../pages/SingleLocationPage/SingleStatePage";
import SafetyGuides from "../pages/SafetyGuides/SafetyGuides";
import SafetyGuideForProviders from "../pages/SafetyGuides/SafetyGuideForProviders";
import Guide from "../pages/SafetyGuides/Guide";

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
                path:"/safety-guide",
                element:<Guide></Guide>
            },
            {
                path:"/customer-safety-guide",
                element:<SafetyGuides></SafetyGuides>
            },
            {
                path:"/provider-safety-guide",
                element:<SafetyGuideForProviders></SafetyGuideForProviders>
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
                path:"/service-update/:id",
                element:<PrivateRoute> <ServiceUpdate></ServiceUpdate></PrivateRoute>
            },
            {
                path:"/event-update/:id",
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
                path:"/all-categories",
                element:<AllCategories></AllCategories>
            },
            {
                path:"/all-locations",
                element:<AllLocations></AllLocations>
            },
            {
                path:"/ad-details/:id",
                element:<AdDetails></AdDetails>
            },
            {
                path:"/event-details/:id",
                element:<EventDetails></EventDetails>
            },
            {
                path:`/category/:id`,
                element:<SingleCategoryPage></SingleCategoryPage>
            },
            {
                path:'/category/:id/subcategory/:subId',
                element:<SingleSubCategoryPage></SingleSubCategoryPage>
            },
            {
                path:'/state/:stateName',
                element:<SingleStatePage></SingleStatePage>
            },
            {
                path:`/location/:id`,
                element:<SingleLocationPage></SingleLocationPage>
            },
            {
                path:`/admin`,
                element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>
            },
            
           
        ]
    },

])


export default routes;