'use client';

import HeroSection from '@/app/components/global-parts/HeroSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection
        imageSrc="/1.png"
        imageAlt="Hero image"
        imageHeight="150px"
        imageWidth="40%"
        imageOffsetX="0px"
        imageOffsetY="0px"
        textSize="sm"
        heading="Your First Clean"
        price={213.75}
        priceLabel="Fixed cost"
        additionalInfo={['3hr+ Recommended']}

        className="mb-16"
      />
    </div>
  );
}
