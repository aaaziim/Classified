import React, { useState } from 'react';
import Breadcrumb from '../Components/Breadcrumb';
import { Helmet } from 'react-helmet-async';

const PostServices = () => {
    const [serviceImage, setServiceImage] = useState(null);

    const handleImageChange = (e) => {
        setServiceImage(e.target.files[0]);
    };

    const handleAdPostService = (e) => {
        e.preventDefault();
        const form = e.target;

        const service = {
            title: form.service_title.value,
            category: form.service_category.value,
            subcategory: form.service_subcategory.value,
            price: form.service_price.value,
            description: form.service_description.value,
            state: form.service_state.value,
            city: form.service_city.value,
            image: serviceImage,
            posted: new Date().toISOString(),
            author: {
                email: form.author_email.value,
                phone: form.author_phone.value,
                facebook: form.author_facebook.value,
                instagram: form.author_instagram.value,
            },
        };

        console.table(service);
        form.reset();
        setServiceImage(null);
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
                            <select name='service_category' className='mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]' required>
                                <option value=''>Select Category</option>
                                <option value='Cleaning'>Cleaning</option>
                                <option value='Repair'>Repair</option>
                                <option value='IT Support'>IT Support</option>
                            </select>
                        </label>

                        <label className='block'>
                            <span className='text-[#001C27]'>Sub-Category</span>
                            <select name='service_subcategory' className='mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]' required>
                                <option value=''>Select Sub-Category</option>
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
                            <span className='text-[#001C27]'>State</span>
                            <select name='service_state' className='mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]' required>
                                <option value=''>Select State</option>
                            </select>
                        </label>

                        <label className='block'>
                            <span className='text-[#001C27]'>City</span>
                            <select name='service_city' className='mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]' required>
                                <option value=''>Select City</option>
                            </select>
                        </label>

                        <label className='block'>
                            <span className='text-[#001C27]'>Upload Image</span>
                            <input type='file' name='service_image' onChange={handleImageChange} className='mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]' />
                        </label>
                    </div>
                </fieldset>

                <fieldset className='space-y-4 mt-6'>
                    <legend className='text-lg font-semibold text-[#014D48] mb-4'>Author Information</legend>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <label className='block'>
                            <span className='text-[#001C27]'>Email</span>
                            <input type='email' name='author_email' className='mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#FA8649]' required />
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
