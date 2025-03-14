import { Outlet } from "react-router"
import Navbar from "../Components/NavBar"
import Footer from "../Components/Footer"

const Layout = () => {
  return (
    <div className="w-full md:container md:x-4 md:mx-auto">
    <Navbar></Navbar>
    <div className="min-h-[calc(100vh-400px)]">
       <Outlet></Outlet>
       </div>
    <Footer></Footer>
     </div>
  )
}

export default Layout
