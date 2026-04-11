'use client';

import { Sparkles, Droplet, CheckCircle } from 'lucide-react';
import HeroSection from './components/HeroSection';
import TrustpilotBadge from '@/app/components/global-parts/TrustpilotBadge';
import Carousel from '@/app/components/global-parts/Carousel';
import type { CarouselCard } from '@/app/components/global-parts/Carousel';

export default function DeepCleanPage() {
  const carouselCards: CarouselCard[] = [
    {
      id: '1',
      title: 'Regular Cleaning',
      description: 'Weekly maintenance',
      icon: <Sparkles className="w-8 h-8 text-primary" />,
    },
    {
      id: '2',
      title: 'Deep Cleaning',
      description: 'Thorough service',
      icon: <Droplet className="w-8 h-8 text-primary" />,
    },
    {
      id: '3',
      title: 'Move-In/Out',
      description: 'Complete cleaning',
      icon: <CheckCircle className="w-8 h-8 text-primary" />,
    },
  ];
  return (
    <div className="min-h-screen bg-white">
      <div className="-mx-[calc(50vw-50%)] -mt-24">
        <HeroSection
          title="Get your cleaning<br>quote in<br>under 2 minutes"
          subtitle="No phone calls, No home visits, Just honest pricing"
          buttonText="Get my free estimate now"
          backgroundImage="/hero.svg"
        />
      </div>
      <div className="py-6 px-4 bg-transparent -mt-[140px] relative z-10">
        <div className="max-w-[700px] mx-auto">
          <TrustpilotBadge
            rating={5}
            reviewCount={0}
            ratingText="Rated"
            platform=""
          />
        </div>
      </div>
      <Carousel 
        title="Our Services" 
        subtitle="Choose the perfect cleaning service for your needs"
        cards={carouselCards} 
      />
    </div>
  );
}
