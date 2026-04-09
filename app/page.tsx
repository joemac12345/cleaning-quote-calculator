'use client';

import HeroSection from './landing/components/Hero/HeroSection';
import TextDescription from './landing/components/TextDescription/TextDescription';
import CTAButtons from './landing/components/CTAButtons/CTAButtons';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <div className="max-w-2xl mx-auto px-4 py-12">
        <TextDescription />
        <CTAButtons />
      </div>
    </div>
  );
}
