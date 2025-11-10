import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Hero from './components/Hero'
import SearchBar from './components/SearchBar'
import ResultsSection from './components/ResultsSection'
import PopularRoutes from './components/PopularRoutes'
import RecentSearches from './components/RecentSearches'
import Footer from './components/Footer'
import Header from './components/Header'
import PrivacyPage from './pages/Privacy'
import TermsPage from './pages/Terms'
import AboutPage from './pages/About'
import ContactPage from './pages/Contact'
import NotFoundPage from './pages/NotFound'

function HomePage() {
  const [searchParams, setSearchParams] = useState(null)
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage or system preference
    const saved = localStorage.getItem('darkMode')
    if (saved !== null) {
      return saved === 'true'
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  // Apply dark mode to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', darkMode)
  }, [darkMode])

  const handleSearch = (params) => {
    setSearchParams(params)
    // Scroll to results section
    setTimeout(() => {
      document.getElementById('results-section')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }, 100)
  }

  return (
    <>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Hero Section */}
      <Hero />

      {/* Travelpayouts Metasearch Widget Section */}
      <section className="relative z-10 -mt-12 mb-4">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Travelpayouts Search Widget Container */}
          <div
            id="tpwl-search"
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 border border-gray-100 dark:border-gray-700"
            style={{ minHeight: '240px' }}
          />
        </div>
      </section>

      {/* Travelpayouts Search Results Section */}
      <section className="py-2">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Travelpayouts Tickets/Results Container */}
          <div
            id="tpwl-tickets"
            style={{ minHeight: '400px' }}
          />
        </div>
      </section>

      {/* Recent Searches */}
      <section className="py-10 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <RecentSearches onSearchClick={handleSearch} />
        </div>
      </section>

      {/* Popular Routes */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <PopularRoutes onRouteClick={handleSearch} />
        </div>
      </section>

      {/* Results Section */}
      {searchParams && (
        <section id="results-section" className="py-12">
          <div className="container mx-auto px-4 max-w-6xl">
            <ResultsSection searchParams={searchParams} />
          </div>
        </section>
      )}

      <Footer />
    </>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy" element={<><Header /><PrivacyPage /><Footer /></>} />
        <Route path="/terms" element={<><Header /><TermsPage /><Footer /></>} />
        <Route path="/about" element={<><Header /><AboutPage /><Footer /></>} />
        <Route path="/contact" element={<><Header /><ContactPage /><Footer /></>} />
        <Route path="*" element={<><Header /><NotFoundPage /><Footer /></>} />
      </Routes>
    </Router>
  )
}

export default App
