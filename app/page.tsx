'use client';

import HeroSection from './components/landing/Hero/HeroSection';
import Testimonial from './components/landing/Testimonial/Testimonial';
import TextDescription from './components/landing/TextDescription/TextDescription';
import CTAButtons from './components/landing/CTAButtons/CTAButtons';
import Services from './components/landing/Services/Services';
import Reviews from './components/landing/Reviews/Reviews';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <HeroSection />
      <Testimonial />
      <TextDescription />
      <CTAButtons />
      <Services />
      <Reviews />
    </div>
  );
}
