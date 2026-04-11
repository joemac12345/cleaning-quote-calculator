'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, FileText, Sparkles, Calendar, Settings, X, Menu } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const pages = [
    { label: 'Home', href: '/', Icon: Home },
    { label: 'Estimate', href: '/01-estimate', Icon: FileText },
    { label: 'Deep Clean', href: '/deep-clean', Icon: Sparkles },
    { label: 'Bookings', href: '/bookings', Icon: Calendar },
    { label: 'Admin', href: '/admin', Icon: Settings },
  ];

  return (
    <>
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-0 sm:left-[calc(50%-300px)] z-50 p-3 rounded-lg text-primary hover:opacity-80 transition"
        aria-label="Toggle menu"
      >
        <Menu className="w-6 h-6" strokeWidth={1.5} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-down Popover */}
      <div
        className={`fixed top-0 left-1/2 -translate-x-1/2 max-w-[600px] w-full bg-white shadow-2xl z-50 transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-50 transition text-gray-900"
          aria-label="Close menu"
        >
          <X className="w-6 h-6" strokeWidth={1.5} />
        </button>

        {/* Content */}
        <div className="p-8 pt-16">
          <h2 className="heading-h2 mb-2">Navigation</h2>
          <p className="text-gray-600 text-sm mb-8">Choose what you'd like to explore</p>
          
          {/* Grid of Link Squares */}
          <div className="grid grid-cols-2 gap-4">
            {pages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                onClick={() => setIsOpen(false)}
                className="p-6 bg-primary-light rounded-lg hover:bg-primary transition text-center font-semibold flex flex-col items-center gap-3 text-white"
              >
                <page.Icon className="w-8 h-8" strokeWidth={1.5} />
                {page.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
