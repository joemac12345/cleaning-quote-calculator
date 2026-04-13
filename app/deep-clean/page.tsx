'use client';

import ProductCard from '../components/shared/ProductCard';

export default function DeepCleanPage() {
  return (
    <>
      <div className="space-y-6">
      <ProductCard
        title="Deep Cleaning Service Package"
        price="£299.99"
        rating={4.5}
        reviewCount={12}
        badge="Professional Cleaning"
        description="Our professional deep cleaning service transforms your home with meticulous attention to every detail. We use premium eco-friendly products and advanced equipment to ensure a thorough, spotless clean throughout all rooms.Our professional deep cleaning service transforms your home with meticulous attention to every detail. We use premium eco-friendly products and advanced equipment to ensure a thorough, spotless clean throughout all rooms.Our professional deep cleaning service transforms your home with meticulous attention to every detail. We use premium eco-friendly products and advanced equipment to ensure a thorough, spotless clean throughout all rooms."
        image="/1.png"
        imageHeight="100px"
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
        badge="Value Cleaning"
        description="Our standard cleaning service provides a reliable, thorough clean for regular maintenance. Perfect for keeping your home fresh and tidy between deeper cleans."
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
        badge="Premium Cleaning"
        description="Comprehensive cleaning service for moving days. We ensure your new space is pristine or your previous home is move-ready with our detailed deep clean."
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
        badge="Specialist Service"
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
    </>
  );
}
