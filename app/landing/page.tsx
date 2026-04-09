/**
 * Home / Landing Page
 * 
 * This is the main landing page displayed at route: /
 * 
 * Purpose:
 * - Welcomes users to the site with a hero section
 * - Showcases testimonials, services, and customer reviews
 * - Contains CTA buttons linking to /01-estimate (get estimate) and /booking (book now)
 * 
 * Data Source:
 * - Static content is defined directly within each component
 * - Each section component (Hero, Testimonial, Services, Reviews, etc.) contains its own data
 * - To update landing page content, edit the relevant component file
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


import Navigation from './components/Navigation';
import HeroSection from './components/Hero/HeroSection';
import Testimonial from './components/Testimonial/Testimonial';
import TextDescription from './components/TextDescription/TextDescription';
import CTAButtons from './components/CTAButtons/CTAButtons';
import Services from './components/Services/Services';
import Reviews from './components/Reviews/Reviews';

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
