'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const slideDownStyle = `
    @keyframes slideDown {
      from {
        transform: translateY(-100%);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  `;

  const pages = [
    { label: 'Estimate', href: '/01-estimate' },
    { label: 'Booking', href: '/booking' },
  ];



  return (
    <>
      <style>{slideDownStyle}</style>
      <nav className="sticky top-0 z-40">
      <div className="max-w-2xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0"></div>

          <div className="flex items-center gap-2">
            {/* Admin Icon */}
            <Link
              href="/admin"
              className="p-2 rounded-full hover:bg-gray-100 transition bg-gray-50"
              aria-label="Admin"
            >
              <svg
                className="w-8 h-8 text-[#48546A]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 12a4 4 0 100-8 4 4 0 000 8z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 21v-2a6 6 0 00-6-6H10a6 6 0 00-6 6v2"
                />
              </svg>
            </Link>

            {/* Hamburger Icon */}
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 transition"
              aria-label="Toggle menu"
            >
              <svg
                className="w-8 h-8 text-[#48546A]"
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

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 transition"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Navigation Modal */}
      {isOpen && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-gray-50 z-50 max-w-2xl w-11/12 sm:w-full overflow-hidden max-h-[80vh] overflow-y-auto shadow-lg" style={{ animation: 'slideDown 0.3s ease-out' }}>
          {/* Header */}
          <div
            className="text-white px-6 py-4 flex justify-between items-center sticky top-0"
            style={{ backgroundColor: '#4B5368' }}
          >
            <h2 className="text-lg font-poppins font-thin">Navigation</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:opacity-80 transition text-2xl leading-none"
              aria-label="Close navigation"
            >
              ✕
            </button>
          </div>

          {/* Main Pages */}
          <nav className="p-4 space-y-2">
            {pages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                prefetch={true}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-lg hover:bg-gray-100 transition font-poppins font-thin text-gray-900"
              >
                {page.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
      </nav>
    </>
  );
}
