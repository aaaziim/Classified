import React from 'react'
import Breadcrumb from '../Components/Breadcrumb'
import { Helmet } from 'react-helmet-async'

const PostServices = () => {

    const handleAdPostService = (e) => {
        e.preventDefault();
        const form = e.target;
        const service_title = form.service_title.value;
        const service_category = form.service_category.value;
        const service_subcategory = form.service_subcategory.value;
        const service_price = form.service_price.value;
        const service_description = form.service_description.value;
        const service_state = form.service_state.value;
        const service_city = form.service_city.value;
        const service_image = form.service_image.value;
        const service_posted = new Date().toISOString(); 

        const author = {
             
            // name: user.displayName,
            email: form.author_email.value,
            phone: form.author_phone.value,
            facebook: form.author_facebook.value,
            instagram: form.author_instagram.value,
        }

        const service = {
            title: service_title,
            category: service_category,
            subcategory: service_subcategory,
            price: service_price,
            description: service_description,
            state: service_state,
            city: service_city,
            image: service_image,
            posted: service_posted,
            author: author,
        }

        console.table(service)
         


    }
  return (
    <div className='space-y-4 mb-4'>
          <Helmet>
                                  <title>Post Service</title>
                  </Helmet>
      
            <Breadcrumb title={"Post a Service"}></Breadcrumb>

            <form onSubmit={handleAdPostService} className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg border-2">
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
                    <option value="Sub">Select Sub-Category</option>
                    <option value="Sub">Select Sub-Category</option>
                </select>
            </label>

            <label className="block">
                <span className="text-gray-700">Price</span>
                <input type="number" name="service_price" className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-blue-300" required />
            </label>

            <label className="block md:col-span-2">
                <span className="text-gray-700">Description</span>
                <textarea name="service_description" className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-blue-300" required></textarea>
            </label>
            <label className="block">
                <span className="text-gray-700">State</span>
                <select name="service_state" className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-blue-300" required>
                    <option value="">Select State</option>
                    <option value="">Select State</option>
                    <option value="">Select State</option>
                </select>
            </label>

            <label className="block">
                <span className="text-gray-700">City</span>
                <select name="service_city" className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-blue-300" required>
                    <option value="">Select State</option>
                    <option value="">Select State</option>
                    <option value="">Select State</option>
                </select>
            </label>

         
        

            <label className="block">
                <span className="text-gray-700">Upload Image</span>
                <input type="file" name="service_image" className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"/>
            </label>
        </div>
    </fieldset>

    <fieldset className="space-y-4 mt-6">
        <legend className="text-lg font-semibold text-gray-700 mb-4">Author Information</legend>
        
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

export default PostServices
