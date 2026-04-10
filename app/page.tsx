'use client';

import Navigation from './components/global-parts/Navigation';
import HeroSection from './landing/components/Hero/HeroSection';
import TextDescription from './landing/components/TextDescription/TextDescription';
import CTAButtons from './landing/components/CTAButtons/CTAButtons';
import Reviews from './landing/components/Reviews/Reviews';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <div className="max-w-2xl mx-auto px-4 py-12">
        <TextDescription 
          title="Top to Bottom Cleaning"
          description="Thank you so much for visiting Top to Bottom Cleaning! We're a friendly local family-run business in Bedfordshire, and we know how tricky it can be to get a clear price for cleaning without someone having to come round first. That's why we've made a super simple online estimating tool – so you can get an estimate for a Deep Clean or Regular Clean whenever it suits you, in your own time, with no pressure at all! It only takes a minute or two, and you'll get a clear, honest price straight away. Go on… give it a try! We'd love to help make your home lovely and sparkling"
        />
        <CTAButtons />
      </div>
      <div className="-mt-12">
        <Reviews />
      </div>
    </div>
  );
}
