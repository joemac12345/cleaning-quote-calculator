'use client';

import ProductCard from '../components/shared/ProductCard';

export default function DeepCleanPage() {
  return (
    <>
      {/* Product Card */}
      <ProductCard
        title="Deep Cleaning Service Package"
        price="£299.99"
        rating={4.5}
        reviewCount={12}
        badge="Professional Cleaning"
        description="Our professional deep cleaning service transforms your home with meticulous attention to every detail. We use premium eco-friendly products and advanced equipment to ensure a thorough, spotless clean throughout all rooms.Our professional deep cleaning service transforms your home with meticulous attention to every detail. We use premium eco-friendly products and advanced equipment to ensure a thorough, spotless clean throughout all rooms.Our professional deep cleaning service transforms your home with meticulous attention to every detail. We use premium eco-friendly products and advanced equipment to ensure a thorough, spotless clean throughout all rooms."
        image="/1.png"
        features={[
          'Skirting boards cleaned',
          'Windows & glass interior',
          'Inside & outside all appliances',
          'Cabinet & shelf interiors',
         
          
        ]}
        onAddToBasket={() => console.log('Added to basket')}
      />
    </>
  );
}
