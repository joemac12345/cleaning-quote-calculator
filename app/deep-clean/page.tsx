'use client';

import HeroSection from './components/HeroSection';
import ServiceOverview from './components/ServiceOverview';
import ServiceBenefits from './components/ServiceBenefits';
import ProcessSteps from './components/ProcessSteps';
import WhyChooseUs from './components/WhyChooseUs';
import CTASection from './components/CTASection';

export default function DeepCleanPage() {
  return (
    <>
      <HeroSection
        backgroundImage="/hero.svg"
      />
      
      <div className="mt-8 sm:mt-12">
        <ServiceOverview />
        <ServiceBenefits />
        <ProcessSteps />
        <WhyChooseUs />
        <CTASection />
      </div>
    </>
  );
}
