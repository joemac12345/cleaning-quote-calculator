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
  subtitle = "deep cleaning for your home",
  buttonText
}: HeroSectionProps) {
  return (
    <section 
      className="relative w-full mx-auto my-0 rounded-lg bg-cover bg-center bg-no-repeat bg-primary min-h-64 sm:min-h-96 flex items-center text-white overflow-hidden"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
      }}
    >
      {/* Overlay Gradient */}
      <div 
        className="absolute inset-0 pointer-events-none rounded-lg bg-gradient-to-b from-black/30 to-black/50"
      />

      {/* Content Container */}
      <div className="relative z-10 w-full flex flex-col items-start justify-center max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Title */}
        <h1 
          className="text-2xl sm:text-4xl font-poppins font-semibold tracking-tight text-white mb-0"
          dangerouslySetInnerHTML={{ __html: title }}
        />

        {/* Subtitle List */}
        <ul className="mt-4 sm:mt-8 space-y-1 sm:space-y-2 font-inter">
          {subtitle.split(',').map((point, index) => (
            <li key={index} className="text-sm sm:text-base text-white">
              {point.trim()}
            </li>
          ))}
        </ul>

        {/* Button */}
        {buttonText && (
          <button className="mt-4 sm:mt-8 px-4 sm:px-6 py-2 sm:py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors text-sm sm:text-base">
            {buttonText}
          </button>
        )}
      </div>
    </section>
  );
}
