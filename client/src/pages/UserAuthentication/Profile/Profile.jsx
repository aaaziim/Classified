import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../../Components/Breadcrumb'
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../Components/LoadingSpinner'

const Profile = () => {
  const {user} = useAuth();
  const axiosSecure = useAxiosSecure()
  const [profile, setProfile] = useState([])
  const [profileLoading, setProfileLoading] = useState(true)
  const [profileError, setProfileError] = useState(false)
  useEffect(() => {
  
    const fetchProfile = async () => {
      try {
        // Fetch categories from the API endpoint using the secure axios instance
        const response = await axiosSecure(`/userprofile`)
        setProfile(response.data);
        setProfileLoading(false);
      } catch (err) {
        setProfileError('Error loading profile');
        setProfileLoading(false);
      }
    };

 
    fetchProfile(); 
  }, []);


  if (profileLoading) {
    return (
      <div className="text-center text-[#014D48]">
        <LoadingSpinner />
      </div>
    );
  }

  if (profileError) {
    return (
      <div className="text-center text-[#FA8649]">
        {profileError}
      </div>
    );
  }

  const {name, email, phone, address, bio} = profile;
  return (
    <div className="mb-6">
    
      <div className="space-y-4 mb-6">
        <Breadcrumb title="Profile" />
      </div>

      <div className="max-w-3xl mx-auto p-10 bg-white shadow-xl rounded-lg border border-[#014D48]">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center mb-8">
          <div className="flex-shrink-0">
            <img 
              src="profile-picture.jpg" 
              alt="User Profile" 
              className="w-24 h-24 rounded-full border-2 border-[#014D48]" 
            />
          </div>
          <div className="ml-6 text-center md:text-left">
            <h1 className="text-2xl font-semibold text-[#014D48]">{name ||  <Link to="/update-profile">
              <button className="text-lg font-medium text-[#FA8649] hover:text-[#E06D36] transition">
                Add Name
              </button>
            </Link>}</h1>
          
          </div>
        </div> 

        {/* Navigation Links */}
        <div className="mb-6">
          <nav className="flex justify-center md:justify-start space-x-6">
            <Link to="/update-profile">
              <button className="text-lg font-medium text-[#FA8649] hover:text-[#E06D36] transition">
                Update Profile
              </button>
            </Link>
            <Link to="/my-services">
              <button className="text-lg font-medium text-[#FA8649] hover:text-[#E06D36] transition">
                My Services
              </button>
            </Link>
            <Link to="/my-events">
              <button className="text-lg font-medium text-[#FA8649] hover:text-[#E06D36] transition">
                My Events
              </button>
            </Link>
          </nav>
        </div>

        {/* Profile View */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-[#014D48]">Profile Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-[#001C27]">Email</h3>
              <p className="text-[#014D48]">{email ||  <Link to="/update-profile">
              <button className="text-lg font-medium text-[#FA8649] hover:text-[#E06D36] transition">
                Add Email
              </button>
            </Link>}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-[#001C27]">Phone</h3>
              <p className="text-[#014D48]">{phone ||  <Link to="/update-profile">
              <button className="text-lg font-medium text-[#FA8649] hover:text-[#E06D36] transition">
                Add Phone
              </button>
            </Link>}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-[#001C27]">Address</h3>
              <p className="text-[#014D48]">{address ||  <Link to="/update-profile">
              <button className="text-lg font-medium text-[#FA8649] hover:text-[#E06D36] transition">
                Add Address
              </button>
            </Link>}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-[#001C27]">Bio</h3>
              <p className="text-[#014D48]">
            {bio ||  <Link to="/update-profile">
              <button className="text-lg font-medium text-[#FA8649] hover:text-[#E06D36] transition">
                Add Bio
              </button>
            </Link>}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
