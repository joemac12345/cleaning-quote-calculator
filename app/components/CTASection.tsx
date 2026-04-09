'use client';

import Link from 'next/link';

export function CTASection() {
  return (
    <div className="flex gap-4 flex-wrap">
      <Link
        href="/bookings"
        className="btn-primary"
      >
        Book Now
      </Link>
      <Link
        href="/01-estimate"
        className="btn-secondary"
      >
        Get Estimate
      </Link>
    </div>
  );
}
