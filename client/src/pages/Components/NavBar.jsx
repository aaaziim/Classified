import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import { FaUser } from "react-icons/fa";
import logo from "../../assets/images/logopng.png";
const Navbar = () => {
  const { user, logOut } = useAuth();

  const navItems = (
    <>
      <li>
        <Link to="/all-services">Services</Link>
      </li>
      <li>
        <Link to="/all-events">Events</Link>
      </li>
      <li>
        <Link to="/all-categories">All Categories</Link>
      </li>
      <li>
        <Link to="/all-locations">All Locations
        </Link>
      </li>
      {user ? (
        ""
      ) : (
        <li>
          {" "}
          <Link to="/signin">Sign In</Link>
        </li>
      )}
    </>
  );
  return (
    <>
      <div className="flex justify-center">
      <Link to="/"> <img className="max-w-sm max-h-20" src={logo} alt="" /></Link>
      </div>
      <div className="navbar bg-[#014D48] text-white shadow-sm ">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost text-white hover:text-black lg:hidden -ml-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-[#FFE5D5] text-[#001C27] rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              {navItems}
            </ul>
          </div>
        
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>

        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end z-50 px-2">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="rounded-full border-2 border-white flex items-center justify-center p-2">
                  <FaUser />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[#FFE5D5] text-[#001C27] rounded-box w-52"
              >
                <li>
                  <Link to="/profile" className="text-[#001C27]">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/my-services" className="text-[#001C27]">
                    My Services
                  </Link>
                </li>
                <li>
                  <Link to="/my-events" className="text-[#001C27]">
                    My Events
                  </Link>
                </li>
                <li className="mt-2">
                  <button
                    onClick={logOut}
                    className="bg-[#FA8649] hover:bg-[#014D48] text-white px-4 py-1 rounded-md w-full"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            ""
          )}
          <Link to="/post">
            <button className="btn border-white  hover:bg-[#FA8649]">
              Post Ad
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
