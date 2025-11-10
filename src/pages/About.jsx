import React from 'react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            About Flightticket
          </h1>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Our Mission
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                At Flightticket.co, our mission is simple: to help travelers find the best flight deals quickly
                and easily. We believe that everyone deserves access to affordable travel, and we're committed
                to making flight search as transparent and user-friendly as possible.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                What We Do
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Flightticket is a flight comparison platform that searches hundreds of airlines and travel agencies
                to find you the best prices. We don't sell flights ourselves – instead, we partner with trusted
                booking platforms to bring you:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                <li><strong>Comprehensive Search:</strong> Compare prices from multiple sources in one place</li>
                <li><strong>Fast Results:</strong> Get instant search results with our optimized platform</li>
                <li><strong>Transparent Pricing:</strong> No hidden fees – see the real prices upfront</li>
                <li><strong>Easy Booking:</strong> Direct links to trusted booking platforms</li>
                <li><strong>Mobile-Friendly:</strong> Search for flights on any device</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                How We Work
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                As an affiliate platform, we earn a small commission when you book flights through our partner
                links. This commission comes from the booking platform or airline – not from you. Your price
                stays the same whether you book through us or directly with the provider.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                This affiliate model allows us to offer our flight search service completely free to you, while
                continuing to improve and maintain our platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Why Choose Flightticket?
              </h2>
              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div className="bg-primary-50 dark:bg-gray-700 rounded-lg p-6">
                  <div className="text-primary-600 dark:text-primary-400 mb-3">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Lightning Fast
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Our optimized platform delivers search results in seconds, saving you valuable time.
                  </p>
                </div>

                <div className="bg-primary-50 dark:bg-gray-700 rounded-lg p-6">
                  <div className="text-primary-600 dark:text-primary-400 mb-3">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Best Prices
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    We compare hundreds of providers to ensure you get the best deal available.
                  </p>
                </div>

                <div className="bg-primary-50 dark:bg-gray-700 rounded-lg p-6">
                  <div className="text-primary-600 dark:text-primary-400 mb-3">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Secure & Trusted
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    We partner only with reputable airlines and verified booking platforms.
                  </p>
                </div>

                <div className="bg-primary-50 dark:bg-gray-700 rounded-lg p-6">
                  <div className="text-primary-600 dark:text-primary-400 mb-3">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Mobile Ready
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Search and book flights seamlessly on any device, anytime, anywhere.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Our Commitment
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We are committed to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                <li>Providing accurate and up-to-date flight information</li>
                <li>Maintaining a fast, user-friendly platform</li>
                <li>Protecting your privacy and personal data</li>
                <li>Being transparent about our affiliate relationships</li>
                <li>Continuously improving our service based on user feedback</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Get in Touch
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Have questions, feedback, or suggestions? We'd love to hear from you!
              </p>
              <a
                href="/contact"
                className="inline-flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                <span>Contact Us</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
