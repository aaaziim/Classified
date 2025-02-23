import React from 'react'
import Breadcrumb from '../../Components/Breadcrumb'
import { Helmet } from 'react-helmet-async'

const UpdateProfile = () => {
  return (
    <div>
           <Helmet>
                  <title>Update Profile</title>
                </Helmet>
         <div className='space-y-4 mb-4'>
      
      <Breadcrumb title={"Update Profile"}
      subTitle={"Update your personal information below."}></Breadcrumb>
      </div>
      <div className='my-10 p-10'>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">

    <form className="space-y-6">
 
        <div className="flex justify-center items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300">
                <img src="profile-picture.jpg" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <label htmlFor="profile-picture" className="ml-4 cursor-pointer text-blue-600 hover:underline">
                Change Picture
            </label>
            <input type="file" id="profile-picture" className="hidden" />
        </div>

  
        <label className="block">
            <span className="text-gray-700">Full Name</span>
            <input type="text" className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-blue-300" placeholder="John Doe" />
        </label>

     
 
        <label className="block">
            <span className="text-gray-700">Phone</span>
            <input type="text" className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-blue-300" placeholder="+1234567890" />
        </label>
 
        <label className="block">
            <span className="text-gray-700">Bio</span>
            <textarea className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-blue-300" placeholder="Tell us a little about yourself."></textarea>
        </label>

   
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Update Profile
        </button>
    </form>
</div>

    </div>
    </div>
  
  )
}

export default UpdateProfile
