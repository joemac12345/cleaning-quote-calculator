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
        image="/1.png"
        features={[
          'Skirting boards cleaned',
          'Windows & glass interior',
          'Inside & outside all appliances',
          'Cabinet & shelf interiors',
          'Cabinet & shelf interiors',
          
        ]}
        onAddToBasket={() => console.log('Added to basket')}
      />
    </>
  );
}
