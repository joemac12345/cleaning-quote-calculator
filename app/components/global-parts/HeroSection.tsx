'use client';

interface HeroSectionProps {
  imageSrc: string;
  imageAlt: string;
  heading?: string;
  price?: string | number;
  priceLabel?: string;
  additionalInfo?: string[];
  ctaText?: string;
  onCtaClick?: () => void;
  className?: string;
  imageHeight?: string;
  imageWidth?: string;
  imageOffsetX?: string;
  imageOffsetY?: string;
  cardHeight?: string;
  cardWidth?: string;
  textSize?: 'sm' | 'md' | 'lg';
}

export default function HeroSection({
  imageSrc,
  imageAlt,
  heading,
  price,
  priceLabel,
  additionalInfo = [],
  ctaText,
  onCtaClick,
  className = '',
  imageHeight = 'auto',
  imageWidth = '100%',
  imageOffsetX = '50%',
  imageOffsetY = '50%',
  cardHeight,
  cardWidth,
  textSize = 'lg',
}: HeroSectionProps) {
  // Text size mappings
  const sizes = {
    sm: {
      heading: 'text-sm font-bold',
      price: 'text-lg font-bold',
      priceLabel: 'text-xs font-medium',
      additionalInfo: 'text-xs font-medium',
    },
    md: {
      heading: 'text-base font-bold',
      price: 'text-2xl font-bold',
      priceLabel: 'text-xs font-medium',
      additionalInfo: 'text-xs font-medium',
    },
    lg: {
      heading: 'text-2xl sm:text-3xl font-bold',
      price: 'text-4xl sm:text-5xl font-bold',
      priceLabel: 'text-sm font-medium',
      additionalInfo: 'text-sm font-medium',
    },
  };

  const currentSize = sizes[textSize];
  return (
    <div className={`flex flex-row items-center gap-2 ${className}`}>
      {/* Image - Left */}
      <div className="flex-shrink-0" style={{ width: imageWidth, height: imageHeight }}>
        <img
          src={imageSrc}
          alt={imageAlt}
          style={{ 
            height: '100%', 
            width: '100%', 
            objectFit: 'cover',
            objectPosition: `${imageOffsetX} ${imageOffsetY}`
          }}
          className="rounded-lg"
        />
      </div>

      {/* Card - Right */}
      <div 
        className="flex-1 bg-white rounded-2xl border border-gray-200 overflow-hidden"
        style={{ 
          height: cardHeight ?? imageHeight,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '12px'
        }}
      >
        {heading && (
          <h2 className={`${currentSize.heading} text-gray-900 mb-2`}>
            {heading}
          </h2>
        )}

        {price !== undefined && (
          <div className="mb-2">
            <p className={`${currentSize.price} text-gray-900 mb-1`}>
              {typeof price === 'number' ? `£${price}` : price}
            </p>
            {priceLabel && (
              <p className={`${currentSize.priceLabel} text-gray-500`}>
                {priceLabel}
              </p>
            )}
          </div>
        )}

        {additionalInfo.length > 0 && (
          <div className="space-y-1">
            {additionalInfo.map((info, idx) => (
              <p key={idx} className={`${currentSize.additionalInfo} text-gray-600`}>
                {info}
              </p>
            ))}
          </div>
        )}

        {ctaText && (
          <button
            onClick={onCtaClick}
            className="w-full bg-primary text-white font-semibold py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors"
          >
            {ctaText}
          </button>
        )}
      </div>
    </div>
  );
}
