'use client';

import { useState } from 'react';
import Link from 'next/link';

export function AdminNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  const adminPages = [
    { label: 'Estimates', href: '/admin' },
    { label: 'Feedback', href: '/admin/feedback' },
  ];

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full text-white font-bold text-2xl shadow-lg hover:shadow-xl transition flex items-center justify-center z-40"
        style={{ backgroundColor: '#4B5368' }}
        title="Admin Navigation"
        aria-label="Open admin navigation"
      >
        ☰
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 transition"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Navigation Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 bg-white rounded-lg shadow-2xl z-50 w-64 overflow-hidden">
          {/* Header */}
          <div
            className="text-white px-6 py-4 flex justify-between items-center"
            style={{ backgroundColor: '#4B5368' }}
          >
            <h2 className="text-lg font-bold font-heading">Admin</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:opacity-80 transition text-2xl leading-none"
              aria-label="Close navigation"
            >
              ✕
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-2">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 rounded-lg hover:bg-gray-100 transition font-medium text-gray-800"
              style={{ color: '#4B5368' }}
            >
              ← Back to Home
            </Link>
            <div className="border-t border-gray-200 my-2"></div>
            {adminPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-lg hover:bg-gray-100 transition font-medium text-gray-800"
                style={{ color: '#4B5368' }}
              >
                {page.label}
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="border-t border-gray-200 px-6 py-3 bg-gray-50">
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </div>
      )}
    </>
  );
}
