'use client';

interface HeroSectionProps {
  backgroundImage?: string;
}

export default function HeroSection({ backgroundImage }: HeroSectionProps) {
  return (
    <section 
      className="w-full bg-cover bg-center bg-no-repeat min-h-64 sm:min-h-96 rounded-lg"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
      }}
    />
  );
}
