'use client';

import Image from 'next/image';

export default function HeroSection() {
  const title = '';
  const description = '';
  const backgroundImage = '/landing.svg';

  return (
    <section className="mx-auto overflow-hidden rounded-lg" style={{ width: '672px', height: '250px', maxWidth: '100%' }}>
      <Image 
        src={backgroundImage}
        alt="Cleaning Services" 
        width={672}
        height={250}
        className="w-full h-full object-cover object-center"
        style={{ objectPosition: 'center top' }}
        priority
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 100vw"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg">
        <div className="relative z-10 max-w-2xl mx-auto px-3 sm:px-4 text-center">
          <h1 className="heading-h1-hero mb-4 sm:mb-6">
            {title}
          </h1>
          <p className="text-lg sm:text-xl text-gray-100 mb-8 sm:mb-10 font-inter font-normal">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
