import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <div className="mb-8">
          <svg
            className="w-32 h-32 mx-auto text-primary-600 dark:text-primary-400 mb-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <h1 className="text-6xl md:text-8xl font-bold text-gray-900 dark:text-white mb-4">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Oops! Flight Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            It looks like this page took an unexpected detour. Don't worry, we'll help you get back on track!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="btn-primary inline-flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Go Home</span>
          </Link>

          <Link
            to="/contact"
            className="btn-secondary inline-flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Contact Support</span>
          </Link>
        </div>

        {/* Popular Routes Suggestion */}
        <div className="mt-12 pt-12 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            While you're here, why not search for flights?
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { code: 'IST', city: 'Istanbul' },
              { code: 'PAR', city: 'Paris' },
              { code: 'LON', city: 'London' },
              { code: 'BCN', city: 'Barcelona' }
            ].map((destination) => (
              <Link
                key={destination.code}
                to="/"
                className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg p-4 transition-colors border border-gray-200 dark:border-gray-700"
              >
                <div className="text-2xl mb-2">✈️</div>
                <div className="font-semibold text-gray-900 dark:text-white text-sm">
                  {destination.city}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {destination.code}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
