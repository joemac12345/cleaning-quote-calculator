'use client';
import Link from 'next/link';
import { landingConfig } from '@/app/config/landingConfig';

export default function CTAButtons() {
  const ctaConfig = (landingConfig as any).ctaButtons || {};
  const { primaryText = 'Book Now', secondaryText = 'Contact Us', primaryLink = '/booking', secondaryLink = '/quote' } = ctaConfig;

  return (
    <section className="py-8 sm:py-12 px-3 sm:px-4 bg-white">
      <div className="max-w-2xl mx-auto flex flex-col gap-4">
        <Link href={secondaryLink} className="border border-[#48546A] text-[#48546A] px-8 py-4 rounded-lg text-center font-semibold hover:bg-gray-50 transition">
          {secondaryText}
        </Link>
        <Link href={primaryLink} className="bg-[#48546A] text-white px-8 py-4 rounded-lg text-center font-semibold hover:bg-opacity-90 transition">
          {primaryText}
        </Link>
      </div>
    </section>
  );
}
