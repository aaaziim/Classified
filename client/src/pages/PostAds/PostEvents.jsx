import React from 'react';
import Breadcrumb from '../Components/Breadcrumb';
import { Helmet } from 'react-helmet-async';

const PostEvents = () => {
  const handleAdPostEvent = (e) => {
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
      state: form.event_state.value,
      city: form.event_city.value,
      image: form.event_image.value,
      posted: new Date().toISOString(),
      host: {
        email: form.author_email.value,
        phone: form.author_phone.value,
        facebook: form.author_facebook.value,
        instagram: form.author_instagram.value,
      },
    };
    console.table(event);
  };

  return (
    <div className='space-y-4 mb-4'>
      <Helmet>
        <title>Post Event</title>
      </Helmet>
      <Breadcrumb title={'Post an Event'} />

      <form onSubmit={handleAdPostEvent} className='max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg border-2 border-[#014D48]'>
        <fieldset className='space-y-4'>
          <legend className='text-lg font-semibold text-[#001C27] mb-4'>Event Details</legend>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <label className='block'>
              <span className='text-[#001C27]'>Title</span>
              <input type='text' name='event_title' required className='mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#014D48]' />
            </label>
            <label className='block'>
              <span className='text-[#001C27]'>Category</span>
              <select name='event_category' required className='mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#014D48]'>
                <option value=''>Select Category</option>
                <option value='Cleaning'>Cleaning</option>
                <option value='Repair'>Repair</option>
                <option value='IT Support'>IT Support</option>
              </select>
            </label>
            <label className='block'>
              <span className='text-[#001C27]'>Sub-Category</span>
              <select name='event_subcategory' required className='mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#014D48]'>
                <option value='sub'>Select Sub-Category</option>
              </select>
            </label>
            <label className='block'>
              <span className='text-[#001C27]'>Price</span>
              <input type='number' name='event_price' required className='mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#014D48]' />
            </label>
            <label className='block md:col-span-2'>
              <span className='text-[#001C27]'>Description</span>
              <textarea name='event_description' required className='mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#014D48]'></textarea>
            </label>
            <label className='block'>
              <span className='text-[#001C27]'>Event Starts</span>
              <input type='date' name='event_start_date' required className='mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#014D48]' />
            </label>
            <label className='block'>
              <span className='text-[#001C27]'>Event Ends</span>
              <input type='date' name='event_end_date' required className='mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#014D48]' />
            </label>
            <label className='block'>
              <span className='text-[#001C27]'>State</span>
              <select name='event_state' required className='mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#014D48]'>
                <option value='a'>Select State</option>
              </select>
            </label>
            <label className='block'>
              <span className='text-[#001C27]'>City</span>
              <select name='event_city' required className='mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#014D48]'>
                <option value='a'>Select City</option>
              </select>
            </label>
            <label className='block'>
              <span className='text-[#001C27]'>Upload Image</span>
              <input type='file' name='event_image' required className='mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#014D48]' />
            </label>
          </div>
        </fieldset>

        <fieldset className='space-y-4 mt-6'>
          <legend className='text-lg font-semibold text-[#001C27] mb-4'>Host Information</legend>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <label className='block'>
              <span className='text-[#001C27]'>Email</span>
              <input type='email' name='author_email' required className='mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#014D48]' />
            </label>
            <label className='block'>
              <span className='text-[#001C27]'>Phone</span>
              <input type='text' name='author_phone' required className='mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#014D48]' />
            </label>
            <label className='block'>
              <span className='text-[#001C27]'>Facebook</span>
              <input type='url' name='author_facebook' className='mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#014D48]' />
            </label>
            <label className='block'>
              <span className='text-[#001C27]'>Instagram</span>
              <input type='url' name='author_instagram' className='mt-1 block w-full border rounded-lg p-2 focus:ring focus:ring-[#014D48]' />
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

export default PostEvents;
