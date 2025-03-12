import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Breadcrumb from '../Components/Breadcrumb'
import useAxiosSecure from '../../hooks/useAxiosSecure'

const Contact = () => {
  const axiosSecure = useAxiosSecure()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [responseMessage, setResponseMessage] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setResponseMessage('')

    try {
      // Using axiosSecure to send the request
      const response = await axiosSecure.post('/send-email', formData)

      // Checking the response data for success
      if (response.data.success) {
        setResponseMessage('Your message has been sent successfully!')
      } else {
        setResponseMessage('There was an issue sending your message. Please try again.')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      setResponseMessage('There was an error. Please try again.')
    }

    setIsSubmitting(false)
  }

  return (
    <div>
      <Helmet>
        <title>Contact</title>
      </Helmet>
      <div className='space-y-4 mb-4'>
        <Breadcrumb title="Contact Us" subTitle="Send us a message" />
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md mt-8">
          <h1 className="text-2xl font-semibold text-teal-700 mb-6">Contact Us</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <button
              type="submit"
              className={`w-full py-2 px-4 bg-teal-600 text-white font-semibold rounded-md ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          {responseMessage && (
            <div className={`mt-4 text-sm ${responseMessage.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
              {responseMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Contact
