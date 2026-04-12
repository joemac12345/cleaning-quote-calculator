'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

const NAVIGATION_LINKS = [
  { href: '/01-estimate', label: 'Get Estimate' },
  { href: '/deep-clean', label: 'Services' },
  { href: '/admin/login', label: 'Admin' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  if (pathname.includes('/bookings') || pathname.includes('/admin')) {
    return null;
  }

  return (
    <nav className="bg-white mt-6">
      <div className="mx-auto max-w-[700px] px-4 py-2">
        {/* Header */}
        <div className="flex items-center gap-3">
          {/* Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center flex-shrink-0 h-12"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <X className="w-8 h-8 text-[#707175]" strokeWidth={1.5} />
            ) : (
              <Menu className="w-8 h-8 text-[#707175]" strokeWidth={1.5} />
            )}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center justify-center flex-shrink-0">
            <img 
              src="/Logo/logo.png" 
              alt="Top to Bottom Logo" 
              className="h-12 w-auto object-contain" 
            />
          </Link>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="mt-4 space-y-1 border-t pt-4">
            {NAVIGATION_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-primary rounded-lg transition-colors hover:bg-gray-50"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
