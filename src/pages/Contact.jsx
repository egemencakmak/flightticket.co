import React, { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real application, you would send this to a backend API
    console.log('Contact form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Contact Us
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Have a question or feedback? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
          </p>

          {/* Contact Information */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="flex items-start space-x-3">
              <div className="bg-primary-100 dark:bg-primary-900/30 rounded-lg p-3">
                <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Email</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">support@flightticket.co</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-primary-100 dark:bg-primary-900/30 rounded-lg p-3">
                <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Response Time</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Within 24-48 hours</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-primary-100 dark:bg-primary-900/30 rounded-lg p-3">
                <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Support</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Available worldwide</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="How can we help you?"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="input-field resize-none"
                placeholder="Tell us more about your inquiry..."
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={submitted}
                className="btn-primary w-full md:w-auto"
              >
                {submitted ? (
                  <span className="flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Message Sent!</span>
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>
            </div>
          </form>

          {/* FAQ Section */}
          <div className="mt-12 pt-12 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              <details className="group bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <summary className="font-semibold text-gray-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
                  <span>How do I book a flight?</span>
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-3 text-gray-700 dark:text-gray-300 text-sm">
                  After searching for flights on Flightticket.co, you'll see results from our partner booking platforms.
                  Click on any flight to be redirected to the booking site where you can complete your purchase securely.
                </p>
              </details>

              <details className="group bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <summary className="font-semibold text-gray-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
                  <span>Can I cancel or modify my booking?</span>
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-3 text-gray-700 dark:text-gray-300 text-sm">
                  Since bookings are made directly with our partner platforms, you'll need to contact them for any
                  changes or cancellations. Check your booking confirmation email for their contact information.
                </p>
              </details>

              <details className="group bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <summary className="font-semibold text-gray-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
                  <span>Why are prices different from what I saw initially?</span>
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-3 text-gray-700 dark:text-gray-300 text-sm">
                  Flight prices change constantly based on availability and demand. The prices shown on our site are
                  updated in real-time, but may change slightly when you click through to book. We always show the
                  most current prices available.
                </p>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
