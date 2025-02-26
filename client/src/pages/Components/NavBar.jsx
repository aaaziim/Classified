import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const {user,logOut} = useAuth();
  
 
  const navItems= <>
    <li><Link to="/all-services">All Services</Link></li>
    <li><Link to="/all-events">All Events</Link></li>
 
  </>
    return (
      <div className="navbar bg-[#014D48] text-white shadow-sm px-4">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost text-white lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-[#FFE5D5] text-[#001C27] rounded-box z-10 mt-3 w-52 p-2 shadow">
            {navItems}
          </ul>
        </div>
        <Link to="/">
          <span className="font-bold text-white text-lg">SideGurus.com</span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end z-50 px-2">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full border-2 border-white">
                <img referrerPolicy="no-referrer" alt="User Profile Photo" src="" />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[#FFE5D5] text-[#001C27] rounded-box w-52">
             
              <li><Link to="/profile" className="text-[#001C27]">Profile</Link></li>
              <li><Link to="/my-services" className="text-[#001C27]">My Services</Link></li>
              <li><Link to="/my-events" className="text-[#001C27]">My Events</Link></li>
              <li className="mt-2">
                <button onClick={logOut} className="bg-[#FA8649] hover:bg-[#014D48] text-white px-4 py-1 rounded-md w-full">Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <Link className="px-4 text-white" to="/signin">Sign In</Link>
        )}
        <Link to="/post">
          <button className="btn border-white  hover:bg-[#FA8649]">Post Ad</button>
        </Link>
      </div>
    </div>

    )
  }
  
  export default Navbar;