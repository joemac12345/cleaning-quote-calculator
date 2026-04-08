'use client';

import Image from 'next/image';
import { landingConfig } from '@/app/config/landingConfig';

export default function HeroSection() {
  const heroConfig = (landingConfig as any).hero || {};
  const { title = '', description = '', ctaText = 'Get Started', backgroundImage = '/og-image.png' } = heroConfig;

  return (
    <section className="relative w-full mt-6 sm:mt-8 overflow-hidden rounded-lg">
      <Image 
        src={backgroundImage}
        alt="Cleaning Services" 
        width={1920}
        height={320}
        className="w-full h-64 sm:h-80 object-cover"
        priority
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 100vw"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg">
        <div className="relative z-10 max-w-2xl mx-auto px-3 sm:px-4 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl text-white mb-4 sm:mb-6 font-poppins font-thin">
            {title}
          </h1>
          <p className="text-lg sm:text-xl text-gray-100 mb-8 sm:mb-10 font-normal">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
