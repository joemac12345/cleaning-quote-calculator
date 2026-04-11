'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 mt-8">
      <div className="max-w-[700px] mx-auto left-0 right-0 px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Brand/Logo */}
          <div className="text-lg font-bold text-primary">
            Top to Bottom
          </div>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 rounded-lg transition"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-8 h-8 text-gray-900" strokeWidth={1.5} />
            ) : (
              <Menu className="w-8 h-8 text-gray-900" strokeWidth={1.5} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="mt-4 space-y-2 pt-4">
            <Link
              href="/01-estimate"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-primary rounded-lg transition"
            >
              Get Estimate
            </Link>
            <Link
              href="/deep-clean"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-primary rounded-lg transition"
            >
              Services
            </Link>
            <Link
              href="/admin/login"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-primary rounded-lg transition"
            >
              Admin
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
