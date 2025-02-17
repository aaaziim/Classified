import { Outlet } from "react-router"
import Navbar from "../Components/NavBar"
import Footer from "../Components/Footer"

const Layout = () => {
  return (
    <>
    <Navbar></Navbar>
    <div className="min-h-[calc(100vh-400px)]">
       <Outlet></Outlet>
       </div>
    <Footer></Footer>
     </>
  )
}

export default Layout
