/**
 * Utility functions for formatting dates, currency, and other data
 */

/**
 * Format date to YYYY-MM-DD format required by Travelpayouts
 * @param {Date|string} date - Date object or ISO string
 * @returns {string} Formatted date string
 */
export function formatDate(date) {
  if (!date) return ''

  const d = date instanceof Date ? date : new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

/**
 * Format date for display (e.g., "Dec 25, 2024")
 * @param {Date|string} date - Date object or ISO string
 * @returns {string} Formatted date string
 */
export function formatDateDisplay(date) {
  if (!date) return ''

  const d = date instanceof Date ? date : new Date(date)
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

/**
 * Format price with currency symbol
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (TRY, EUR, USD)
 * @returns {string} Formatted price string
 */
export function formatPrice(amount, currency = 'EUR') {
  if (!amount) return '-'

  const symbols = {
    TRY: '₺',
    EUR: '€',
    USD: '$',
    GBP: '£'
  }

  const symbol = symbols[currency] || currency
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)

  return `${symbol}${formatted}`
}

/**
 * Format duration in minutes to hours and minutes
 * @param {number} minutes - Duration in minutes
 * @returns {string} Formatted duration (e.g., "2h 30m")
 */
export function formatDuration(minutes) {
  if (!minutes) return '-'

  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60

  if (hours === 0) return `${mins}m`
  if (mins === 0) return `${hours}h`

  return `${hours}h ${mins}m`
}

/**
 * Format time from ISO string or Date
 * @param {Date|string} time - Date object or ISO string
 * @returns {string} Formatted time (e.g., "14:30")
 */
export function formatTime(time) {
  if (!time) return ''

  const d = time instanceof Date ? time : new Date(time)
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
}

/**
 * Get date range string for display
 * @param {Date|string} departure - Departure date
 * @param {Date|string} returnDate - Return date (optional)
 * @returns {string} Date range string
 */
export function getDateRangeDisplay(departure, returnDate) {
  const departureStr = formatDateDisplay(departure)

  if (!returnDate) return departureStr

  const returnStr = formatDateDisplay(returnDate)
  return `${departureStr} - ${returnStr}`
}

/**
 * Generate Travelpayouts affiliate URL
 * @param {Object} params - Search parameters
 * @returns {string} Affiliate URL
 */
export function generateAffiliateUrl(params) {
  const {
    origin,
    destination,
    departureDate,
    returnDate,
    adults = 1,
    children = 0,
    infants = 0
  } = params

  const marker = import.meta.env.VITE_TP_MARKER || '472438'
  const subid = import.meta.env.VITE_TP_SUBID || ''

  // Build URL with Travelpayouts affiliate parameters
  const baseUrl = 'https://tp.media/r'
  const urlParams = new URLSearchParams({
    marker: marker,
    ...(subid && { subid }),
    origin: origin.toUpperCase(),
    destination: destination.toUpperCase(),
    depart_date: formatDate(departureDate),
    ...(returnDate && { return_date: formatDate(returnDate) }),
    adults: adults.toString(),
    ...(children > 0 && { children: children.toString() }),
    ...(infants > 0 && { infants: infants.toString() })
  })

  return `${baseUrl}?${urlParams.toString()}`
}

/**
 * Save search to localStorage
 * @param {Object} searchParams - Search parameters
 */
export function saveRecentSearch(searchParams) {
  try {
    const searches = JSON.parse(localStorage.getItem('recentSearches') || '[]')

    // Add timestamp
    const searchWithTimestamp = {
      ...searchParams,
      timestamp: Date.now()
    }

    // Remove duplicates and limit to 5 most recent
    const filtered = searches.filter(s =>
      s.origin !== searchParams.origin ||
      s.destination !== searchParams.destination
    )

    filtered.unshift(searchWithTimestamp)
    const limited = filtered.slice(0, 5)

    localStorage.setItem('recentSearches', JSON.stringify(limited))
  } catch (e) {
    console.error('Failed to save search:', e)
  }
}

/**
 * Get recent searches from localStorage
 * @returns {Array} Recent searches
 */
export function getRecentSearches() {
  try {
    return JSON.parse(localStorage.getItem('recentSearches') || '[]')
  } catch (e) {
    console.error('Failed to get recent searches:', e)
    return []
  }
}
