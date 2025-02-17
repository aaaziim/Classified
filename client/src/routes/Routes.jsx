import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout/Layout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";


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
            
           
        ]
    },

])


export default routes;