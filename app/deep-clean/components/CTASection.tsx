'use client';

import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="text-center py-8 sm:py-12">
      <h2 className="heading-h2 text-primary mb-4">Ready to Schedule Your Deep Clean?</h2>
      <p className="text-gray-600 mb-8 max-w-xl mx-auto">
        Get an instant quote for your property and book your deep cleaning service today.
      </p>
      <Link 
        href="/01-estimate"
        className="inline-block bg-primary text-white font-poppins font-semibold px-8 py-3 rounded-lg hover:bg-primary-dark transition-colors"
      >
        Get Your Quote
      </Link>
    </section>
  );
}
