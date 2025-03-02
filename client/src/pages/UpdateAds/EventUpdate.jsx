import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Components/Breadcrumb';
import { Helmet } from 'react-helmet-async';
import LoadingSpinner from '../Components/LoadingSpinner';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const EventUpdate = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [event, setEvent] = useState({});
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [adCountry, setAdCountry] = useState('');
  const [stateIndex, setStateIndex] = useState(-1);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventRes, categoriesRes, locationsRes] = await Promise.all([
          axiosSecure(`/event/${id}`),
          axiosSecure("/categories"),
          axiosSecure("/locations")
        ]);

        setEvent(eventRes.data);
        setCategories(categoriesRes.data);
        setLocations(locationsRes.data);
        setSelectedCategory(eventRes.data.category || '');
        setSelectedSubcategory(eventRes.data.subcategory || '');
        setAdCountry(eventRes.data.country || '');
        setSelectedState(eventRes.data.state || '');
        setSelectedCity(eventRes.data.city || '');

        setLoading(false);
      } catch (err) {
        setError('Error loading data');
        setLoading(false);
      }
    };

    fetchData();
  }, [id, axiosSecure]);

  if (loading) return <div className="text-center text-[#014D48]"><LoadingSpinner /></div>;
  if (error) return <div className="text-center text-[#FA8649]">{error}</div>;

  const handleCategoryChange = (e) => {
    const selectedCat = e.target.value;
    setSelectedCategory(selectedCat);
    setSelectedSubcategory(''); // Reset subcategory when category changes
  };

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setAdCountry(selectedCountry);
    setSelectedState('');  // Reset state
    setSelectedCity('');   // Reset city
    setStateIndex(-1);     // Reset state index
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setSelectedState(selectedState);
    setSelectedCity('');   // Reset city when state changes

    // Find the new state index based on the selected country
    const country = locations.find((loc) => loc.name === adCountry);
    if (country) {
      const newStateIndex = country.state.findIndex((st) => st.name === selectedState);
      setStateIndex(newStateIndex);
    }
  };

  const handleEventUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedEvent = {
      title: form.event_title.value,
      category: selectedCategory,
      subcategory: selectedSubcategory,
      price: form.event_price.value,
      startDate: form.event_start_date.value,
      endDate: form.event_end_date.value,
      description: form.event_description.value,
      country: form.event_country.value,
      state: form.event_state?.value || null,
      city: form.event_city?.value || null,
    };

    if (updatedEvent.country !== "USA") {
      updatedEvent.state = null;
      updatedEvent.city = null;
    }

    try {
      await axiosSecure.put(`/event-update/${id}`, updatedEvent);
      toast.success("Event updated successfully");
      navigate("/my-events");
    } catch (err) {
      toast.error(err.response?.data || "Error updating event");
    }
  };

  return (
    <div>
      <Helmet>
        <title>Update Event</title>
      </Helmet>

      <div className="space-y-4 mb-6">
        <Breadcrumb title="Update Event" subTitle="Here you can update your event information" />
      </div>

      <form onSubmit={handleEventUpdate} className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-[#014D48] mb-4">
        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold text-[#014D48] mb-4">Event Details</legend>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="block">
              <span className="text-[#001C27]">Title</span>
              <input type="text" name="event_title" className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]" required defaultValue={event.title} />
            </label>

            {/* Category Selection */}
            <label className="block">
              <span className="text-[#001C27]">Choose Category</span>
              <select
                name="event_category"
                className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]"
                required
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="">Select Category</option>
                {categories.map((cat, index) => (
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
                name="event_subcategory"
                className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]"
                required
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
              >
                <option value="">Select Sub-Category</option>
                {categories.find(cat => cat.name === selectedCategory)?.subcategories.map((sub, index) => (
                  <option key={index} value={sub.name}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-[#001C27]">Price</span>
              <input type="number" name="event_price" className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]" required defaultValue={event.price} />
            </label>

            <label className='block'>
              <span className='text-[#001C27]'>Event Starts</span>
              <input type='date' name='event_start_date' required className='mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#014D48]' defaultValue={event.startDate} />
            </label>
            <label className='block'>
              <span className='text-[#001C27]'>Event Ends</span>
              <input type='date' name='event_end_date' required className='mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#014D48]' defaultValue={event.endDate} />
            </label>

            <label className="block md:col-span-2">
              <span className="text-[#001C27]">Description</span>
              <textarea name="event_description" className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]" required defaultValue={event.description}></textarea>
            </label>

            {/* Image Upload */}
            <label className="block">
              <span className="text-[#001C27]">Upload Image</span>
              <input type="file" name="event_image" className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]" />
            </label>

            {/* Country Selection */}
            <label className="block">
              <span className="text-[#001C27]">Country</span>
              <select
                name="event_country"
                className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]"
                required
                value={adCountry}
                onChange={handleCountryChange}
              >
                <option value="">Select Country</option>
                {locations.map((location, index) => (
                  <option key={index} value={location.name}>
                    {location.name}
                  </option>
                ))}
              </select>
            </label>

            {/* State Selection */}
            {adCountry ==="USA" && (
              <label className="block">
                <span className="text-[#001C27]">State</span>
                <select
                  name="event_state"
                  className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]"
                  required
                  value={selectedState}
                  onChange={handleStateChange}
                >
                  <option value="">Select State</option>
                  {locations.find(loc => loc.name === adCountry)?.state.map((state, index) => (
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
                  name="event_city"
                  className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]"
                  required
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  <option value="">Select City</option>
                  {locations.find(loc => loc.name === adCountry)
                    ?.state.find(st => st.name === selectedState)
                    ?.cities.map((city, index) => (
                      <option key={index} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                </select>
              </label>
            )}

          </div>
        </fieldset>

        <button type="submit" className="w-full bg-[#FA8649] text-white py-2 rounded-lg hover:bg-[#E06D36] transition mt-6">
          Update Event
        </button>
      </form>
    </div>
  );
};

export default EventUpdate;
