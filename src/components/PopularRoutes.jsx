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
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 text-center tracking-tight">
        Popular Routes
      </h2>
      <p className="text-gray-600 dark:text-gray-400 text-center mb-10 max-w-2xl mx-auto text-lg">
        Quick search for the most popular destinations. Click on any route to search for flights.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {POPULAR_ROUTES.map((route, index) => (
          <button
            key={index}
            onClick={() => handleRouteClick(route)}
            className="group bg-white dark:bg-gray-800 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 dark:hover:from-gray-700 dark:hover:to-gray-750 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-left border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
          >
            <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{route.flag}</div>
            <div className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {route.origin} → {route.destination}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              Quick search
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
