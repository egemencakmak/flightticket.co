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

const SearchField = ({ id, label, value, onChange, placeholder, error, suggestions, onSuggestionClick, icon }) => {
  const ref = useRef(null)

  return (
    <div className="relative" ref={ref}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
          {icon}
        </span>
        <input
          type="text"
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`input-field pl-10 ${error ? 'border-red-500' : ''}`}
          autoComplete="off"
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      {suggestions}
    </div>
  )
}

export default function SearchBar({ onSearch }) {
  const [tripType, setTripType] = useState('round-trip')
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

  const today = new Date().toISOString().split('T')[0]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))

    if (name === 'origin' || name === 'destination') {
      const suggestions = value.length >= 2
        ? POPULAR_AIRPORTS.filter(airport =>
            airport.code.toLowerCase().includes(value.toLowerCase()) ||
            airport.city.toLowerCase().includes(value.toLowerCase())
          )
        : []

      if (name === 'origin') {
        setOriginSuggestions(suggestions)
        setShowOriginSuggestions(true)
      } else {
        setDestinationSuggestions(suggestions)
        setShowDestinationSuggestions(true)
      }
    }
  }

  const handleSuggestionClick = (field, airport) => {
    setFormData(prev => ({ ...prev, [field]: airport.code }))
    if (field === 'origin') {
      setShowOriginSuggestions(false)
    } else {
      setShowDestinationSuggestions(false)
    }
  }

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

  const validate = () => {
    const newErrors = {}
    if (!formData.origin) newErrors.origin = 'Origin is required'
    if (!formData.destination) newErrors.destination = 'Destination is required'
    if (formData.origin === formData.destination) newErrors.destination = 'Cannot be same as origin'
    if (!formData.departureDate) newErrors.departureDate = 'Departure date is required'
    if (tripType === 'round-trip' && !formData.returnDate) {
      newErrors.returnDate = 'Return date is required for round trips'
    }
    const totalPassengers = parseInt(formData.adults) + parseInt(formData.children) + parseInt(formData.infants);
    if (totalPassengers < 1 || totalPassengers > 9) {
      newErrors.passengers = 'Total passengers must be between 1 and 9';
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    saveRecentSearch(formData)
    onSearch(formData)
  }

  const renderSuggestions = (field, suggestions) => (
    suggestions.length > 0 && (
      <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 max-h-60 overflow-y-auto">
        {suggestions.map(airport => (
          <button
            key={airport.code}
            type="button"
            onClick={() => handleSuggestionClick(field, airport)}
            className="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <div className="font-semibold">{airport.city} ({airport.code})</div>
            <div className="text-sm text-gray-500">{airport.country}</div>
          </button>
        ))}
      </div>
    )
  )

  return (
    <div className="relative -mt-32 z-30">
        <div className="container mx-auto px-4 max-w-5xl">
            <div className="card shadow-2xl">
                {/* Trip Type Tabs */}
                <div className="flex mb-6 border-b border-gray-200 dark:border-gray-700">
                    {['round-trip', 'one-way'].map(type => (
                        <button
                            key={type}
                            onClick={() => setTripType(type)}
                            className={`px-6 py-3 font-medium text-sm transition-colors ${
                                tripType === type
                                ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400'
                                : 'text-gray-600 dark:text-gray-400 hover:text-blue-600'
                            }`}
                        >
                            {type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </button>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Origin */}
                        <div ref={originRef}>
                            <SearchField
                                id="origin"
                                label="From"
                                value={formData.origin}
                                onChange={handleChange}
                                placeholder="e.g., IST"
                                error={errors.origin}
                                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>}
                                suggestions={showOriginSuggestions && renderSuggestions('origin', originSuggestions)}
                            />
                        </div>

                        {/* Destination */}
                        <div ref={destinationRef}>
                            <SearchField
                                id="destination"
                                label="To"
                                value={formData.destination}
                                onChange={handleChange}
                                placeholder="e.g., PAR"
                                error={errors.destination}
                                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 A.01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>}
                                suggestions={showDestinationSuggestions && renderSuggestions('destination', destinationSuggestions)}
                            />
                        </div>

                        {/* Dates */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="departureDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Depart</label>
                                <input type="date" name="departureDate" value={formData.departureDate} onChange={handleChange} min={today} className={`input-field ${errors.departureDate ? 'border-red-500' : ''}`} />
                                {errors.departureDate && <p className="mt-1 text-sm text-red-600">{errors.departureDate}</p>}
                            </div>
                            <div>
                                <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Return</label>
                                <input type="date" name="returnDate" value={formData.returnDate} onChange={handleChange} min={formData.departureDate || today} className={`input-field ${errors.returnDate ? 'border-red-500' : ''}`} disabled={tripType === 'one-way'} />
                                {errors.returnDate && <p className="mt-1 text-sm text-red-600">{errors.returnDate}</p>}
                            </div>
                        </div>

                        {/* Passengers */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Passengers</label>
                            <div className="grid grid-cols-3 gap-2">
                                {['adults', 'children', 'infants'].map(type => (
                                    <div key={type}>
                                        <label className="text-xs text-gray-500 capitalize">{type}</label>
                                        <select name={type} value={formData[type]} onChange={handleChange} className="input-field">
                                            {[...Array(10).keys()].slice(type === 'adults' ? 1 : 0).map(i => <option key={i} value={i}>{i}</option>)}
                                        </select>
                                    </div>
                                ))}
                            </div>
                             {errors.passengers && <p className="mt-2 text-sm text-red-600">{errors.passengers}</p>}
                        </div>
                    </div>

                    <button type="submit" className="btn-primary w-full text-lg">
                        Search Flights
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}