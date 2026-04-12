'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

const MAIN_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/01-estimate', label: 'Get Estimate' },
  { href: '/deep-clean', label: 'Services' },
  { href: '/bookings', label: 'Bookings' },
];

const ADMIN_LINKS = [
  { href: '/admin/login', label: 'Login' },
  { href: '/admin/Main-admin', label: 'Dashboard' },
  { href: '/admin/bookings', label: 'Bookings' },
  { href: '/admin/feedback', label: 'Feedback' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <img 
                src="/Logo/logo.png" 
                alt="Top to Bottom Logo" 
                className="h-10 w-auto" 
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {/* Main Links */}
            <div className="flex gap-6">
              {MAIN_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="h-6 w-px bg-gray-300"></div>

            {/* Admin Links */}
            <div className="flex gap-6">
              {ADMIN_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 -mr-2"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-gray-900" />
            ) : (
              <Menu className="w-6 h-6 text-gray-900" />
            )}
          </button>
        </div>

        {/* Mobile Menu - Dropdown positioned absolutely to not push content */}
        {isOpen && (
          <div className="md:hidden absolute left-0 right-0 top-28 bg-white border-b border-gray-200 shadow-lg">
            <div className="px-4 py-4 space-y-4 max-w-[700px] mx-auto">
              {/* Main Links */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-500 uppercase">Pages</p>
                {MAIN_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-2 rounded-lg transition-colors ${
                      isActive(link.href)
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-200"></div>

              {/* Admin Links */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-500 uppercase">Admin</p>
                {ADMIN_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-2 rounded-lg transition-colors ${
                      isActive(link.href)
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
