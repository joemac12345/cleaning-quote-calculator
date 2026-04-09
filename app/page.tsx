'use client';

import Navigation from './landing/components/Navigation';
import HeroSection from './landing/components/Hero/HeroSection';
import Testimonial from './landing/components/Testimonial/Testimonial';
import TextDescription from './landing/components/TextDescription/TextDescription';
import CTAButtons from './landing/components/CTAButtons/CTAButtons';
import Services from './landing/components/Services/Services';
import Reviews from './landing/components/Reviews/Reviews';

export default function Home() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-white text-gray-900">
        <HeroSection />
        <Testimonial />
        <TextDescription />
        <CTAButtons />
        <Services />
        <Reviews />
      </div>
    </>
  );
}
