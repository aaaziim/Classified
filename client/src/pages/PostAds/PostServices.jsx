import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Components/Breadcrumb';
import { Helmet } from 'react-helmet-async';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import LoadingSpinner from '../Components/LoadingSpinner';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';

const PostServices = () => {

    const {user} =useAuth()

    const [locations, setLocations] = useState([]);
    const [country, setCountry] = useState("");
    const [stateIndex, setStateIndex] = useState(0);
    const [categoryIndex, setCategoryIndex] = useState(0);
    const [state, setState] = useState();
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingLocations, setLoadingLocations] = useState(true);
  const [errorCategories, setErrorCategories] = useState('');
  const [errorLocations, setErrorLocations] = useState('');
  const axiosSecure = useAxiosSecure()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Fetch categories from the API endpoint using the secure axios instance
        const response = await axiosSecure("/categories")
        setCategories(response.data);
        setLoadingCategories(false);
      } catch (err) {
        setErrorCategories('Error loading categories');
        setLoadingCategories(false);
      }
    };

    const fetchLocations = async () => {
      try {
        const response = await axiosSecure("/locations")
        
        setLocations(response.data);
        setLoadingLocations(false);
      } catch (err) {
        setErrorLocations('Error loading locations');
        setLoadingLocations(false);
      }
    };

    fetchCategories();
    fetchLocations();
  }, []);

  if (loadingCategories || loadingLocations) return <div className="text-center text-[#014D48]"><LoadingSpinner></LoadingSpinner></div>;
  if (errorCategories) return <div className="text-center text-[#FA8649]">{errorCategories}</div>;
  if (errorLocations) return <div className="text-center text-[#FA8649]">{errorLocations}</div>;



    
  
    const handleAdPostService = async(e) => {
        e.preventDefault();
        const form = e.target;

        const service = {
            title: form.service_title.value,
            category: form.service_category.value,
            subcategory: form.service_subcategory.value,
            price: form.service_price.value,
            description: form.service_description.value,
            
            country: form.service_country.value,
            state: form.service_state?.value,
            city: form.service_city?.value,
           
            
            posted: new Date().toISOString(),
            author: {
                email: form.author_email.value,
                phone: form.author_phone.value,
                facebook: form.author_facebook.value,
                instagram: form.author_instagram.value,
            },
        };

        try{
            const {data} = await axiosSecure.post(`/services`, service)
            console.log(data)
            toast.success("Service posted successfully")
            navigate("/my-services")
           } catch(err){ 
              toast.error(err.response.data)
           }

         
    };

    return (
        <div className='space-y-4 mb-4'>
            <Helmet>
                <title>Post Service</title>
            </Helmet>

            <Breadcrumb title={'Post a Service'} />

            <form onSubmit={handleAdPostService} className='max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg border-2'>
                <fieldset className='space-y-4'>
                    <legend className='text-lg font-semibold text-[#014D48] mb-4'>Service Details</legend>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <label className='block'>
                            <span className='text-[#001C27]'>Title</span>
                            <input type='text' name='service_title' className='mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]' required />
                        </label>

                        <label className='block'>
                            <span className='text-[#001C27]'>Category</span>
                            <select name='service_category' className='mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]' required
                             onChange={(e) => setCategoryIndex(e.target.selectedIndex - 1)} 
                            >
                                <option value=''>Select Category</option>
                                {
    categories.map((category, index) => (
        <option 
            key={index} 
            value={category.name} 
           // Wrap the function call in an anonymous function
        >
            {category.name}
        </option>
    ))
}
                            </select>
                        </label>

                        <label className='block'>
                            <span className='text-[#001C27]'>Sub-Category</span>
                            <select name='service_subcategory' className='mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]' required>
                                <option value=''>Select Sub-Category</option>
                                {

categories[categoryIndex].subcategories.map((subcategory, index) => (
    <option 
        key={index} 
        value={subcategory.name} 
    >
        {subcategory.name}
    </option>
))
                                }
                            </select>
                        </label>

                        <label className='block'>
                            <span className='text-[#001C27]'>Price</span>
                            <input type='number' name='service_price' className='mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]' required />
                        </label>

                        <label className='block md:col-span-2'>
                            <span className='text-[#001C27]'>Description</span>
                            <textarea name='service_description' className='mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]' required></textarea>
                        </label>

                        <label className='block'>
                            <span className='text-[#001C27]'>Country</span>
                            <select   onChange={(e) => setCountry(e.target.value)} name='service_country' className='mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]' required>
                            <option value=''>Select Country</option>
                            {
    locations.map((location, index) => (
        <option 
            key={index} 
            value={location.name} 
           // Wrap the function call in an anonymous function
        >
            {location.name}
        </option>
    ))
}

                            
                            </select>
                        </label>
                        {
    country === "USA" && (
        <label className="block">
            <span className="text-[#001C27]">State</span>
            <select
                name="service_state"
                className="mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]"
                required
                onChange={(e) => setStateIndex(e.target.selectedIndex - 1)} // ✅ Set stateIndex here
            >
                <option value="">Select State</option>
                {locations.length > 0 && locations[0].state ? (
                    locations[0].state.map((location, index) => (
                        <option key={index} value={location.name}>
                            {location.name}
                        </option>
                    ))
                ) : null}
            </select>
        </label>
    )
}




                        {
                            country === "USA"?
                            <label className='block'>
                            <span className='text-[#001C27]'>City</span>
                            <select name='service_city' className='mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]' required>
                            {
    locations.length > 0 &&
    locations[0].state &&
    stateIndex !== undefined &&
    stateIndex < locations[0].state.length &&
    locations[0].state[stateIndex].cities ? (
        locations[0].state[stateIndex].cities.map((city, index) => (
            <option 
                key={index} 
                value={city.name} 
            >
                {city.name}
            </option>
        ))
    ) : null
}

                            </select>
                        </label> : null
                        }

                        <label className='block'>
                            <span className='text-[#001C27]'>Upload Image</span>
                            <input type='file' name='service_image' className='mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]' />
                        </label>
                    </div>
                </fieldset>

                <fieldset className='space-y-4 mt-6'>
                    <legend className='text-lg font-semibold text-[#014D48] mb-4'>Author Information</legend>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <label className='block'>
                            <span className='text-[#001C27]'>Email</span>
                            <input type='email' name='author_email' className='mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]' defaultValue={user.email} disabled required />
                        </label>
                        <label className='block'>
                            <span className='text-[#001C27]'>Phone</span>
                            <input type='text' name='author_phone' className='mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]' required />
                        </label>
                        <label className='block'>
                            <span className='text-[#001C27]'>Facebook</span>
                            <input type='url' name='author_facebook' className='mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]' />
                        </label>
                        <label className='block'>
                            <span className='text-[#001C27]'>Instagram</span>
                            <input type='url' name='author_instagram' className='mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]' />
                        </label>
                    </div>
                </fieldset>

                <button type='submit' className='w-full bg-[#014D48] text-white py-2 rounded-lg hover:bg-[#FA8649] transition mt-6'>
                    Submit Ad
                </button>
            </form>
        </div>
    );
};

export default PostServices;
