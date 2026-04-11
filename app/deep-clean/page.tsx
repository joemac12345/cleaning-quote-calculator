'use client';

import HeroSection from './components/HeroSection';

export default function DeepCleanPage() {
  return (
    <div className="min-h-screen bg-white pt-32">
      <HeroSection
        title="Deep Clean Services"
        subtitle="deep cleaning for your home"
        buttonText="Get Started"
        backgroundImage="/hero.svg"
      />
    </div>
  );
}
