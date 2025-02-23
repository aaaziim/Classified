import React from 'react'
import Breadcrumb from '../../Components/Breadcrumb'

const MyServices = () => {
  return (
    <div>
          <div className='space-y-4 mb-4'>
      
      <Breadcrumb title={"My Services"}
      subTitle={"Here are the services you have listed."}></Breadcrumb>
      </div>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
    

 
    <div className="space-y-6">
  
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow hover:shadow-lg transition">
            <div className="flex items-center space-x-4">
         
                <img src="service-image.jpg" alt="Service Thumbnail" className="w-16 h-16 object-cover rounded-lg" />
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">Service Title</h3>
                    <p className="text-gray-600">Brief description or details of the service.</p>
                </div>
            </div>

            <div className="space-x-3">
             
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
                    Edit
                </button>
 
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition">
                    Delete
                </button>
            </div>
        </div>

       
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow hover:shadow-lg transition">
            <div className="flex items-center space-x-4">
                <img src="service-image2.jpg" alt="Service Thumbnail" className="w-16 h-16 object-cover rounded-lg" />
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">Service Title 2</h3>
                    <p className="text-gray-600">Brief description or details of the service.</p>
                </div>
            </div>

            <div className="space-x-3">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
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

export default MyServices
