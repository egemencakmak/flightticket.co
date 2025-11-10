import React from 'react'

export default function Hero() {
  return (
    <section className="relative bg-[#E6F4F1] dark:bg-gray-800 text-gray-800 dark:text-white py-10 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 relative z-10">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-3 text-gray-900 dark:text-white">
            Find the best deals on flights
          </h1>
          <p className="text-base md:text-lg text-gray-700 dark:text-gray-300">
            Compare prices from hundreds of airlines and agencies to book your next adventure.
          </p>
        </div>

        {/* Search Card - Kiwi.com style */}
        <div className="bg-white dark:bg-gray-700 shadow-lg rounded-2xl border border-gray-200 dark:border-gray-600 p-4 md:p-6">
          <div className="flex flex-wrap gap-3 items-end">
            {/* Origin */}
            <div className="flex-grow min-w-[140px]">
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase mb-1.5">
                From
              </label>
              <input
                type="text"
                placeholder="City or airport"
                className="w-full border-b-2 border-gray-300 dark:border-gray-500 bg-transparent focus:outline-none focus:border-primary-600 dark:focus:border-primary-400 p-2 text-gray-900 dark:text-white placeholder-gray-400"
              />
            </div>

            {/* Destination */}
            <div className="flex-grow min-w-[140px]">
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase mb-1.5">
                To
              </label>
              <input
                type="text"
                placeholder="City or airport"
                className="w-full border-b-2 border-gray-300 dark:border-gray-500 bg-transparent focus:outline-none focus:border-primary-600 dark:focus:border-primary-400 p-2 text-gray-900 dark:text-white placeholder-gray-400"
              />
            </div>

            {/* Departure Date */}
            <div className="flex-grow min-w-[120px]">
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase mb-1.5">
                Depart
              </label>
              <input
                type="date"
                className="w-full border-b-2 border-gray-300 dark:border-gray-500 bg-transparent focus:outline-none focus:border-primary-600 dark:focus:border-primary-400 p-2 text-gray-900 dark:text-white"
              />
            </div>

            {/* Return Date */}
            <div className="flex-grow min-w-[120px]">
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase mb-1.5">
                Return
              </label>
              <input
                type="date"
                className="w-full border-b-2 border-gray-300 dark:border-gray-500 bg-transparent focus:outline-none focus:border-primary-600 dark:focus:border-primary-400 p-2 text-gray-900 dark:text-white"
              />
            </div>

            {/* Passengers */}
            <div className="flex-grow min-w-[100px]">
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase mb-1.5">
                Passengers
              </label>
              <select
                defaultValue="1"
                className="w-full border-b-2 border-gray-300 dark:border-gray-500 bg-transparent focus:outline-none focus:border-primary-600 dark:focus:border-primary-400 p-2 text-gray-900 dark:text-white"
              >
                {[...Array(9)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} {i === 0 ? 'passenger' : 'passengers'}
                  </option>
                ))}
              </select>
            </div>

            {/* CTA Button */}
            <button className="bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg min-w-[140px]">
              Search flights
            </button>
          </div>

          {/* Trip type toggles */}
          <div className="flex items-center gap-4 mt-4 text-sm">
            <label className="flex items-center cursor-pointer">
              <input type="radio" name="trip-type" value="round-trip" defaultChecked className="mr-2" />
              <span className="text-gray-700 dark:text-gray-300">Round trip</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="radio" name="trip-type" value="one-way" className="mr-2" />
              <span className="text-gray-700 dark:text-gray-300">One way</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="radio" name="trip-type" value="multi-city" className="mr-2" />
              <span className="text-gray-700 dark:text-gray-300">Multi-city</span>
            </label>
          </div>
        </div>
      </div>
    </section>
  )
}
