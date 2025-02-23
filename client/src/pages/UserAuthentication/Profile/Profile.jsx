import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router'
import Breadcrumb from '../../Components/Breadcrumb'

const Profile = () => {
  return (
    <div className='mb-4'>
        <Helmet>
          <title>Profile</title>
        </Helmet>
        <div className='space-y-4 mb-4'>
      
      <Breadcrumb title={"Profile"}></Breadcrumb>
      </div>
      <div className="max-w-3xl mx-auto p-10 bg-white shadow-xl rounded-lg border-2">
     
 
    <div className="flex flex-col md:flex-row items-center mb-8">
        <div className="flex-shrink-0">
            <img src="profile-picture.jpg" alt="User Profile" className="w-24 h-24 rounded-full border-2 border-gray-300" />
        </div>
        <div className="ml-6 text-center md:text-left">
            <h1 className="text-2xl font-semibold text-gray-800">John Doe</h1>
            <p className="text-gray-600">Joined: January 2023</p>
        </div>
    </div> 
    <div className="mb-6">
        <nav className="flex justify-center md:justify-start space-x-6">
      
            <Link to="/update-profile">
            <button className="text-lg font-medium text-blue-600 hover:text-blue-800" id="update-profile-btn">Update Profile</button>
            </Link>
           <Link to="/my-services">
           <button className="text-lg font-medium text-blue-600 hover:text-blue-800" id="my-services-btn">My Services</button></Link>
           
           <Link to="/my-events">
           <button className="text-lg font-medium text-blue-600 hover:text-blue-800" id="my-events-btn">My Events</button>
           </Link>
           
            
        </nav>
    </div>

  
    <div id="profile-view" className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">Profile View</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h3 className="text-lg font-medium text-gray-700">Email</h3>
                <p className="text-gray-600">johndoe@example.com</p>
            </div>
            <div>
                <h3 className="text-lg font-medium text-gray-700">Phone</h3>
                <p className="text-gray-600">+1234567890</p>
            </div>
            <div>
                <h3 className="text-lg font-medium text-gray-700">Location</h3>
                <p className="text-gray-600">New York, USA</p>
            </div>
            <div>
                <h3 className="text-lg font-medium text-gray-700">Bio</h3>
                <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras imperdiet, nunc sit amet.</p>
            </div>
        </div>
    </div>

    <div id="update-profile" className="space-y-6 hidden">
        <h2 className="text-xl font-semibold text-gray-800">Update Profile</h2>
        <form className="space-y-4">
            <label className="block">
                <span className="text-gray-700">Full Name</span>
                <input type="text" className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-blue-300" value="John Doe" />
            </label>

            <label className="block">
                <span className="text-gray-700">Email</span>
                <input type="email" className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-blue-300" value="johndoe@example.com" />
            </label>

            <label className="block">
                <span className="text-gray-700">Phone</span>
                <input type="text" className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-blue-300" value="+1234567890" />
            </label>

            <label className="block">
                <span className="text-gray-700">Bio</span>
                <textarea className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-blue-300">Lorem ipsum dolor sit amet.</textarea>
            </label>

            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                Update Profile
            </button>
        </form>
    </div>

    <div id="my-services" className="space-y-6 hidden">
        <h2 className="text-xl font-semibold text-gray-800">My Services</h2>
        <div className="space-y-4">
            <div className="p-4 border rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-700">Service 1</h3>
                <p className="text-gray-600">Description of Service 1</p>
            </div>
            <div className="p-4 border rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-700">Service 2</h3>
                <p className="text-gray-600">Description of Service 2</p>
            </div>
        </div>
    </div>

    <div id="my-events" className="space-y-6 hidden">
        <h2 className="text-xl font-semibold text-gray-800">My Events</h2>
        <div className="space-y-4">
            <div className="p-4 border rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-700">Event 1</h3>
                <p className="text-gray-600">Description of Event 1</p>
            </div>
            <div className="p-4 border rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-700">Event 2</h3>
                <p className="text-gray-600">Description of Event 2</p>
            </div>
        </div>
    </div>
</div>
    </div>
    
 
  )
}

export default Profile
