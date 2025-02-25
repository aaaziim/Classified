import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const {user,logOut} = useAuth();
    return (
      <div className='navbar bg-base-100 shadow-sm px-4 mb-4'>
        <div className='flex-auto'>
          <div  className='flex gap-2 items-center'>
            <Link to="/" >
           
            <span className='font-bold'>ClassifiedAds</span>
            </Link>
          </div>
        </div>
        <div className='flex-none'>
        
  {
    user? <div className='dropdown dropdown-end z-50'>
    <div
      tabIndex={0}
      role='button'
      className='btn btn-ghost btn-circle avatar'
    >
      <div className='w-10 rounded-full' title=''>
        <img
          referrerPolicy='no-referrer'
          alt='User Profile Photo'
          src=''
        />
      </div>
    </div>
    <ul
      tabIndex={0}
      className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
    >

      {

      }
       <li>
     <Link to="/signin">Sign In</Link>
    </li>
      <li>
     
          <Link to="/profile">Profile</Link>
        
      </li>

      <li>
      <Link to="/my-services">My Services</Link>
      </li>
      <li>
      <Link to="/my-events">My Events</Link>
      </li>
      
      
      <li className='mt-2'>
        <button onClick={logOut} className='bg-gray-200 block text-center'>Logout</button>
      </li>
    </ul>
   
  </div>:   <Link className="px-4" to="/signin">Sign In</Link>
  }
         
           
             <Link to="/post"><button className="btn btn-outline">Post Ad</button></Link>
        
        </div>
       
      </div>
    )
  }
  
  export default Navbar;