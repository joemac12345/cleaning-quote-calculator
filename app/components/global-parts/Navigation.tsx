'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const pages = [
    { label: 'Estimate', href: '/01-estimate' },
    { label: 'Booking', href: '/booking' },
  ];

  const adminPages = [
    { label: 'Admin - Estimates', href: '/admin' },
    { label: 'Admin - Feedback', href: '/admin/feedback' },
  ];

  return (
    <nav className="sticky top-0 z-40">
      <div className="max-w-2xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <img 
              src="/icons/WW635.jpg" 
              alt="Company Logo" 
              className="h-10 sm:h-12"
            />
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

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 transition"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Navigation Modal */}
      {isOpen && (
        <div className="fixed top-20 right-4 bg-white rounded-lg z-50 w-80 overflow-hidden max-h-[80vh] overflow-y-auto">
          {/* Header */}
          <div
            className="text-white px-6 py-4 flex justify-between items-center sticky top-0"
            style={{ backgroundColor: '#4B5368' }}
          >
            <h2 className="text-lg font-bold font-heading">Navigation</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:opacity-80 transition text-2xl leading-none"
              aria-label="Close navigation"
            >
              ✕
            </button>
          </div>

          {/* Main Pages */}
          <nav className="p-4 space-y-2 border-b border-gray-200">
            {pages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-lg hover:bg-gray-100 transition font-medium text-[#48546A]"
              >
                {page.label}
              </Link>
            ))}
          </nav>

          {/* Admin Pages */}
          <div className="p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-3 px-4">Admin</p>
            <nav className="space-y-2">
              {adminPages.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 rounded-lg hover:bg-gray-100 transition font-medium text-[#48546A]"
                >
                  {page.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
}
