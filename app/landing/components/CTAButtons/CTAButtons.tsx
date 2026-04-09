'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function CTAButtons() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section className="py-8 sm:py-12 px-3 sm:px-4 bg-white">
        <div className="max-w-2xl mx-auto flex flex-row gap-4 items-center">
          <Link href="/01-estimate" className="btn-primary px-8 py-4 flex-1 text-center">
            Get Estimate
          </Link>
          <button 
            onClick={() => setIsOpen(true)} 
            className="btn-secondary px-4 py-2 flex items-center justify-center text-2xl min-w-12 h-12"
            aria-label="More options"
          >
            ⋮
          </button>
        </div>
      </section>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="heading-h2 text-primary">More Options</h2>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-gray-500 hover:text-gray-700 text-2xl"
                aria-label="Close menu"
              >
                ×
              </button>
            </div>
            <div className="space-y-3">
              <Link href="/01-estimate" className="block btn-primary text-center py-2 px-4">
                Get Estimate
              </Link>
              <Link href="/bookings" className="block btn-secondary text-center py-2 px-4">
                Book Now
              </Link>
              <a href="mailto:info@example.com" className="block btn-secondary text-center py-2 px-4">
                Email Us
              </a>
              <a href="tel:+1234567890" className="block btn-secondary text-center py-2 px-4">
                Call Us
              </a>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="mt-4 w-full py-2 text-gray-600 hover:text-gray-900 text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
