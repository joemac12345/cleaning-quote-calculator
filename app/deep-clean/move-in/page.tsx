'use client';

import ProductCard from '../../components/shared/ProductCard';
import Link from 'next/link';

export default function MoveInCleaningPage() {
  return (
    <div className="ml-[calc(-50vw+50%)] mr-[calc(-50vw+50%)] bg-gray-50 md:py-8 lg:py-12">
      <div className="max-w-[700px] mx-auto md:px-4 lg:px-6 space-y-6">
        
        {/* Back Link */}
        <Link href="/deep-clean" className="text-primary font-semibold hover:underline inline-block">
          ← Back to Services
        </Link>

        {/* Service Card */}
        <ProductCard
          title="Move-In / Move-Out Cleaning"
          price="£399.99"
          rating={4.7}
          reviewCount={15}
          badges={["Premium Cleaning", "Eco-Friendly"]}
          description={`Comprehensive cleaning service for moving days.

Why choose us:
• We ensure your new space is pristine and ready to move in
• Your previous home is thoroughly cleaned for move-out inspections
• Attention to every detail and hard-to-reach areas
• Fast, efficient, and professional service

Our detailed deep clean gives you peace of mind during your moving transition.`}
          features={[
            
          ]}
          image="/grok-image-9877ac3f-6149-4956-b9ec-2fc6b827f20f.png"
          imageHeight="100px"
          imageColumnWidth="30%"
          featuresColumnWidth="0%"
          buttonLink="/01-estimate"
        />

        {/* Additional Content */}
        <div className="bg-white rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-bold text-primary">Move-In / Move-Out Cleaning</h2>
          <p className="text-gray-600">
            Make your move smooth and stress-free with our comprehensive move-in and move-out cleaning services. We handle all the dirty work so you can focus on settling in or moving out.
          </p>
          <ul className="space-y-2">
            <li className="text-gray-600">✓ Complete deep clean for vacant properties</li>
            <li className="text-gray-600">✓ Detailed attention to all areas</li>
            <li className="text-gray-600">✓ Fast turnaround for inspections</li>
            <li className="text-gray-600">✓ Perfect condition for new residents</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
