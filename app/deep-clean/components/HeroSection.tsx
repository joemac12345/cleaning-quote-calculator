'use client';

interface HeroSectionProps {
  backgroundImage?: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
}

export default function HeroSection({
  backgroundImage,
  title = "Deep Clean Services",
  subtitle = "Professional deep cleaning for your home or office",
  buttonText = "Get Started"
}: HeroSectionProps) {
  return (
    <section 
      className="w-full text-white py-40 px-0 sm:px-4 bg-cover bg-center bg-no-repeat relative min-h-[600px] flex items-center bg-primary"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
      }}
    >
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))'
        }}
      />
      <div className="max-w-4xl ml-[20px] text-left sm:text-center relative z-10 flex flex-col items-start sm:items-center">
        <h1 
          className="text-4xl font-black font-poppins mb-6 tracking-tight text-white"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <ul className="mb-8 font-inter space-y-2" style={{ color: '#8E8E93' }}>
          {subtitle.split(',').map((point, index) => (
            <li key={index} className="flex items-start gap-2 text-base">
              <span className="text-warning">•</span>
              <span>{point.trim()}</span>
            </li>
          ))}
        </ul>
        <button className="bg-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">
          {buttonText}
        </button>
      </div>
    </section>
  );
}
