import React from 'react'
import { Link } from 'react-router-dom'

export default function PromoCards() {
  return (
    <section className="py-8 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto max-w-6xl px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Refer a friend card */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-2xl p-6 flex flex-col md:flex-row items-center shadow-md hover:shadow-xl transition-shadow duration-300 border border-purple-200 dark:border-purple-700">
          <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
            <div className="h-20 w-20 bg-purple-200 dark:bg-purple-700 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-purple-600 dark:text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
          <div className="flex-grow text-center md:text-left">
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              Refer friends &amp; earn rewards
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
              Invite your friends to Flightticket and earn credit towards your next trip.
            </p>
            <Link
              to="/refer"
              className="inline-block bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 text-white px-5 py-2.5 rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Start sharing
            </Link>
          </div>
        </div>

        {/* Flightticket Guarantee card */}
        <div className="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900 dark:to-teal-800 rounded-2xl p-6 flex flex-col md:flex-row items-center shadow-md hover:shadow-xl transition-shadow duration-300 border border-teal-200 dark:border-teal-700">
          <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
            <div className="h-20 w-20 bg-teal-200 dark:bg-teal-700 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-teal-600 dark:text-teal-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
          <div className="flex-grow text-center md:text-left">
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              Flightticket Guarantee
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
              Secure booking and rebooking options so you can travel with peace of mind.
            </p>
            <Link
              to="/guarantee"
              className="inline-block bg-teal-600 hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-800 text-white px-5 py-2.5 rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Learn more
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
