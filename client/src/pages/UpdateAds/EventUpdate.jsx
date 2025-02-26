import React from 'react'
import Breadcrumb from '../Components/Breadcrumb'
import { Helmet } from 'react-helmet-async'

const EventUpdate = () => {
  return (
    <div className="mb-4 px-4 py-6">
      <Helmet>
        <title>Update Event</title>
      </Helmet>

      <div className="space-y-4 mb-6">
        <Breadcrumb 
          title="Update Events"
          subTitle="Here you can update your event information"
        />
      </div>

      <div>
        <h1 className="text-4xl font-bold text-center py-6 text-[#014D48]">Update Event</h1>
        <form className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-[#014D48]">
          <fieldset className="space-y-4">
            <legend className="text-lg font-semibold text-[#014D48] mb-4">Event Details</legend>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="block">
                <span className="text-[#001C27]">Title</span>
                <input type="text" name="service_title" className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]" required />
              </label>

              <label className="block">
                <span className="text-[#001C27]">Category</span>
                <select name="service_category" className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]" required>
                  <option value="">Select Category</option>
                  <option value="Conference">Conference</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Concert">Concert</option>
                </select>
              </label>

              <label className="block">
                <span className="text-[#001C27]">Sub-Category</span>
                <select name="service_subcategory" className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]" required>
                  <option value="">Select Sub-Category</option>
                </select>
              </label>

              <label className="block">
                <span className="text-[#001C27]">Ticket Price</span>
                <input type="number" name="service_price" className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]" required />
              </label>

              <label className="block md:col-span-2">
                <span className="text-[#001C27]">Description</span>
                <textarea name="service_description" className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]" required></textarea>
              </label>

              <label className="block">
                <span className="text-[#001C27]">Location</span>
                <input type="text" name="service_location" className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]" required />
              </label>

              <label className="block">
                <span className="text-[#001C27]">Upload Image</span>
                <input type="file" name="service_image" className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]" />
              </label>
            </div>
          </fieldset>

          <fieldset className="space-y-4 mt-6">
            <legend className="text-lg font-semibold text-[#014D48] mb-4">Host Information</legend>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="block">
                <span className="text-[#001C27]">Email</span>
                <input type="email" name="author_email" className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]" required />
              </label>

              <label className="block">
                <span className="text-[#001C27]">Phone</span>
                <input type="text" name="author_phone" className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]" required />
              </label>

              <label className="block">
                <span className="text-[#001C27]">Facebook</span>
                <input type="url" name="author_facebook" className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]" />
              </label>

              <label className="block">
                <span className="text-[#001C27]">Instagram</span>
                <input type="url" name="author_instagram" className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]" />
              </label>
            </div>
          </fieldset>

          <button type="submit" className="w-full bg-[#FA8649] text-white py-2 rounded-lg hover:bg-[#E06D36] transition mt-6">
            Update Event
          </button>
        </form>
      </div>
    </div>
  )
}

export default EventUpdate
