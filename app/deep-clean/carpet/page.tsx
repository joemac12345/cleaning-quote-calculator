'use client';

import ProductCard from '../../components/shared/ProductCard';
import Link from 'next/link';

export default function CarpetCleaningPage() {
  return (
    <div className="ml-[calc(-50vw+50%)] mr-[calc(-50vw+50%)] bg-gray-50 md:py-8 lg:py-12">
      <div className="max-w-[700px] mx-auto md:px-4 lg:px-6 space-y-6">
        
        {/* Back Link */}
        <Link href="/deep-clean" className="text-primary font-semibold hover:underline inline-block">
          ← Back to Services
        </Link>

        {/* Service Card */}
        <ProductCard
          title="Carpet & Upholstery Cleaning"
          price="£249.99"
          rating={4.6}
          reviewCount={11}
          badges={["Specialist Service", "Deep Cleaning"]}
          description={`Professional carpet and upholstery cleaning using specialized equipment.

Our process:
• Hot water extraction cleaning for deep dirt removal
• Specialized stain removal treatment
• Odor neutralization and deodorizing
• Pet-friendly treatments available

We restore your carpets and furniture to like-new condition while protecting your fabrics and extending their lifespan.`}
          features={[
            'Hot water extraction cleaning',
            'Stain removal treatment',
            'Odor neutralization',
            'Pet-friendly treatments available',
          ]}
          image="/landing.svg"
          imageHeight="200px"
          imageColumnWidth="45%"
          featuresColumnWidth="55%"
          buttonLink="/01-estimate"
        />

        {/* Additional Content */}
        <div className="bg-white rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-bold text-primary">Professional Carpet & Upholstery Cleaning</h2>
          <p className="text-gray-600">
            Extend the life of your carpets and furniture with our professional cleaning services. Using advanced techniques and eco-friendly solutions, we remove deep-set dirt, stains, and odors.
          </p>
          <ul className="space-y-2">
            <li className="text-gray-600">✓ Hot water extraction cleaning</li>
            <li className="text-gray-600">✓ Specialized stain removal</li>
            <li className="text-gray-600">✓ Odor neutralization treatment</li>
            <li className="text-gray-600">✓ Pet-friendly and eco-safe solutions</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
