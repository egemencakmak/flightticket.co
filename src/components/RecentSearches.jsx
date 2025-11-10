import React, { useState, useEffect } from 'react'
import { getRecentSearches, formatDateDisplay } from '../utils/format'

export default function RecentSearches({ onSearchClick }) {
  const [searches, setSearches] = useState([])

  useEffect(() => {
    // Load recent searches on mount
    const loadSearches = () => {
      const recent = getRecentSearches()
      setSearches(recent)
    }

    loadSearches()

    // Listen for storage changes (in case searches are updated in another tab)
    const handleStorageChange = (e) => {
      if (e.key === 'recentSearches') {
        loadSearches()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  if (searches.length === 0) {
    return null
  }

  const handleSearchClick = (search) => {
    // Remove timestamp before passing to parent
    const { timestamp, ...searchParams } = search
    onSearchClick(searchParams)
  }

  const clearSearches = () => {
    localStorage.removeItem('recentSearches')
    setSearches([])
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
          <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Recent Searches</span>
        </h3>
        <button
          onClick={clearSearches}
          className="text-sm text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
        >
          Clear all
        </button>
      </div>

      <div className="space-y-2">
        {searches.map((search, index) => (
          <button
            key={index}
            onClick={() => handleSearchClick(search)}
            className="w-full text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <div>
                <div className="font-medium text-gray-900 dark:text-white group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">
                  {search.origin} → {search.destination}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDateDisplay(search.departureDate)}
                  {search.returnDate && (
                    <> - {formatDateDisplay(search.returnDate)}</>
                  )}
                  {' • '}
                  {search.adults + search.children + search.infants} pax
                </div>
              </div>
            </div>
            <svg className="w-5 h-5 text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  )
}
