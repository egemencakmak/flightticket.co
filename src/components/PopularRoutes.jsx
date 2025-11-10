import React from 'react'

const POPULAR_ROUTES = [
  { origin: 'IST', destination: 'PAR', label: 'Istanbul → Paris', flag: '🇹🇷 → 🇫🇷', image: '/images/routes/IST-PAR.jpg' },
  { origin: 'IST', destination: 'LON', label: 'Istanbul → London', flag: '🇹🇷 → 🇬🇧', image: '/images/routes/IST-LON.jpg' },
  { origin: 'IST', destination: 'BCN', label: 'Istanbul → Barcelona', flag: '🇹🇷 → 🇪🇸', image: '/images/routes/IST-BCN.jpg' },
  { origin: 'IST', destination: 'AMS', label: 'Istanbul → Amsterdam', flag: '🇹🇷 → 🇳🇱', image: '/images/routes/IST-AMS.jpg' },
  { origin: 'IST', destination: 'FCO', label: 'Istanbul → Rome', flag: '🇹🇷 → 🇮🇹', image: '/images/routes/IST-FCO.jpg' },
  { origin: 'IST', destination: 'DXB', label: 'Istanbul → Dubai', flag: '🇹🇷 → 🇦🇪', image: '/images/routes/IST-DXB.jpg' },
  { origin: 'AYT', destination: 'FRA', label: 'Antalya → Frankfurt', flag: '🇹🇷 → 🇩🇪', image: '/images/routes/AYT-FRA.jpg' },
  { origin: 'ESB', destination: 'MUC', label: 'Ankara → Munich', flag: '🇹🇷 → 🇩🇪', image: '/images/routes/ESB-MUC.jpg' },
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
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Popular Routes
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-3xl">
        Quick search for the most popular destinations. Click on any route to search for flights.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {POPULAR_ROUTES.map((route, index) => (
          <button
            key={index}
            onClick={() => handleRouteClick(route)}
            className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] text-left border border-gray-200 dark:border-gray-700"
          >
            {/* Route Image */}
            <div className="relative h-36 overflow-hidden bg-gradient-to-br from-primary-100 to-primary-200 dark:from-gray-700 dark:to-gray-600">
              <img
                src={route.image}
                alt={route.label}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  // Fallback to gradient with flag if image fails to load
                  e.target.style.display = 'none'
                  e.target.nextElementSibling.style.display = 'flex'
                }}
              />
              {/* Fallback content */}
              <div className="absolute inset-0 hidden items-center justify-center text-5xl">
                {route.flag}
              </div>
            </div>

            {/* Route Info */}
            <div className="p-4">
              <div className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                {route.origin} → {route.destination}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {route.label.split(' → ')[1]}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
