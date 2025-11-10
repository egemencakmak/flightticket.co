import React, { useState, useRef, useEffect } from 'react'
import { saveRecentSearch } from '../utils/format'

// Popular airports with IATA codes
const POPULAR_AIRPORTS = [
  { code: 'IST', city: 'Istanbul', country: 'Turkey' },
  { code: 'SAW', city: 'Istanbul Sabiha', country: 'Turkey' },
  { code: 'AYT', city: 'Antalya', country: 'Turkey' },
  { code: 'ESB', city: 'Ankara', country: 'Turkey' },
  { code: 'ADB', city: 'Izmir', country: 'Turkey' },
  { code: 'PAR', city: 'Paris', country: 'France' },
  { code: 'CDG', city: 'Paris CDG', country: 'France' },
  { code: 'LON', city: 'London', country: 'UK' },
  { code: 'LHR', city: 'London Heathrow', country: 'UK' },
  { code: 'BCN', city: 'Barcelona', country: 'Spain' },
  { code: 'MAD', city: 'Madrid', country: 'Spain' },
  { code: 'FCO', city: 'Rome', country: 'Italy' },
  { code: 'MIL', city: 'Milan', country: 'Italy' },
  { code: 'AMS', city: 'Amsterdam', country: 'Netherlands' },
  { code: 'FRA', city: 'Frankfurt', country: 'Germany' },
  { code: 'MUC', city: 'Munich', country: 'Germany' },
  { code: 'DXB', city: 'Dubai', country: 'UAE' },
  { code: 'NYC', city: 'New York', country: 'USA' },
  { code: 'JFK', city: 'New York JFK', country: 'USA' },
  { code: 'LAX', city: 'Los Angeles', country: 'USA' },
]

export default function SearchBar({ onSearch }) {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    adults: 1,
    children: 0,
    infants: 0,
  })

  const [showOriginSuggestions, setShowOriginSuggestions] = useState(false)
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false)
  const [originSuggestions, setOriginSuggestions] = useState([])
  const [destinationSuggestions, setDestinationSuggestions] = useState([])
  const [errors, setErrors] = useState({})

  const originRef = useRef(null)
  const destinationRef = useRef(null)

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0]

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))

    // Autocomplete for origin
    if (name === 'origin') {
      if (value.length >= 2) {
        const filtered = POPULAR_AIRPORTS.filter(airport =>
          airport.code.toLowerCase().includes(value.toLowerCase()) ||
          airport.city.toLowerCase().includes(value.toLowerCase())
        )
        setOriginSuggestions(filtered)
        setShowOriginSuggestions(true)
      } else {
        setShowOriginSuggestions(false)
      }
    }

    // Autocomplete for destination
    if (name === 'destination') {
      if (value.length >= 2) {
        const filtered = POPULAR_AIRPORTS.filter(airport =>
          airport.code.toLowerCase().includes(value.toLowerCase()) ||
          airport.city.toLowerCase().includes(value.toLowerCase())
        )
        setDestinationSuggestions(filtered)
        setShowDestinationSuggestions(true)
      } else {
        setShowDestinationSuggestions(false)
      }
    }
  }

  // Handle suggestion click
  const handleSuggestionClick = (field, airport) => {
    setFormData(prev => ({ ...prev, [field]: airport.code }))
    if (field === 'origin') {
      setShowOriginSuggestions(false)
    } else {
      setShowDestinationSuggestions(false)
    }
  }

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (originRef.current && !originRef.current.contains(e.target)) {
        setShowOriginSuggestions(false)
      }
      if (destinationRef.current && !destinationRef.current.contains(e.target)) {
        setShowDestinationSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Validate form
  const validate = () => {
    const newErrors = {}

    if (!formData.origin || formData.origin.length < 3) {
      newErrors.origin = 'Please enter a valid origin airport (IATA code)'
    }

    if (!formData.destination || formData.destination.length < 3) {
      newErrors.destination = 'Please enter a valid destination airport (IATA code)'
    }

    if (formData.origin === formData.destination) {
      newErrors.destination = 'Destination must be different from origin'
    }

    if (!formData.departureDate) {
      newErrors.departureDate = 'Please select a departure date'
    }

    const totalPassengers = formData.adults + formData.children + formData.infants
    if (totalPassengers < 1 || totalPassengers > 9) {
      newErrors.passengers = 'Total passengers must be between 1 and 9'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    // Save to recent searches
    saveRecentSearch(formData)

    // Call parent onSearch handler
    onSearch(formData)
  }

  return (
    <div className="card shadow-2xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Origin and Destination */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Origin */}
          <div ref={originRef} className="relative">
            <label htmlFor="origin" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              From
            </label>
            <div className="relative">
              <input
                type="text"
                id="origin"
                name="origin"
                value={formData.origin}
                onChange={handleChange}
                placeholder="City or IATA code (e.g., IST)"
                className={`input-field ${errors.origin ? 'border-red-500 ring-red-500' : ''}`}
                autoComplete="off"
              />
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            {errors.origin && (
              <p className="mt-1 text-sm text-red-600">{errors.origin}</p>
            )}

            {/* Origin Suggestions */}
            {showOriginSuggestions && originSuggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 max-h-60 overflow-y-auto">
                {originSuggestions.map(airport => (
                  <button
                    key={airport.code}
                    type="button"
                    onClick={() => handleSuggestionClick('origin', airport)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors border-b border-gray-100 dark:border-gray-600 last:border-b-0"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {airport.city}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {airport.country}
                        </div>
                      </div>
                      <div className="text-primary-600 dark:text-primary-400 font-mono font-bold">
                        {airport.code}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Destination */}
          <div ref={destinationRef} className="relative">
            <label htmlFor="destination" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              To
            </label>
            <div className="relative">
              <input
                type="text"
                id="destination"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                placeholder="City or IATA code (e.g., PAR)"
                className={`input-field ${errors.destination ? 'border-red-500 ring-red-500' : ''}`}
                autoComplete="off"
              />
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            {errors.destination && (
              <p className="mt-1 text-sm text-red-600">{errors.destination}</p>
            )}

            {/* Destination Suggestions */}
            {showDestinationSuggestions && destinationSuggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 max-h-60 overflow-y-auto">
                {destinationSuggestions.map(airport => (
                  <button
                    key={airport.code}
                    type="button"
                    onClick={() => handleSuggestionClick('destination', airport)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors border-b border-gray-100 dark:border-gray-600 last:border-b-0"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {airport.city}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {airport.country}
                        </div>
                      </div>
                      <div className="text-primary-600 dark:text-primary-400 font-mono font-bold">
                        {airport.code}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Departure Date */}
          <div>
            <label htmlFor="departureDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Departure Date
            </label>
            <input
              type="date"
              id="departureDate"
              name="departureDate"
              value={formData.departureDate}
              onChange={handleChange}
              min={today}
              className={`input-field ${errors.departureDate ? 'border-red-500 ring-red-500' : ''}`}
            />
            {errors.departureDate && (
              <p className="mt-1 text-sm text-red-600">{errors.departureDate}</p>
            )}
          </div>

          {/* Return Date */}
          <div>
            <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Return Date <span className="text-gray-500">(optional)</span>
            </label>
            <input
              type="date"
              id="returnDate"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleChange}
              min={formData.departureDate || today}
              className="input-field"
            />
          </div>
        </div>

        {/* Passengers */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Passengers
          </label>
          <div className="grid grid-cols-3 gap-4">
            {/* Adults */}
            <div>
              <label htmlFor="adults" className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                Adults (12+)
              </label>
              <select
                id="adults"
                name="adults"
                value={formData.adults}
                onChange={handleChange}
                className="input-field"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            {/* Children */}
            <div>
              <label htmlFor="children" className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                Children (2-11)
              </label>
              <select
                id="children"
                name="children"
                value={formData.children}
                onChange={handleChange}
                className="input-field"
              >
                {[0, 1, 2, 3, 4].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            {/* Infants */}
            <div>
              <label htmlFor="infants" className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                Infants (0-2)
              </label>
              <select
                id="infants"
                name="infants"
                value={formData.infants}
                onChange={handleChange}
                className="input-field"
              >
                {[0, 1, 2].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
          </div>
          {errors.passengers && (
            <p className="mt-2 text-sm text-red-600">{errors.passengers}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn-primary w-full text-lg flex items-center justify-center space-x-2"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span>Search Flights</span>
        </button>
      </form>
    </div>
  )
}
