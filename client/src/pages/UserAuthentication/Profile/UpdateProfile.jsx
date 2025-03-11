import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../Components/Breadcrumb'
import { Helmet } from 'react-helmet-async'
import toast from 'react-hot-toast'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import useAuth from '../../../hooks/useAuth'
import { useNavigate } from 'react-router'
import LoadingSpinner from '../../Components/LoadingSpinner'

const UpdateProfile = () => {

  const {user} = useAuth();
  const axiosSecure = useAxiosSecure()
  const [profile, setProfile] = useState([])
  const [profileLoading, setProfileLoading] = useState(true)
  const [profileError, setProfileError] = useState(false)
  const navigate = useNavigate()
  
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosSecure(`/userprofile`);
        setProfile(response.data);
        setProfileLoading(false);
      } catch (err) {
        setProfileError('Error loading profile');
        setProfileLoading(false);
      }
    };
    fetchProfile(); 
  }, [user.email, axiosSecure]); // Added dependencies
  

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

  const {_id, name, phone, address, bio} = profile;


  const handleProfileUpdate = async (e) => {
    e.preventDefault();
  
    const updatedProfile = {
      name: e.target.name.value || name,
      phone: e.target.phone.value || phone,
      address: e.target.address.value || address,
      bio: e.target.bio.value || bio,
    };
  
    try {
      const { data } = await axiosSecure.put(`/profile-update`, updatedProfile);
      toast.success("Profile updated successfully");
      navigate("/profile");
    } catch (err) {
      toast.error("Update failed: " + err.message);
    }
  };
  



  return (
    <div>
      <Helmet>
        <title>Update Profile</title>
      </Helmet>

      <div className="space-y-4 mb-6">
        <Breadcrumb title="Update Profile" subTitle="Update your personal information below." />
      </div>

      <div className="my-10 p-10">
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-[#014D48]">
        <form onSubmit={handleProfileUpdate} className="space-y-6">

            {/* Profile Picture Upload */}
            <div className="flex justify-center items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#014D48]">
                <img src="profile-picture.jpg" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <label htmlFor="profile-picture" className="ml-4 cursor-pointer text-[#FA8649] hover:text-[#E06D36] transition">
                Change Picture
              </label>
              <input type="file" id="profile-picture" className="hidden" />
            </div>

            {/* Full Name */}
            <label className="block">
              <span className="text-[#001C27]">Full Name</span>
              <input type="text" className="mt-1 block w-full border border-[#014D48] rounded-lg p-2 focus:ring focus:ring-[#FA8649]" defaultValue={name} name='name' />
            </label>

            {/* Phone */}
            <label className="block">
              <span className="text-[#001C27]">Phone</span>
              <input type="text" className="mt-1 block w-full border border-[#014D48] rounded-lg p-2 focus:ring focus:ring-[#FA8649]" defaultValue={phone}  name='phone' />
            </label>

            <label className="block">
              <span className="text-[#001C27]">Address</span>
              <input type="text" className="mt-1 block w-full border border-[#014D48] rounded-lg p-2 focus:ring focus:ring-[#FA8649]" defaultValue={address}  name='address' />
            </label>


            {/* Bio */}
            <label className="block">
              <span className="text-[#001C27]">Bio</span>
              <textarea className="mt-1 block w-full border border-[#014D48] rounded-lg p-2 focus:ring focus:ring-[#FA8649]" defaultValue={bio} name='bio'></textarea>
            </label>

            {/* Submit Button */}
            <button type="submit" className="w-full bg-[#014D48] text-white py-2 rounded-lg hover:bg-[#012F2B] transition">
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateProfile
