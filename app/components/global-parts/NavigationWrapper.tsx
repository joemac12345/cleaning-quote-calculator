'use client';

import { usePathname } from 'next/navigation';
import Navigation from './Navigation';

export default function NavigationWrapper() {
  const pathname = usePathname();
  
  // Hide navigation on estimate and bookings pages
  const hideNav = pathname.includes('/01-estimate') || pathname.includes('/bookings');

  return !hideNav ? <Navigation /> : null;
}
