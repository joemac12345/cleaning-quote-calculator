'use client';

interface HeroImageProps {
  src: string;
  alt: string;
  height?: string;
  width?: string;
  objectPosition?: string;
}

export default function HeroImage({ 
  src, 
  alt, 
  height = "300px", 
  width = "100%",
  objectPosition = "50% 20%"
}: HeroImageProps) {
  return (
    <div className="bg-gray-200 rounded-lg overflow-hidden" style={{ height, width }}>
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover" 
        style={{ objectPosition }}
      />
    </div>
  );
}
