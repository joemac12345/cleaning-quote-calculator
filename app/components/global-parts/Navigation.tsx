'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, Home, FileText, Sparkles, Calendar, User } from 'lucide-react';
import Link from 'next/link';
import { ModalSkeleton } from '../shared/ModalSkeleton';

const MAIN_LINKS = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/01-estimate', label: 'Get Estimate', icon: FileText },
  { href: '/deep-clean', label: 'Services', icon: Sparkles },
  { href: '/bookings', label: 'Bookings', icon: Calendar },
];

const SERVICE_LINKS = [
  { href: '/deep-clean/professional', label: 'Professional Deep Cleaning', icon: Sparkles },
  { href: '/deep-clean/standard', label: 'Standard Cleaning', icon: Sparkles },
  { href: '/deep-clean/move-in', label: 'Move-In / Move-Out', icon: Sparkles },
  { href: '/deep-clean/carpet', label: 'Carpet & Upholstery', icon: Sparkles },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white pt-10 sm:pt-3">
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

          {/* Desktop Navigation - Hidden, using slide-in modal instead */}
          <div className="hidden">
            {/* Main Links */}
            <div className="flex gap-6">
              {MAIN_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? 'text-primary'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Service Links */}
            <div className="flex gap-6">
              {SERVICE_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? 'text-primary'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="h-6 w-px bg-transparent"></div>
          </div>

          {/* Menu Button - All screen sizes */}
          <div className="flex items-center gap-4">
            <Link
              href="/admin/login"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Admin login"
            >
              <User className="w-6 h-6 text-gray-900" />
            </Link>
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 -mr-2"
              aria-label="Toggle navigation menu"
            >
              <Menu className="w-6 h-6 text-gray-900" />
            </button>
          </div>
        </div>

        {/* Mobile Menu Modal */}
        <ModalSkeleton isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div className="px-4 py-6 space-y-8 max-w-[700px] mx-auto">
            {/* Main Links */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase mb-4">Pages</p>
              <div className="grid grid-cols-2 gap-4">
                {MAIN_LINKS.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all ${
                        isActive(link.href)
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-primary/50 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-8 h-8 mb-2" />
                      <span className="text-sm font-medium text-center">{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Service Links */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase mb-4">Services</p>
              <div className="grid grid-cols-2 gap-4">
                {SERVICE_LINKS.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all ${
                        isActive(link.href)
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-primary/50 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-8 h-8 mb-2" />
                      <span className="text-sm font-medium text-center">{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </ModalSkeleton>
      </div>
    </nav>
  );
}
