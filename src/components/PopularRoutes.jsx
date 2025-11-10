import React from 'react'

const POPULAR_ROUTES = [
  { origin: 'IST', destination: 'PAR', label: 'Istanbul → Paris', flag: '🇹🇷 → 🇫🇷' },
  { origin: 'IST', destination: 'LON', label: 'Istanbul → London', flag: '🇹🇷 → 🇬🇧' },
  { origin: 'IST', destination: 'BCN', label: 'Istanbul → Barcelona', flag: '🇹🇷 → 🇪🇸' },
  { origin: 'IST', destination: 'AMS', label: 'Istanbul → Amsterdam', flag: '🇹🇷 → 🇳🇱' },
  { origin: 'IST', destination: 'FCO', label: 'Istanbul → Rome', flag: '🇹🇷 → 🇮🇹' },
  { origin: 'IST', destination: 'DXB', label: 'Istanbul → Dubai', flag: '🇹🇷 → 🇦🇪' },
  { origin: 'AYT', destination: 'FRA', label: 'Antalya → Frankfurt', flag: '🇹🇷 → 🇩🇪' },
  { origin: 'ESB', destination: 'MUC', label: 'Ankara → Munich', flag: '🇹🇷 → 🇩🇪' },
]

export default function PopularRoutes({ onRouteClick }) {
  const handleRouteClick = (route) => {
    // Get tomorrow's date for default departure
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const departureDate = tomorrow.toISOString().split('T')[0]

    // Get return date (7 days from departure)
    const returnDateObj = new Date(tomorrow)
    returnDateObj.setDate(returnDateObj.getDate() + 7)
    const returnDate = returnDateObj.toISOString().split('T')[0]

    onRouteClick({
      origin: route.origin,
      destination: route.destination,
      departureDate,
      returnDate,
      adults: 1,
      children: 0,
      infants: 0
    })
  }

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        Popular Routes
      </h2>
      <p className="text-gray-600 dark:text-gray-400 text-center mb-8 max-w-2xl mx-auto">
        Quick search for the most popular destinations. Click on any route to search for flights.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {POPULAR_ROUTES.map((route, index) => (
          <button
            key={index}
            onClick={() => handleRouteClick(route)}
            className="group bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-700 dark:to-gray-800 hover:from-primary-100 hover:to-primary-200 dark:hover:from-gray-600 dark:hover:to-gray-700 rounded-xl p-6 transition-all duration-200 hover:shadow-lg hover:scale-105 text-left border border-primary-200 dark:border-gray-600"
          >
            <div className="text-3xl mb-3">{route.flag}</div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              {route.origin} → {route.destination}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">
              Quick search
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
