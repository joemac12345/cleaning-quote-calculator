'use client';

import Link from 'next/link';

interface ServiceDetailsProps {
  title: string;
  price: string;
  rating: number;
  reviewCount: number;
  badges: string[];
  features: string[];
  buttonLink?: string;
  titleSize?: 'sm' | 'md' | 'lg';
  padding?: string;
  featureSize?: 'sm' | 'md' | 'lg';
}

const sizes = {
  title: {
    sm: 'text-lg font-bold',
    md: 'text-2xl font-bold',
    lg: 'text-3xl font-bold',
  },
  feature: {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  },
};

export default function ServiceDetails({
  title,
  price,
  rating,
  reviewCount,
  badges,
  features,
  buttonLink = '/01-estimate',
  titleSize = 'md',
  padding = 'p-6',
  featureSize = 'md'
}: ServiceDetailsProps) {
  return (
    <div className={`bg-white rounded-lg ${padding} space-y-6`}>
      {/* Badges */}
      {badges.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {badges.map((badge, idx) => (
            <span key={idx} className="bg-info/10 text-info text-xs font-bold px-3 py-1 rounded-full">
              {badge}
            </span>
          ))}
        </div>
      )}

      {/* Title */}
      <h2 className={`${sizes.title[titleSize]} text-primary`}>{title}</h2>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex text-warning">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={i < Math.floor(rating) ? '★' : i < rating ? '★' : '☆'}>
              ★
            </span>
          ))}
        </div>
        <span className="text-sm text-info font-medium">({reviewCount} reviews)</span>
      </div>

      {/* Features */}
      {features.length > 0 && (
        <div>
          <h3 className={`font-semibold text-primary mb-3 ${sizes.feature[featureSize]}`}>What's Included:</h3>
          <ul className="space-y-2">
            {features.map((feature, idx) => (
              <li key={idx} className={`flex gap-2 text-gray-700 ${sizes.feature[featureSize]}`}>
                <span className="text-primary flex-shrink-0 font-bold">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Pricing Section */}
      <div className="border-t pt-6 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-700">Price:</span>
          <span className="text-3xl font-bold text-primary">{price}</span>
        </div>

        {/* CTA Button */}
        <Link
          href={buttonLink}
          className="block w-full bg-primary hover:bg-opacity-90 text-white font-bold py-3 px-6 rounded-lg text-center transition-colors"
        >
          Get your estimate
        </Link>
      </div>
    </div>
  );
}
