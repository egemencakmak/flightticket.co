import React from 'react'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Terms of Service
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                1. Agreement to Terms
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                By accessing or using Flightticket.co, you agree to be bound by these Terms of Service and all
                applicable laws and regulations. If you do not agree with any of these terms, you are prohibited
                from using this website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                2. Description of Service
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Flightticket.co is a flight search and comparison platform that operates as an affiliate marketing
                service. We provide:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                <li>Flight search and comparison tools</li>
                <li>Links to third-party booking platforms</li>
                <li>Information about flights, routes, and airlines</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <strong>Important:</strong> We do not sell flights directly. All bookings are completed through
                our partner airlines and travel agencies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                3. Affiliate Disclosure
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Flightticket.co participates in affiliate marketing programs. When you click on links to book
                flights through our website, we may earn a commission from our partners at no additional cost
                to you. This does not affect the price you pay or the quality of service you receive.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                4. User Responsibilities
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                When using our service, you agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                <li>Provide accurate search information</li>
                <li>Use the service for lawful purposes only</li>
                <li>Not attempt to interfere with the proper working of the website</li>
                <li>Not use automated systems to access the service</li>
                <li>Respect the intellectual property rights of Flightticket.co and third parties</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                5. Third-Party Services
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Our website contains links to third-party websites and services. We are not responsible for:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                <li>The content, privacy policies, or practices of third-party sites</li>
                <li>Flight bookings made through partner platforms</li>
                <li>Cancellations, refunds, or customer service provided by airlines or booking agencies</li>
                <li>Price changes, availability, or accuracy of flight information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                6. Disclaimer of Warranties
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                The service is provided "AS IS" and "AS AVAILABLE" without warranties of any kind, either
                express or implied, including but not limited to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                <li>Accuracy, completeness, or reliability of flight information</li>
                <li>Availability of the website or any features</li>
                <li>Merchantability or fitness for a particular purpose</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                7. Limitation of Liability
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                To the fullest extent permitted by law, Flightticket.co shall not be liable for any indirect,
                incidental, special, consequential, or punitive damages, or any loss of profits or revenues,
                whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                8. Intellectual Property
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                All content on Flightticket.co, including but not limited to text, graphics, logos, icons, images,
                and software, is the property of Flightticket.co or its content suppliers and is protected by
                international copyright laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                9. Changes to Terms
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We reserve the right to modify these Terms of Service at any time. We will notify users of any
                material changes by posting the new terms on this page with an updated "Last updated" date.
                Your continued use of the service after such changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                10. Governing Law
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                These Terms shall be governed by and construed in accordance with applicable international laws,
                without regard to conflict of law provisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                11. Contact Information
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <ul className="list-none text-gray-700 dark:text-gray-300 space-y-2">
                <li>Email: legal@flightticket.co</li>
                <li>Website: <a href="/contact" className="text-primary-600 dark:text-primary-400 hover:underline">Contact Form</a></li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
