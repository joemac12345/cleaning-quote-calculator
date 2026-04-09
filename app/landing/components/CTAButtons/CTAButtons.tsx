'use client';
import Link from 'next/link';
import { landingConfig } from '@/app/config/landingConfig';

export default function CTAButtons() {
  const ctaConfig = (landingConfig as any).ctaButtons || {};
  const { primaryText = 'Book Now', secondaryText = 'Contact Us', primaryLink = '/bookings', secondaryLink = '/01-estimate' } = ctaConfig;

  return (
    <section className="py-8 sm:py-12 px-3 sm:px-4 bg-white">
      <div className="max-w-2xl mx-auto flex flex-col gap-4">
        <Link href={secondaryLink} className="btn-secondary px-8 py-4">
          {secondaryText}
        </Link>
        <Link href={primaryLink} className="btn-primary px-8 py-4">
          {primaryText}
        </Link>
      </div>
    </section>
  );
}
