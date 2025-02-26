import React from 'react'
import Breadcrumb from '../../Components/Breadcrumb'
import { Helmet } from 'react-helmet-async'

const UpdateProfile = () => {
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
          <form className="space-y-6">
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
              <input type="text" className="mt-1 block w-full border border-[#014D48] rounded-lg p-2 focus:ring focus:ring-[#FA8649]" placeholder="John Doe" />
            </label>

            {/* Phone */}
            <label className="block">
              <span className="text-[#001C27]">Phone</span>
              <input type="text" className="mt-1 block w-full border border-[#014D48] rounded-lg p-2 focus:ring focus:ring-[#FA8649]" placeholder="+1234567890" />
            </label>

            {/* Bio */}
            <label className="block">
              <span className="text-[#001C27]">Bio</span>
              <textarea className="mt-1 block w-full border border-[#014D48] rounded-lg p-2 focus:ring focus:ring-[#FA8649]" placeholder="Tell us a little about yourself."></textarea>
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
