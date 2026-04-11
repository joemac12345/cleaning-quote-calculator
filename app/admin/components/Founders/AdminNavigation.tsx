'use client';

import { useState } from 'react';
import Link from 'next/link';

export function AdminNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  const adminPages = [
    { label: 'Estimates', href: '/admin', icon: '📋' },
    { label: 'Bookings', href: '/admin/bookings', icon: '📅' },
    { label: 'Feedback', href: '/admin/feedback', icon: '💬' },
    { label: 'Login', href: '/admin/login', icon: '🔐' },
  ];

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full text-white font-bold text-2xl hover:opacity-90 transition flex items-center justify-center z-40 bg-primary"
        title="Admin Navigation"
        aria-label="Open admin navigation"
      >
        ☰
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 transition"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Navigation Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 bg-white rounded-lg z-50 w-72 overflow-hidden border border-gray-300 shadow-xl">
          {/* Header */}
          <div
            className="text-white px-6 py-4 flex justify-between items-center bg-primary"
          >
            <h2 className="text-lg font-semibold">Navigation</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:opacity-80 transition text-2xl leading-none"
              aria-label="Close navigation"
            >
              ✕
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-2">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition font-medium text-primary"
            >
              <span className="text-lg">🏠</span>
              <span>Back to Home</span>
            </Link>
            <div className="border-t border-gray-200 my-2"></div>
            {adminPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition font-medium text-primary"
              >
                <span className="text-lg">{page.icon}</span>
                <span>{page.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
