'use client';

import ProductCard from '../components/shared/ProductCard';

export default function DeepCleanPage() {
  return (
    <div className="ml-[calc(-50vw+50%)] mr-[calc(-50vw+50%)] bg-gray-50 py-8 sm:py-12">
      <div className="max-w-[700px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <ProductCard
        title="Deep Cleaning Service Package"
        price="£299.99"
        rating={4.5}
        reviewCount={12}
        badges={["Professional Cleaning", "Eco-Friendly", "Premium Service", "Trade Rated"]}
        description="Our professional deep \n\n cleaning service transforms your home with meticulous attention to every detail.\n\n• Premium eco-friendly products\n• Advanced equipment\n• Thorough spotless clean throughout all rooms"
        image="/1.png"
        imageHeight="200px"
        imageColumnWidth="30%"
        featuresColumnWidth="50%"
        features={[
          'Skirting boards cleaned',
          'Windows & glass interior',
          'Inside & outside all appliances',
          'Cabinet & shelf interiors',
        ]}
        onAddToBasket={() => console.log('Added to basket')}
      />

      {/* Product Card 2 */}
      <ProductCard
        title="Standard Cleaning Service"
        price="£149.99"
        rating={4.3}
        reviewCount={8}
        badges={["Value Cleaning"]}
        description="Our standard\n\n cleaning service provides a reliable, thorough \n\nclean for regular maintenance. Perfect for keeping your home \n\nfresh and tidy between deeper cleans."
        image="/1.png"
        imageHeight="160px"
        imageColumnWidth="30%"
        featuresColumnWidth="70%"
        features={[
          'All rooms vacuumed and dusted',
          'Bathrooms and kitchen cleaned',
          'Floors swept and mopped',
          'Surfaces wiped and organized',
        ]}
        onAddToBasket={() => console.log('Added to basket')}
      />

      {/* Product Card 3 */}
      <ProductCard
        title="Move-In / Move-Out Cleaning"
        price="£399.99"
        rating={4.7}
        reviewCount={15}
        badges={["Premium Cleaning", "Eco-Friendly"]}
        description="Comprehensive cleaning service for moving \n days. We ensure your new space is pristine or your previous home is move-ready with our detailed deep clean."
        image="/1.png"
        imageHeight="400px"
        imageColumnWidth="100%"
        featuresColumnWidth="0%"
        features={[
          
        ]}
        onAddToBasket={() => console.log('Added to basket')}
      />

      {/* Product Card 4 */}
      <ProductCard
        title="Carpet & Upholstery Cleaning"
        price="£249.99"
        rating={4.6}
        reviewCount={11}
        badges={["Specialist Service", "Deep Cleaning"]}
        description="Professional carpet and upholstery cleaning using specialized equipment and eco-friendly solutions to remove deep-set dirt and stains."
        image="/1.png"
        imageHeight="200px"
        imageColumnWidth="80%"
        featuresColumnWidth="20%"
        features={[
          'Hot water extraction cleaning',
          'Stain removal treatment',
          'Odor neutralization',
          'Pet-friendly treatments available',
        ]}
        onAddToBasket={() => console.log('Added to basket')}
      />
      </div>
    </div>
  );
}
