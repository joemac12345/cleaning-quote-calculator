'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Brand/Logo */}
          <div className="text-lg font-bold text-primary">
            Top to Bottom
          </div>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition bg-gray-50"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-8 h-8 text-gray-900" />
            ) : (
              <Menu className="w-8 h-8 text-gray-900" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="mt-4 space-y-2 border-t border-gray-200 pt-4">
            <Link
              href="/01-estimate"
              className="block px-4 py-2 text-primary hover:bg-gray-50 rounded-lg transition"
            >
              Get Estimate
            </Link>
            <Link
              href="/deep-clean"
              className="block px-4 py-2 text-primary hover:bg-gray-50 rounded-lg transition"
            >
              Services
            </Link>
            <Link
              href="/admin/login"
              className="block px-4 py-2 text-primary hover:bg-gray-50 rounded-lg transition"
            >
              Admin
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
