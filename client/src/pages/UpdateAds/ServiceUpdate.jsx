import React, { useEffect, useState } from "react";
import Breadcrumb from "../Components/Breadcrumb";
import LoadingSpinner from "../Components/LoadingSpinner";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import DynamicTitlePage from "../Components/DynamicTitlePage";

const ServiceUpdate = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [service, setService] = useState({});
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [profile, setProfile] = useState({})

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [adCountry, setAdCountry] = useState("");
  const [stateIndex, setStateIndex] = useState(-1);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {

    const getProfile = async () =>{
        const result = await axiosSecure(`/userprofile`)
        setProfile(result);
        
    }
    const fetchData = async () => {
      try {
        const [serviceRes, categoriesRes, locationsRes] = await Promise.all([
          axiosSecure(`/service/${id}`),
          axiosSecure("/categories"),
          axiosSecure("/locations"),
        ]);

        setService(serviceRes.data);
        setCategories(categoriesRes.data);
        setLocations(locationsRes.data);
        setSelectedCategory(serviceRes.data.category || "");
        setSelectedSubcategory(serviceRes.data.subcategory || "");
        setAdCountry(serviceRes.data.country || "");
        setSelectedState(serviceRes.data.state || "");
        setSelectedCity(serviceRes.data.city || "");

        setLoading(false);
      } catch (err) {
        setError("Error loading data");
        setLoading(false);
      }
    };
    getProfile()
    fetchData();
  }, [id, axiosSecure]);
  // Access Check: Triggered once on component mount

  if (loading)
    return (
      <div className="text-center text-[#014D48]">
        <LoadingSpinner />
      </div>
    );
  if (error) return <div className="text-center text-[#FA8649]">{error}</div>;

  const handleCategoryChange = (e) => {
    const selectedCat = e.target.value;
    setSelectedCategory(selectedCat);
    setSelectedSubcategory(""); // Reset subcategory when category changes
  };

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setAdCountry(selectedCountry);
    setSelectedState(""); // Reset state
    setSelectedCity(""); // Reset city
    setStateIndex(-1); // Reset state index
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setSelectedState(selectedState);
    setSelectedCity(""); // Reset city when state changes

    // Find the new state index based on the selected country
    const country = locations.find((loc) => loc.name === adCountry);
    if (country) {
      const newStateIndex = country.state.findIndex(
        (st) => st.name === selectedState
      );
      setStateIndex(newStateIndex);
    }
  };

  // const handleServiceUpdate = async (e) => {
  //   e.preventDefault();
  //   const form = e.target;

  //   const updatedService = {
  //     title: form.service_title.value,
  //     category: selectedCategory,
  //     subcategory: selectedSubcategory,
  //     price: form.service_price.value,
  //     description: form.service_description.value,
  //     country: form.service_country.value,
  //     state: form.service_state?.value || "",
  //     city: form.service_city?.value || "",
  //   };

  //   if (updatedService.country !== "USA") {
  //     updatedService.state = "";
  //     updatedService.city = "";
  //   }

  //   try {
  //     await axiosSecure.put(`/service-update/${id}`, updatedService);
  //     toast.success("Service updated successfully");
  //     navigate("/my-services");
  //   } catch (err) {
  //     toast.error(err.response?.data || "Error updating service");
  //   }
  // };

  const handleServiceUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedService = {
      title: form.service_title.value,
      category: selectedCategory,
      subcategory: selectedSubcategory,
      price: form.service_price.value,
      description: form.service_description.value,
      country: form.service_country.value,
      state: form.service_state?.value || "",
      city: form.service_city?.value || "",
      author: {
        email: form.author_email.value,
        business_email: form.author_business_email.value,
        phone: form.author_phone.value,
        facebook: form.author_facebook.value,
        instagram: form.author_instagram.value,
      },
       // Check if new images were uploaded; if not, use existing images
       images: service.images || [] // Use existing images if no new ones are uploaded
    };

    const imageFiles = form.service_image.files;
    if (imageFiles.length > 0) {
      // Upload new images to Cloudinary
      const imageUploadPromises = [...imageFiles].map(async (file) => {
        const imageData = new FormData();
        imageData.append("file", file);
        imageData.append("upload_preset", "SideGuru"); // Cloudinary preset
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
  
      // Filter out any failed uploads (null values)
      updatedService.images = uploadedImageUrls.filter((url) => url !== null);
    }
 

    try {
      await axiosSecure.put(`/service-update/${id}`, updatedService);
      toast.success("Service updated successfully");
      navigate("/my-services");
    } catch (err) {
      toast.error(err.response?.data || "Error updating service");
    }
  };
 
  if (service?.author?.email !== user?.email && !profile.data.isAdmin) {
    toast.error("You Don't Have Access to this");
    navigate("/my-services");
  }
  
  return (
    <div>
       <DynamicTitlePage title={`Update | ${service.title} | SideGurus`} />
      <div className="space-y-4 mb-6">
        <Breadcrumb
          title="Update Service"
          subTitle="Here you can update your service information"
        />
      </div>

     <div className="px-4">
     <form
        onSubmit={handleServiceUpdate}
        className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-[#014D48] mb-4"
      >
        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold text-[#014D48] mb-4">
            Service Details
          </legend>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="block">
              <span className="text-[#001C27]">Title</span>
              <input
                type="text"
                name="service_title"
                className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]"
                required
                defaultValue={service.title}
              />
            </label>

            {/* Category Selection */}
            <label className="block">
              <span className="text-[#001C27]">Choose Category</span>
              <select
                name="service_category"
                className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]"
                required
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="">Select Category</option>
                {categories?.map((cat, index) => (
                  <option key={index} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </label>

            {/* Subcategory Selection */}
            <label className="block">
              <span className="text-[#001C27]">Choose Sub-Category</span>
              <select
                name="service_subcategory"
                className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]"
                required
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
              >
                <option value="">Select Sub-Category</option>
                {categories
                  .find((cat) => cat.name === selectedCategory)
                  ?.subcategories.map((sub, index) => (
                    <option key={index} value={sub.name}>
                      {sub.name}
                    </option>
                  ))}
              </select>
            </label>

            <label className="block">
              <span className="text-[#001C27]">Price</span>
              <input
                type="number"
                name="service_price"
                className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]"
                required
                defaultValue={service.price}
              />
            </label>

            <label className="block md:col-span-2">
              <span className="text-[#001C27]">Description</span>
              <textarea
                name="service_description"
                className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]"
                required
                defaultValue={service.description}
              ></textarea>
            </label>

            {/* Image Upload */}
            <label className="block">
              <span className="text-[#001C27]">Upload Images</span>
              <input
                type="file"
                name="service_image"
                className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]" multiple  
              />
            </label>

            {/* Country Selection */}
            <label className="block">
              <span className="text-[#001C27]">Country</span>
              <select
                name="service_country"
                className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]"
                required
                value={adCountry}
                onChange={handleCountryChange}
              >
                <option value="">Select Country</option>
                {locations?.map((location, index) => (
                  <option key={index} value={location.name}>
                    {location.name}
                  </option>
                ))}
              </select>
            </label>

            {/* State Selection */}
            {adCountry === "USA" && (
              <label className="block">
                <span className="text-[#001C27]">State</span>
                <select
                  name="service_state"
                  className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]"
                  required
                  value={selectedState}
                  onChange={handleStateChange}
                >
                  <option value="">Select State</option>
                  {locations
                    .find((loc) => loc.name === adCountry)
                    ?.state.map((state, index) => (
                      <option key={index} value={state.name}>
                        {state.name}
                      </option>
                    ))}
                </select>
              </label>
            )}

            {/* City Selection */}
            {adCountry && selectedState && (
              <label className="block">
                <span className="text-[#001C27]">City</span>
                <select
                  name="service_city"
                  className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]"
                  required
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  <option value="">Select City</option>
                  {locations
                    .find((loc) => loc.name === adCountry)
                    ?.state.find((st) => st.name === selectedState)
                    ?.cities?.map((city, index) => (
                      <option key={index} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                </select>
              </label>
            )}
          </div>
        </fieldset>
        <fieldset className="space-y-4 mt-6">
          <legend className="text-lg font-semibold text-[#014D48] mb-4">
            Author Contact Information
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="block">
              <span className="text-[#001C27]">Email</span>
              <input
                type="email"
                name="author_email"
                className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]"
                defaultValue={service.author.email}
                disabled
                required
              />
            </label>
            <label className="block">
              <span className="text-[#001C27]">Business Email</span>
              <input
                type="email"
                name="author_business_email"
                className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]"
                defaultValue={service?.author?.business_email}
              />
            </label>
            <label className="block">
              <span className="text-[#001C27]">Phone</span>
              <input
                type="text"
                name="author_phone"
                className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]"
                required   defaultValue={service.author.phone}
              />
            </label>
            <label className="block">
              <span className="text-[#001C27]">Facebook</span>
              <input
                type="url"
                name="author_facebook"
                defaultValue={service.author.facebook}
                className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]"
              />
            </label>
            <label className="block">
              <span className="text-[#001C27]">Instagram</span>
              <input
                type="url"
                name="author_instagram"
                defaultValue={service.author.instagram}
                className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]"
              />
            </label>
          </div>
        </fieldset>


        <button
          type="submit"
          className="w-full bg-[#FA8649] text-white py-2 rounded-lg hover:bg-[#E06D36] transition mt-6"
        >
          Update Service
        </button>
      </form>
     </div>
    </div>
  );
};

export default ServiceUpdate;
