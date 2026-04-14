'use client';

import ProductCard from '../../components/shared/ProductCard';
import Link from 'next/link';

export default function StandardCleaningPage() {
  return (
    <div className="ml-[calc(-50vw+50%)] mr-[calc(-50vw+50%)] bg-gray-50 md:py-8 lg:py-12">
      <div className="max-w-[700px] mx-auto md:px-4 lg:px-6 space-y-6">
        
        {/* Back Link */}
        <Link href="/deep-clean" className="text-primary font-semibold hover:underline inline-block">
          ← Back to Services
        </Link>

        {/* Service Card */}
        <ProductCard
          title="Standard Cleaning Service"
          price="£149.99"
          rating={4.3}
          reviewCount={8}
          badges={["Value Cleaning"]}
          description={`Our standard cleaning service provides a reliable, thorough clean for regular maintenance.

What's included:
• All rooms vacuumed and dusted
• Bathrooms and kitchen thoroughly cleaned
• Floors swept and mopped
• All surfaces wiped and organized

Perfect for keeping your home fresh and tidy between deeper cleans. Weekly or bi-weekly service available.`}
          features={[
            'All rooms vacuumed and dusted',
            'Bathrooms and kitchen cleaned',
            'Floors swept and mopped',
            'Surfaces wiped and organized',
          ]}
          image="/hero.svg"
          imageHeight="120px"
          imageColumnWidth="30%"
          featuresColumnWidth="70%"
          buttonLink="/01-estimate"
        />

        {/* Additional Content */}
        <div className="bg-white rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-bold text-primary">Our Standard Cleaning Service</h2>
          <p className="text-gray-600">
            Keep your home consistently clean and organized with our reliable standard cleaning service. Perfect for regular maintenance between deep cleans.
          </p>
          <ul className="space-y-2">
            <li className="text-gray-600">✓ Comprehensive room-by-room cleaning</li>
            <li className="text-gray-600">✓ Professional cleaning team</li>
            <li className="text-gray-600">✓ Flexible scheduling (weekly, bi-weekly, monthly)</li>
            <li className="text-gray-600">✓ Affordable and reliable service</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
