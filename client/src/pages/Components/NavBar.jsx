import { Link } from "react-router";

const Navbar = () => {
    return (
      <div className='navbar bg-base-100 shadow-sm container px-4 mx-auto'>
        <div className='flex-auto'>
          <div>
            <Link to="/"  className='flex gap-2 items-center'>
            <img className='w-auto h-7' src='' alt='' />
            <span className='font-bold'>ClassifiedAds</span>
            </Link>
          </div>
        </div>
        <div className='flex-none'>
        
  
          <div className='dropdown dropdown-end z-50'>
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
               <li>
             <Link to="/signin">Sign In</Link>
            </li>
              <li>
             
                  <Link to="/profile">Profile</Link>
                
              </li>

              <li>
              <Link to="/my-ads">My Ads</Link>
              </li>
              <li>
              <Link to="/my-events">My Events</Link>
              </li>
              
              
              <li className='mt-2'>
                <button className='bg-gray-200 block text-center'>Logout</button>
              </li>
            </ul>
           
          </div>
           
             <Link to="/post-ad"><button className="btn btn-outline">Post Ad</button></Link>
        
        </div>
       
      </div>
    )
  }
  
  export default Navbar;