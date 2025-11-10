import React from 'react'
import { Link } from 'react-router-dom'

export default function Header({ darkMode, setDarkMode }) {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <svg
              className="w-8 h-8 text-primary-600 group-hover:text-primary-700 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Flightticket
            </span>
          </Link>

          {/* Navigation & Tools */}
          <div className="flex items-center space-x-6">
            {/* Primary Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
              <Link
                to="/"
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Flights
              </Link>
              <Link
                to="/cars"
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Cars
              </Link>
              <Link
                to="/stays"
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Stays
              </Link>
              <Link
                to="/magazine"
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors hidden xl:inline"
              >
                Magazine
              </Link>
            </nav>

            {/* Right-side tools */}
            <div className="flex items-center space-x-3">
              {/* Language Selector */}
              <select className="hidden md:block bg-transparent border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700">
                <option value="en">EN</option>
                <option value="tr">TR</option>
                <option value="de">DE</option>
              </select>

              {/* Currency Selector */}
              <select className="hidden md:block bg-transparent border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700">
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="try">TRY</option>
              </select>

              {/* Dark Mode Toggle */}
              {setDarkMode && (
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? (
                    <svg
                      className="w-5 h-5 text-yellow-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 text-gray-700 dark:text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    </svg>
                  )}
                </button>
              )}

              {/* About/Contact Links */}
              <Link
                to="/about"
                className="hidden sm:inline text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="hidden sm:inline text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm"
              >
                Contact
              </Link>

              {/* Mobile Menu Button */}
              <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <svg
                  className="w-6 h-6 text-gray-600 dark:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
