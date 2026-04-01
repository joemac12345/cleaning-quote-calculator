'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-2xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <img 
              src="/icons/WW635.jpg" 
              alt="Company Logo" 
              className="h-14 sm:h-16"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8">
            <Link 
              href="/" 
              className="text-[#48546A] hover:text-[#3a3f52] font-medium transition"
            >
              Home
            </Link>
            <Link 
              href="/" 
              className="text-[#48546A] hover:text-[#3a3f52] font-medium transition"
            >
              About
            </Link>
            <Link 
              href="/" 
              className="text-[#48546A] hover:text-[#3a3f52] font-medium transition"
            >
              Services
            </Link>
            <Link 
              href="/" 
              className="text-[#48546A] hover:text-[#3a3f52] font-medium transition"
            >
              Contact
            </Link>
          </div>

          {/* Hamburger Icon */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
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

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-3 space-y-2">
            <Link 
              href="/" 
              onClick={closeMenu}
              className="block px-3 py-2 rounded-lg text-[#48546A] hover:bg-gray-100 font-medium transition"
            >
              Home
            </Link>
            <Link 
              href="/" 
              onClick={closeMenu}
              className="block px-3 py-2 rounded-lg text-[#48546A] hover:bg-gray-100 font-medium transition"
            >
              About
            </Link>
            <Link 
              href="/" 
              onClick={closeMenu}
              className="block px-3 py-2 rounded-lg text-[#48546A] hover:bg-gray-100 font-medium transition"
            >
              Services
            </Link>
            <Link 
              href="/" 
              onClick={closeMenu}
              className="block px-3 py-2 rounded-lg text-[#48546A] hover:bg-gray-100 font-medium transition"
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
