/**
 * Home / Landing Page
 * 
 * This is the main landing page displayed at route: /
 * 
 * Purpose:
 * - Welcomes users to the site with a hero section
 * - Showcases testimonials, services, and customer reviews
 * - Contains CTA buttons linking to /quote (get quote) and /booking (book now)
 * 
 * Data Source:
 * - Static content is pulled from app/config/landingConfig.ts
 * - Each section component (Hero, Testimonial, Services, Reviews, etc.) reads from the config
 * - To update landing page content, edit landingConfig.ts instead of modifying components
 * 
 * Components Rendered:
 * - HeroSection: Hero image + headline
 * - Testimonial: Customer rating/count
 * - TextDescription: Company description
 * - CTAButtons: Call-to-action buttons
 * - Services: Service cards overview
 * - Reviews: Customer reviews section
 */

'use client';


import HeroSection from './components/landing/Hero/HeroSection';
import Testimonial from './components/landing/Testimonial/Testimonial';
import TextDescription from './components/landing/TextDescription/TextDescription';
import CTAButtons from './components/landing/CTAButtons/CTAButtons';
import Services from './components/landing/Services/Services';
import Reviews from './components/landing/Reviews/Reviews';

export default function Home() {
  return (
    <>
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
