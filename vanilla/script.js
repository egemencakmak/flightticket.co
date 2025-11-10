// Configuration
const TP_MARKER = '472438'; // Change this in production to your Travelpayouts marker
const TP_SUBID = ''; // Optional subID

// Popular airports database
const AIRPORTS = [
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
];

// Popular routes
const POPULAR_ROUTES = [
    { origin: 'IST', destination: 'PAR', label: 'Istanbul → Paris', flag: '🇹🇷 → 🇫🇷' },
    { origin: 'IST', destination: 'LON', label: 'Istanbul → London', flag: '🇹🇷 → 🇬🇧' },
    { origin: 'IST', destination: 'BCN', label: 'Istanbul → Barcelona', flag: '🇹🇷 → 🇪🇸' },
    { origin: 'IST', destination: 'AMS', label: 'Istanbul → Amsterdam', flag: '🇹🇷 → 🇳🇱' },
    { origin: 'IST', destination: 'FCO', label: 'Istanbul → Rome', flag: '🇹🇷 → 🇮🇹' },
    { origin: 'IST', destination: 'DXB', label: 'Istanbul → Dubai', flag: '🇹🇷 → 🇦🇪' },
    { origin: 'AYT', destination: 'FRA', label: 'Antalya → Frankfurt', flag: '🇹🇷 → 🇩🇪' },
    { origin: 'ESB', destination: 'MUC', label: 'Ankara → Munich', flag: '🇹🇷 → 🇩🇪' },
];

// Utility Functions
function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function formatDateDisplay(date) {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

function generateAffiliateUrl(params) {
    const baseUrl = 'https://tp.media/r';
    const urlParams = new URLSearchParams({
        marker: TP_MARKER,
        origin: params.origin.toUpperCase(),
        destination: params.destination.toUpperCase(),
        depart_date: formatDate(params.departureDate),
        adults: params.adults.toString()
    });

    if (TP_SUBID) urlParams.append('subid', TP_SUBID);
    if (params.returnDate) urlParams.append('return_date', formatDate(params.returnDate));
    if (params.children > 0) urlParams.append('children', params.children.toString());
    if (params.infants > 0) urlParams.append('infants', params.infants.toString());

    return `${baseUrl}?${urlParams.toString()}`;
}

function saveRecentSearch(params) {
    try {
        const searches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
        const searchWithTimestamp = { ...params, timestamp: Date.now() };

        const filtered = searches.filter(s =>
            s.origin !== params.origin || s.destination !== params.destination
        );

        filtered.unshift(searchWithTimestamp);
        localStorage.setItem('recentSearches', JSON.stringify(filtered.slice(0, 5)));

        loadRecentSearches();
    } catch (e) {
        console.error('Failed to save search:', e);
    }
}

function getRecentSearches() {
    try {
        return JSON.parse(localStorage.getItem('recentSearches') || '[]');
    } catch (e) {
        console.error('Failed to get recent searches:', e);
        return [];
    }
}

// Dark Mode
function initDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const html = document.documentElement;

    // Check saved preference or system preference
    const savedDarkMode = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedDarkMode === 'true' || (savedDarkMode === null && prefersDark);

    if (isDark) {
        html.classList.add('dark');
        updateDarkModeIcon(true);
    }

    darkModeToggle.addEventListener('click', () => {
        const isDarkMode = html.classList.toggle('dark');
        localStorage.setItem('darkMode', isDarkMode);
        updateDarkModeIcon(isDarkMode);
    });
}

function updateDarkModeIcon(isDark) {
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');

    if (isDark) {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    } else {
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    }
}

// Cookie Banner
function initCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');

    if (!localStorage.getItem('cookies-accepted')) {
        banner.classList.add('show');
    }

    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookies-accepted', 'true');
        banner.classList.remove('show');
    });
}

// Autocomplete
function initAutocomplete() {
    const originInput = document.getElementById('origin');
    const destinationInput = document.getElementById('destination');
    const originSuggestions = document.getElementById('origin-suggestions');
    const destinationSuggestions = document.getElementById('destination-suggestions');

    function filterAirports(query) {
        return AIRPORTS.filter(airport =>
            airport.code.toLowerCase().includes(query.toLowerCase()) ||
            airport.city.toLowerCase().includes(query.toLowerCase())
        );
    }

    function createSuggestionItem(airport, type) {
        const item = document.createElement('div');
        item.className = 'suggestion-item';
        item.innerHTML = `
            <div>
                <div class="suggestion-city">${airport.city}</div>
                <div class="suggestion-country">${airport.country}</div>
            </div>
            <div class="suggestion-code">${airport.code}</div>
        `;
        item.addEventListener('click', () => {
            if (type === 'origin') {
                originInput.value = airport.code;
                originSuggestions.classList.remove('show');
            } else {
                destinationInput.value = airport.code;
                destinationSuggestions.classList.remove('show');
            }
        });
        return item;
    }

    originInput.addEventListener('input', (e) => {
        const query = e.target.value;
        if (query.length >= 2) {
            const filtered = filterAirports(query);
            originSuggestions.innerHTML = '';
            filtered.forEach(airport => {
                originSuggestions.appendChild(createSuggestionItem(airport, 'origin'));
            });
            originSuggestions.classList.add('show');
        } else {
            originSuggestions.classList.remove('show');
        }
    });

    destinationInput.addEventListener('input', (e) => {
        const query = e.target.value;
        if (query.length >= 2) {
            const filtered = filterAirports(query);
            destinationSuggestions.innerHTML = '';
            filtered.forEach(airport => {
                destinationSuggestions.appendChild(createSuggestionItem(airport, 'destination'));
            });
            destinationSuggestions.classList.add('show');
        } else {
            destinationSuggestions.classList.remove('show');
        }
    });

    // Close suggestions on outside click
    document.addEventListener('click', (e) => {
        if (!originInput.contains(e.target) && !originSuggestions.contains(e.target)) {
            originSuggestions.classList.remove('show');
        }
        if (!destinationInput.contains(e.target) && !destinationSuggestions.contains(e.target)) {
            destinationSuggestions.classList.remove('show');
        }
    });
}

// Search Form
function initSearchForm() {
    const form = document.getElementById('search-form');
    const today = new Date().toISOString().split('T')[0];

    // Set min date to today
    document.getElementById('departure-date').min = today;
    document.getElementById('return-date').min = today;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const params = {
            origin: document.getElementById('origin').value.trim().toUpperCase(),
            destination: document.getElementById('destination').value.trim().toUpperCase(),
            departureDate: document.getElementById('departure-date').value,
            returnDate: document.getElementById('return-date').value,
            adults: parseInt(document.getElementById('adults').value),
            children: parseInt(document.getElementById('children').value),
            infants: parseInt(document.getElementById('infants').value)
        };

        // Validate
        if (params.origin.length < 3 || params.destination.length < 3) {
            alert('Please enter valid airport codes (3 letters)');
            return;
        }

        if (params.origin === params.destination) {
            alert('Origin and destination must be different');
            return;
        }

        if (!params.departureDate) {
            alert('Please select a departure date');
            return;
        }

        // Save to recent searches
        saveRecentSearch(params);

        // Show results
        showResults(params);
    });
}

// Show Results
function showResults(params) {
    const resultsSection = document.getElementById('results-section');
    const resultsSummary = document.getElementById('results-summary');
    const resultsLoading = document.getElementById('results-loading');
    const resultsError = document.getElementById('results-error');
    const widgetRoot = document.getElementById('tp-widget-root');

    // Show section
    resultsSection.style.display = 'block';
    resultsLoading.style.display = 'block';
    resultsError.style.display = 'none';
    widgetRoot.innerHTML = '';

    // Set summary
    resultsSummary.innerHTML = `
        <h2>Flight Results</h2>
        <p>
            ${params.origin} → ${params.destination}
            • ${formatDateDisplay(params.departureDate)}
            ${params.returnDate ? ' - ' + formatDateDisplay(params.returnDate) : ''}
            • ${params.adults + params.children + params.infants} passenger(s)
        </p>
    `;

    // Scroll to results
    setTimeout(() => {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);

    // Generate affiliate URL
    const affiliateUrl = generateAffiliateUrl(params);

    // Attempt to initialize Travelpayouts widget
    setTimeout(() => {
        try {
            // Check if TP_EMBARS is available
            if (typeof window.TP_EMBARS !== 'undefined' && window.TP_EMBARS.init) {
                window.TP_EMBARS.init({
                    container: 'tp-widget-root',
                    origin: params.origin,
                    destination: params.destination,
                    departDate: params.departureDate,
                    returnDate: params.returnDate || null,
                    adults: params.adults,
                    children: params.children,
                    infants: params.infants
                });
                resultsLoading.style.display = 'none';
            } else {
                // Fallback: create iframe
                const iframe = document.createElement('iframe');
                iframe.src = affiliateUrl;
                iframe.style.width = '100%';
                iframe.style.height = '800px';
                iframe.style.border = 'none';
                iframe.style.borderRadius = '12px';
                iframe.setAttribute('allow', 'payment');

                iframe.onload = () => {
                    resultsLoading.style.display = 'none';
                };

                iframe.onerror = () => {
                    showError(affiliateUrl);
                };

                widgetRoot.appendChild(iframe);
            }
        } catch (error) {
            console.error('Failed to load results:', error);
            showError(affiliateUrl);
        }
    }, 500);

    function showError(url) {
        resultsLoading.style.display = 'none';
        resultsError.style.display = 'block';
        resultsError.innerHTML = `
            <h3 style="color: #dc2626; margin-bottom: 0.5rem;">Error Loading Results</h3>
            <p style="margin-bottom: 1rem;">We couldn't load the search results. Please try again or open the search in a new window.</p>
            <a href="${url}" target="_blank" rel="noopener noreferrer" style="color: var(--primary-600); font-weight: 600; text-decoration: underline;">
                Open Search in New Window →
            </a>
        `;
    }
}

// Popular Routes
function initPopularRoutes() {
    const routesGrid = document.getElementById('popular-routes');

    POPULAR_ROUTES.forEach(route => {
        const card = document.createElement('div');
        card.className = 'route-card';
        card.innerHTML = `
            <div class="route-flag">${route.flag}</div>
            <div class="route-name">${route.origin} → ${route.destination}</div>
            <div class="route-action">Quick search</div>
        `;

        card.addEventListener('click', () => {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const departureDate = tomorrow.toISOString().split('T')[0];

            const returnDateObj = new Date(tomorrow);
            returnDateObj.setDate(returnDateObj.getDate() + 7);
            const returnDate = returnDateObj.toISOString().split('T')[0];

            document.getElementById('origin').value = route.origin;
            document.getElementById('destination').value = route.destination;
            document.getElementById('departure-date').value = departureDate;
            document.getElementById('return-date').value = returnDate;

            document.getElementById('search-form').dispatchEvent(new Event('submit'));
        });

        routesGrid.appendChild(card);
    });
}

// Recent Searches
function loadRecentSearches() {
    const searches = getRecentSearches();
    const section = document.getElementById('recent-searches-section');
    const list = document.getElementById('recent-searches-list');

    if (searches.length === 0) {
        section.style.display = 'none';
        return;
    }

    section.style.display = 'block';
    list.innerHTML = '';

    searches.forEach(search => {
        const item = document.createElement('div');
        item.className = 'recent-search-item';
        item.innerHTML = `
            <div>
                <div style="font-weight: 600;">${search.origin} → ${search.destination}</div>
                <div style="font-size: 0.875rem; color: var(--gray-500);">
                    ${formatDateDisplay(search.departureDate)}
                    ${search.returnDate ? ' - ' + formatDateDisplay(search.returnDate) : ''}
                    • ${search.adults + search.children + search.infants} pax
                </div>
            </div>
            <div>→</div>
        `;

        item.addEventListener('click', () => {
            document.getElementById('origin').value = search.origin;
            document.getElementById('destination').value = search.destination;
            document.getElementById('departure-date').value = search.departureDate;
            document.getElementById('return-date').value = search.returnDate;
            document.getElementById('adults').value = search.adults;
            document.getElementById('children').value = search.children;
            document.getElementById('infants').value = search.infants;

            document.getElementById('search-form').dispatchEvent(new Event('submit'));
        });

        list.appendChild(item);
    });

    // Clear button
    document.getElementById('clear-searches').addEventListener('click', () => {
        localStorage.removeItem('recentSearches');
        loadRecentSearches();
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initCookieBanner();
    initAutocomplete();
    initSearchForm();
    initPopularRoutes();
    loadRecentSearches();
});
