import React from 'react'
import Breadcrumb from '../Components/Breadcrumb'

const PostEvents = () => {
  return (
    
           <div className='space-y-4 mb-4'>
      
      <Breadcrumb title={"Post an Event"}></Breadcrumb>

       <form className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg border-2">
    <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-gray-700 mb-4">Service Details</legend>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="block">
                <span className="text-gray-700">Title</span>
                <input type="text" name="service_title" className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-blue-300" required />
            </label>

            <label className="block">
                <span className="text-gray-700">Category</span>
                <select name="service_category" className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-blue-300" required>
                    <option value="">Select Category</option>
                    <option value="Cleaning">Cleaning</option>
                    <option value="Repair">Repair</option>
                    <option value="IT Support">IT Support</option>
                </select>
            </label>

            <label className="block">
                <span className="text-gray-700">Sub-Category</span>
                <select name="service_subcategory" className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-blue-300" required>
                    <option value="">Select Sub-Category</option>
                </select>
            </label>

            <label className="block">
                <span className="text-gray-700">Ticket Price</span>
                <input type="number" name="service_price" className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-blue-300" required />
            </label>

            <label className="block md:col-span-2">
                <span className="text-gray-700">Description</span>
                <textarea name="service_description" className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-blue-300" required></textarea>
            </label>

            <label className="block">
                <span className="text-gray-700">Location</span>
                <input type="text" name="service_location" className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-blue-300" required />
            </label>

            <label className="block">
                <span className="text-gray-700">Upload Image</span>
                <input type="file" name="service_image" className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"/>
            </label>
        </div>
    </fieldset>

    <fieldset className="space-y-4 mt-6">
        <legend className="text-lg font-semibold text-gray-700 mb-4">Host Information</legend>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="block">
                <span className="text-gray-700">Email</span>
                <input type="email" name="author_email" className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-blue-300" required />
            </label>

            <label className="block">
                <span className="text-gray-700">Phone</span>
                <input type="text" name="author_phone" className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-blue-300" required />
            </label>

            <label className="block">
                <span className="text-gray-700">Facebook</span>
                <input type="url" name="author_facebook" className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-blue-300" />
            </label>

            <label className="block">
                <span className="text-gray-700">Instagram</span>
                <input type="url" name="author_instagram" className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-blue-300" />
            </label>
        </div>
    </fieldset>

    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition mt-6">
        Submit Ad
    </button>
</form>

    </div>
  )
}

export default PostEvents
