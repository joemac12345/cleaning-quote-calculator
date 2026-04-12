'use client';

import Link from 'next/link';

export default function DeepCleanPage() {
  return (
    <>
      {/* Hero Section */}
      <div className="mb-12 sm:mb-16">
        <h1 className="heading-h1 text-primary mb-4">Deep Cleaning Services</h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
          Professional deep cleaning for every room in your home. Get an instant estimate in seconds.
        </p>
      </div>

      {/* Main CTA Section */}
      <section className="bg-gray-50 rounded-lg p-8 sm:p-12 mb-12 sm:mb-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="heading-h2 text-primary mb-4">Get Your Instant Estimate</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Simply tell us about your property—add rooms, select areas, and get an instant estimate. No guessing, no waiting.
          </p>
          <Link 
            href="/01-estimate"
            className="inline-block bg-primary text-white font-poppins font-semibold px-10 py-4 rounded-lg hover:bg-primary-dark transition-colors text-lg"
          >
            Start Your Estimate →
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="mb-12 sm:mb-16">
        <h2 className="heading-h2 text-primary mb-8">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary text-white font-poppins font-semibold mb-4">
              1
            </div>
            <h3 className="font-poppins font-semibold text-primary mb-2">Add Your Rooms</h3>
            <p className="text-gray-600 text-sm">Select bedrooms, bathrooms, living areas, and more</p>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary text-white font-poppins font-semibold mb-4">
              2
            </div>
            <h3 className="font-poppins font-semibold text-primary mb-2">Choose Services</h3>
            <p className="text-gray-600 text-sm">Select deep cleaning and any additional services</p>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary text-white font-poppins font-semibold mb-4">
              3
            </div>
            <h3 className="font-poppins font-semibold text-primary mb-2">Get Estimate</h3>
            <p className="text-gray-600 text-sm">Instantly see your price and book your service</p>
          </div>
        </div>
      </section>

      {/* Why Deep Clean */}
      <section className="mb-12 sm:mb-16">
        <h2 className="heading-h2 text-primary mb-6">What's Included</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            'Baseboards & trim thoroughly cleaned',
            'Windows & glass interior/exterior',
            'Inside & outside all appliances',
            'Cabinet & shelf interiors',
            'Floors deep cleaned & sanitized',
            'Light fixtures & ceiling fans',
          ].map((item, idx) => (
            <div key={idx} className="flex gap-3 items-start">
              <span className="text-success text-xl flex-shrink-0">✓</span>
              <span className="text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Secondary CTA */}
      <section className="text-center py-8 sm:py-12 border-t border-gray-200">
        <h3 className="heading-h3 text-primary mb-4">Ready to Get Started?</h3>
        <p className="text-gray-600 mb-6">Your instant estimate is just a few clicks away</p>
        <Link 
          href="/01-estimate"
          className="inline-block bg-primary text-white font-poppins font-semibold px-8 py-3 rounded-lg hover:bg-primary-dark transition-colors"
        >
          Get Your Estimate
        </Link>
      </section>
    </>
  );
}
