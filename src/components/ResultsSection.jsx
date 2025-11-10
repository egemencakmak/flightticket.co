import React, { useEffect, useState } from 'react'
import { generateAffiliateUrl, formatDateDisplay } from '../utils/format'

export default function ResultsSection({ searchParams }) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Reset states
    setLoading(true)
    setError(null)

    // Check if Travelpayouts embed script is loaded
    const checkScript = () => {
      // Wait a bit for the script to initialize
      setTimeout(() => {
        const widgetRoot = document.getElementById('tp-widget-root')

        if (widgetRoot) {
          // Clear previous results
          widgetRoot.innerHTML = ''

          // Try to initialize Travelpayouts widget
          // Note: The exact initialization depends on Travelpayouts API
          // If they provide a global init function, call it here

          // For now, we'll show the affiliate link as a fallback
          // and embed iframe if available
          const affiliateUrl = generateAffiliateUrl(searchParams)

          // Check if window.TP_EMBARS exists (from the embed script)
          if (typeof window.TP_EMBARS !== 'undefined' && window.TP_EMBARS.init) {
            try {
              // Initialize Travelpayouts embed with search parameters
              window.TP_EMBARS.init({
                container: 'tp-widget-root',
                origin: searchParams.origin,
                destination: searchParams.destination,
                departDate: searchParams.departureDate,
                returnDate: searchParams.returnDate || null,
                adults: searchParams.adults,
                children: searchParams.children || 0,
                infants: searchParams.infants || 0
              })
              setLoading(false)
            } catch (err) {
              console.error('TP_EMBARS init error:', err)
              setError('Failed to load search results. Please try again.')
              setLoading(false)
            }
          } else {
            // Fallback: Create an iframe or direct link
            const iframe = document.createElement('iframe')
            iframe.src = affiliateUrl
            iframe.style.width = '100%'
            iframe.style.height = '800px'
            iframe.style.border = 'none'
            iframe.style.borderRadius = '12px'
            iframe.setAttribute('allow', 'payment')

            iframe.onload = () => setLoading(false)
            iframe.onerror = () => {
              setError('Failed to load search results.')
              setLoading(false)
            }

            widgetRoot.appendChild(iframe)
          }
        } else {
          setError('Widget container not found.')
          setLoading(false)
        }
      }, 500)
    }

    checkScript()
  }, [searchParams])

  const affiliateUrl = generateAffiliateUrl(searchParams)

  return (
    <div>
      {/* Search Summary */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Flight Results
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {searchParams.origin} → {searchParams.destination}
          {' • '}
          {formatDateDisplay(searchParams.departureDate)}
          {searchParams.returnDate && (
            <> - {formatDateDisplay(searchParams.returnDate)}</>
          )}
          {' • '}
          {searchParams.adults + searchParams.children + searchParams.infants} passenger(s)
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="card text-center py-12">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Searching for the best flights...
          </p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="card bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <div className="flex items-start space-x-3">
            <svg className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="font-semibold text-red-900 dark:text-red-200 mb-1">
                Error Loading Results
              </h3>
              <p className="text-red-700 dark:text-red-300 mb-3">
                {error}
              </p>
              <a
                href={affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:underline font-semibold"
              >
                <span>Try opening in a new window</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Travelpayouts Widget Container */}
      <div id="tp-widget-root" className={loading || error ? 'hidden' : ''}></div>

      {/* Manual Search Link (Fallback) */}
      {!loading && !error && (
        <div className="mt-6 text-center">
          <a
            href={affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
          >
            <span>Not seeing results? Click here to search directly</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      )}
    </div>
  )
}
