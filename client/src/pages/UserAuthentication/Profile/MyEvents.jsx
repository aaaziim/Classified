import React from 'react'
import Breadcrumb from '../../Components/Breadcrumb'
import { Helmet } from 'react-helmet-async'

const MyEvents = () => {
  return (
    <div className="mb-6">
      <Helmet>
        <title>My Events</title>
      </Helmet>

      <div className="space-y-4 mb-6">
        <Breadcrumb
          title="My Events"
          subTitle="Here are the events you have listed."
        />
      </div>

      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-[#014D48]">
        <div className="space-y-6">
          
          {/* Event Item 1 */}
          <div className="flex items-center justify-between p-4 bg-[#FFE5D5] rounded-lg shadow-md hover:shadow-lg transition">
            <div className="flex items-center space-x-4">
              <img src="service-image.jpg" alt="Event Thumbnail" className="w-16 h-16 object-cover rounded-lg border border-[#014D48]" />
              <div>
                <h3 className="text-lg font-semibold text-[#014D48]">Event Title</h3>
                <p className="text-[#001C27]">Brief description or details of the event.</p>
              </div>
            </div>
            <div className="space-x-3">
              <button className="px-4 py-2 bg-[#FA8649] text-white rounded-lg shadow hover:bg-[#E06D36] transition">
                Edit
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition">
                Delete
              </button>
            </div>
          </div>

          {/* Event Item 2 */}
          <div className="flex items-center justify-between p-4 bg-[#FFE5D5] rounded-lg shadow-md hover:shadow-lg transition">
            <div className="flex items-center space-x-4">
              <img src="service-image2.jpg" alt="Event Thumbnail" className="w-16 h-16 object-cover rounded-lg border border-[#014D48]" />
              <div>
                <h3 className="text-lg font-semibold text-[#014D48]">Event Title 2</h3>
                <p className="text-[#001C27]">Brief description or details of the event.</p>
              </div>
            </div>
            <div className="space-x-3">
              <button className="px-4 py-2 bg-[#FA8649] text-white rounded-lg shadow hover:bg-[#E06D36] transition">
                Edit
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition">
                Delete
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default MyEvents
