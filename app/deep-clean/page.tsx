'use client';

import ProductCard from '../components/shared/ProductCard';

/**
 * Deep Clean Page - Service Showcase
 * 
 * Displays a full-width background section with product cards for cleaning services.
 * Each card is fully customizable with the following adjustable props:
 * 
 * CARD STRUCTURE PROPS:
 * - title: Service name
 * - price: Display price (e.g., "£299.99")
 * - badges: Array of badge labels (e.g., ["Professional Cleaning", "Eco-Friendly"])
 * - description: Service description (supports \n\n for paragraphs and • for bullets)
 * - features: Array of features included in the service
 * - image: Path to image file (e.g., "/grok-image-9877ac3f-6149-4956-b9ec-2fc6b827f20f.png")
 * 
 * CARD LAYOUT PROPS:
 * - imageHeight: Height of image container (e.g., "200px")
 * - imageColumnWidth: Percentage width for image column (e.g., "30%")
 * - featuresColumnWidth: Percentage width for features column (e.g., "50%")
 * - imagePosition: CSS object-position for image crop (default: "50% 20%")
 * 
 * INTERACTION PROPS:
 * - rating: Star rating (1-5, e.g., 4.5)
 * - reviewCount: Number of reviews displayed
 * - buttonLink: Link destination when button clicked (e.g., "/01-estimate")
 */

export default function DeepCleanPage() {
  return (
    <div className="ml-[calc(-50vw+50%)] mr-[calc(-50vw+50%)] bg-gray-50 py-8 sm:py-12">
      <div className="max-w-[700px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      
      {/* CARD 1: Deep Cleaning Service Package */}
      <ProductCard
        title="Deep Cleaning Service Package"
        price="£299.99"
        rating={4.5}
        reviewCount={12}
        badges={["Professional Cleaning", "Eco-Friendly", "Premium Service", "Trade Rated"]}
        description={`Our professional deep cleaning service transforms your home with meticulous attention to every detail.

Key highlights:
• Premium eco-friendly products
• Advanced equipment and techniques
• Thorough spotless clean throughout all rooms
• Certified and trained professionals

Perfect for special occasions, seasonal cleaning, or when you need a comprehensive refresh of your entire home.`}
        features={[
          'Skirting boards cleaned',
          'Windows & glass interior',
          'Inside & outside all appliances',
          'Cabinet & shelf interiors',
        ]}
        image="/grok-image-9877ac3f-6149-4956-b9ec-2fc6b827f20f.png"
        imageHeight="200px"
        imageColumnWidth="30%"
        featuresColumnWidth="50%"
        buttonLink="/01-estimate"
      />

      {/* CARD 2: Standard Cleaning Service */}
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

      {/* CARD 3: Move-In / Move-Out Cleaning */}
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
        imageHeight="400px"
        imageColumnWidth="100%"
        featuresColumnWidth="0%"
        buttonLink="/01-estimate"
      />

      {/* CARD 4: Carpet & Upholstery Cleaning */}
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
      </div>
    </div>
  );
}

/**
 * PAGE STRUCTURE:
 * 
 * OUTER CONTAINER (Full width bg):
 * - className="ml-[calc(-50vw+50%)] mr-[calc(-50vw+50%)] bg-gray-50 py-8 sm:py-12"
 * - Breaks out of root layout to extend full screen width
 * - bg-gray-50 = Light gray background (change to customize page background color)
 * - py-8 sm:py-12 = Vertical padding (mobile to desktop)
 * 
 * INNER CONTAINER (Content constraint):
 * - className="max-w-[700px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6"
 * - max-w-[700px] = Content width limited to 700px max
 * - mx-auto = Centered on page
 * - px-4 sm:px-6 lg:px-8 = Responsive horizontal padding
 * - space-y-6 = 24px gap between cards
 */
