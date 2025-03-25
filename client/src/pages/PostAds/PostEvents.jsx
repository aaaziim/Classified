import Breadcrumb from "../Components/Breadcrumb";
import React, { useEffect, useState } from "react";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../Components/LoadingSpinner";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useCategory from "../../hooks/useCategory";
import useLocations from "../../hooks/useLocations";
import DynamicTitlePage from "../Components/DynamicTitlePage";

const PostEvents = () => {
  const { user } = useAuth();

  const [categories, loadingCategories, errorCategories] = useCategory();
  const [locations, loadingLocations, errorLocations] = useLocations();

    const [stateIndex, setStateIndex] = useState(-1);
    const [countryIndex, setCountryIndex] = useState(-1);
    const [categoryIndex, setCategoryIndex] = useState(-1);
 

  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  if (loadingCategories || loadingLocations)
    return (
      <div className="text-center text-[#014D48]">
        <LoadingSpinner></LoadingSpinner>
      </div>
    );
  if (errorCategories)
    return <div className="text-center text-[#FA8649]">{errorCategories}</div>;
  if (errorLocations)
    return <div className="text-center text-[#FA8649]">{errorLocations}</div>;
  const handleAdPostService = async (e) => {
    e.preventDefault();
    const form = e.target;
  
    // Create an object to store form data
    const serviceData = {
      title: form.service_title.value,
      category: form.service_category.value,
      subcategory: form.service_subcategory.value,
      price: form.service_price.value,
      description: form.service_description.value,
      country: form.service_country.value,
      state: form.service_state?.value,
      city: form.service_city?.value,
      author: {
        email: form.author_email.value,
        business_email: form.author_business_email.value,
        phone: form.author_phone.value,
        facebook: form.author_facebook.value,
        instagram: form.author_instagram.value,
      },
      images: [], // Placeholder for uploaded image URLs
    };
  
    // Upload Image to Cloudinary
    const imageFiles = form.service_image.files;
    
    if (imageFiles.length > 0) {
      const imageUploadPromises = [...imageFiles].map(async (file) => {
        const imageData = new FormData();
        imageData.append("file", file);
        imageData.append("upload_preset", "SideGuru"); // Replace with your Cloudinary preset
        imageData.append("folder", "ads");
  
        try {
          const response = await fetch(
            "https://api.cloudinary.com/v1_1/dcct2k1cz/image/upload",
            {
              method: "POST",
              body: imageData,
            }
          );
  
          const data = await response.json();
          return data.secure_url; // Return the uploaded image URL
        } catch (err) {
          console.error("Image upload failed:", err);
          toast.error("Image upload failed.");
          return null;
        }
      });
  
      // Wait for all image uploads to complete
      const uploadedImageUrls = await Promise.all(imageUploadPromises);
  
      // Remove any failed uploads (null values)
      serviceData.images = uploadedImageUrls.filter((url) => url !== null);
    }
  
    try {
      const { data } = await axiosSecure.post(`/services`, serviceData);
      toast.success("Service posted successfully");
      navigate("/my-services");
    } catch (err) {
      toast.error("Failed to post service.");
    }
  };
  const handleImageChange = (e) => {
    // Check if files are selected
    if (e.target.files.length > 0) {
      toast.success("Photo uploaded successfully!");
    }
  };

  const handleAdPostEvent = async (e) => {
    e.preventDefault();
    const form = e.target;
    const event = {
      title: form.event_title.value,
      category: form.event_category.value,
      subcategory: form.event_subcategory.value,
      price: form.event_price.value,
      description: form.event_description.value,
      startDate: form.event_start_date.value,
      endDate: form.event_end_date.value,
      country: form.event_country.value,
      state: form.event_state?.value,
      city: form.event_city?.value,
      author: {
        email: form.author_email.value,
        business_email: form.author_business_email.value,
        phone: form.author_phone.value,
        facebook: form.author_facebook.value,
        instagram: form.author_instagram.value,
      },
      images: [], // Placeholder for uploaded image URLs
    };
  
    // Upload Image to Cloudinary
    const imageFiles = form.event_image.files;
  
    if (imageFiles.length > 0) {
      const imageUploadPromises = [...imageFiles].map(async (file) => {
        const imageData = new FormData();
        imageData.append("file", file);
        imageData.append("upload_preset", "SideGuru"); // Replace with your Cloudinary preset
        imageData.append("folder", "ads");
  
        try {
          const response = await fetch(
            "https://api.cloudinary.com/v1_1/dcct2k1cz/image/upload",
            {
              method: "POST",
              body: imageData,
            }
          );
    
          const data = await response.json();
          return data.secure_url; // Return the uploaded image URL
        } catch (err) {
          console.error("Image upload failed:", err);
          toast.error("Image upload failed.");
          return null;
        }
      });
  
      // Wait for all image uploads to complete
      const uploadedImageUrls = await Promise.all(imageUploadPromises);
  
      // Remove any failed uploads (null values)
      event.images = uploadedImageUrls.filter((url) => url !== null);
    }
  
    try {
      const { data } = await axiosSecure.post(`/events`, event);
      toast.success("Event posted successfully");
      navigate("/my-events");
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  
  return (
    <div className="space-y-4 mb-4">
            <DynamicTitlePage title={`Post Event | SideGurus`} />

      <Breadcrumb title={"Post an Event"} />

      <div className="px-4">
      <form
        onSubmit={handleAdPostEvent}
        className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg border-2 border-[#014D48]"
      >
        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold text-[#001C27] mb-4">
            Event Details
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="block">
              <span className="text-[#001C27]">Title</span>
              <input
                type="text"
                name="event_title"
                required
                className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#014D48]"
              />
            </label>
            <label className="block">
              <span className="text-[#001C27]">Category</span>
              <select
                name="event_category"
                required
                className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#014D48]"
                onChange={(e) => setCategoryIndex(e.target.selectedIndex - 1)}
              >
                <option value="">Select Category</option>
                {categories?.map((category, index) => (
                  <option
                    key={index}
                    value={category.name}
                    // Wrap the function call in an anonymous function
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
            {
              categories[categoryIndex]?.subcategories &&
       
            <label className="block">
              <span className="text-[#001C27]">Sub-Category</span>
              <select
                name="event_subcategory"
                required
                className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#014D48]"
              >
                <option value="sub">Select Sub-Category</option>
                {categories[categoryIndex]?.subcategories?.map(
                  (subcategory, index) => (
                    <option key={index} value={subcategory.name}>
                      {subcategory.name}
                    </option>
                  )
                )}
              </select>
            </label>
                 }
            <label className="block">
              <span className="text-[#001C27]">Price</span>
              <input
                type="number"
                name="event_price"
                required
                className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#014D48]"
              />
            </label>
            <label className="block md:col-span-2">
              <span className="text-[#001C27]">Description</span>
              <textarea
                name="event_description"
                required
                className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#014D48]"
              ></textarea>
            </label>
            <label className="block">
              <span className="text-[#001C27]">Event Starts</span>
              <input
                type="date"
                name="event_start_date"
                required
                className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#014D48]"
              />
            </label>
            <label className="block">
              <span className="text-[#001C27]">Event Ends</span>
              <input
                type="date"
                name="event_end_date"
                required
                className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#014D48]"
              />
            </label>
            <label className="block">
              <span className="text-[#001C27]">Upload Images</span>
              <input
                type="file"
                name="event_image"
                onChange={handleImageChange} 
                required
                className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#014D48]" multiple
              />
            </label>

            <label className="block">
              <span className="text-[#001C27]">Country</span>
              <select
              
                onChange={(e) => setCountryIndex(e.target.selectedIndex - 1)}
                name="event_country"
                className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]"
                required
              >
                <option value="">Select Country</option>
                {locations?.map((location, index) => (
                  <option
                    key={index}
                    value={location.name}
                    // Wrap the function call in an anonymous function
                  >
                    {location.name}
                  </option>
                ))}
              </select>
            </label>
            {locations[countryIndex]?.state &&
              <label className="block">
                <span className="text-[#001C27]">State</span>
                <select
                  name="event_state"
                  className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]"
                  onChange={(e) => setStateIndex(e.target.selectedIndex - 1)} // ✅ Set stateIndex here
                >
                  <option value="">Select State</option>
                  {locations.length > 0 && locations[countryIndex].state
                    ? locations[countryIndex]?.state?.map((location, index) => (
                        <option key={index} value={location.name}>
                          {location.name}
                        </option>
                      ))
                    : null}
                </select>
              </label>
            }

            { locations[countryIndex]?.state[stateIndex]?.cities &&
              <label className="block">
                <span className="text-[#001C27]">City</span>
                <select
                  name="event_city"
                  className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]"
                >
                  <option value="">Select City</option>

                  {locations.length > 0 &&
                  locations[countryIndex]?.state &&
                  stateIndex !== undefined &&
                  stateIndex < locations[countryIndex].state.length &&
                  locations[countryIndex]?.state[stateIndex]?.cities
                    ? locations[countryIndex]?.state[stateIndex]?.cities?.map(
                        (city, index) => (
                          <option key={index} value={city.name}>
                            {city.name}
                          </option>
                        )
                      )
                    : null}
                </select>
              </label>
             }

            {/* <label className="block">
              <span className="text-[#001C27]">Country</span>
              <select
                onChange={(e) => setCountryIndex(e.target.selectedIndex - 1)}
                name="event_country"
                className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]"
                required
              >
                <option value="">Select Country</option>
                {locations?.map((location, index) => (
                  <option
                    key={index}
                    value={location.name}
                    // Wrap the function call in an anonymous function
                  >
                    {location.name}
                  </option>
                ))}
              </select>
            </label>
            {locations[countryIndex]?.state && (
              <label className="block">
                <span className="text-[#001C27]">State</span>
                <select
                  name="event_state"
                  className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]"
                  required
                  onChange={(e) => setStateIndex(e.target.selectedIndex - 1)}
                >
                  <option value="">Select State</option>
                  {locations.length > 0 && locations[countryIndex]?.state
                    ? locations[countryIndex]?.state?.map((location, index) => (
                        <option key={index} value={location.name}>
                          {location.name}
                        </option>
                      ))
                    : null}
                </select>
              </label>
            )}

            {locations[countryIndex]?.state[stateIndex]?.cities &&  (
              <label className="block">
                <span className="text-[#001C27]">City</span>
                <select
                  name="event_city"
                  className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]"
                  required
                >
                  <option value="">Select City</option>

                  {locations.length > 0 &&
                  locations[0].state &&
                  stateIndex !== undefined &&
                  stateIndex < locations[0].state.length &&
                  locations[0].state[stateIndex].cities
                    ? locations[0].state[stateIndex].cities.map(
                        (city, index) => (
                          <option key={index} value={city.name}>
                            {city.name}
                          </option>
                        )
                      )
                    : null}
                </select>
              </label>
            )  }
            */}
          </div>
        </fieldset>

        <fieldset className="space-y-4 mt-6">
          <legend className="text-lg font-semibold text-[#001C27] mb-4">
            Host Contact Information
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="block">
              <span className="text-[#001C27]">Email</span>
              <input
                type="email"
                name="author_email"
                required
                defaultValue={user.email}
                disabled
                className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#014D48]"
              />
            </label>
            <label className="block">
              <span className="text-[#001C27]">Business Email</span>
              <input
                type="email"
                name="author_business_email"
                className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]"
          
              />
            </label>
            <label className="block">
              <span className="text-[#001C27]">Phone</span>
              <input
                type="text"
                name="author_phone"
               
                className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#014D48]"
              />
            </label>
            <label className="block">
              <span className="text-[#001C27]">Facebook</span>
              <input
                type="url"
                name="author_facebook"
                className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#014D48]"
              />
            </label>
            <label className="block">
              <span className="text-[#001C27]">Instagram</span>
              <input
                type="url"
                name="author_instagram"
                className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#014D48]"
              />
            </label>
          </div>
        </fieldset>

        <button
          type="submit"
          className="w-full bg-[#014D48] text-white py-2 rounded-lg hover:bg-[#FA8649] transition mt-6"
        >
          Submit Ad
        </button>
      </form>
      </div>
    </div>
  );
};

export default PostEvents;
