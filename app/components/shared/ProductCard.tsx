'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ProductCardProps {
  title: string;
  price: string;
  rating?: number;
  reviewCount?: number;
  badge?: string;
  badges?: string[];
  description?: string;
  features?: string[];
  image?: string;
  imagePosition?: string;
  imageHeight?: string;
  imageColumnWidth?: string;
  featuresColumnWidth?: string;
  onAddToBasket?: () => void;
  buttonLink?: string;
}

export default function ProductCard({
  title,
  price,
  rating = 4.5,
  reviewCount = 12,
  badge,
  badges = [],
  description,
  features = [],
  image,
  imagePosition = '50% 20%',
  imageHeight = '200px',
  imageColumnWidth = '50%',
  featuresColumnWidth = '50%',
  onAddToBasket,
  buttonLink,
}: ProductCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const charLimit = 120;
  const shouldTruncate = description && description.length > charLimit;
  const displayText = isExpanded || !shouldTruncate ? description : description?.substring(0, charLimit) + '...';

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 relative">
      {/* Badges */}
      {badges.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
          {badges.map((badgeText, idx) => (
            <div key={idx} className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
              {badgeText}
            </div>
          ))}
        </div>
      )}

      {/* Title */}
      <h3 className="heading-h3 text-primary mb-2 sm:mb-4 text-lg sm:text-xl">{title}</h3>

      {/* Rating */}
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <div className="flex text-yellow-400 text-sm">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={i < Math.floor(rating) ? '★' : i < rating ? '★' : '☆'}>
              ★
            </span>
          ))}
        </div>
        <span className="text-xs sm:text-sm text-blue-600 font-medium">({reviewCount})</span>
      </div>

      {/* Image and Features - Responsive Grid */}
      <div className="mb-4 sm:mb-6" style={{ display: 'grid', gridTemplateColumns: `${imageColumnWidth} ${featuresColumnWidth}`, gap: '10px' }}>
        {/* Left - Image */}
        {image && (
          <div>
            <div className="bg-gray-100 rounded overflow-hidden w-full" style={{ height: imageHeight }}>
              <img src={image} alt={title} className="w-full h-full object-cover object-center" style={{ objectPosition: imagePosition }} />
            </div>
          </div>
        )}

        {/* Right - Features */}
        {features.length > 0 && (
          <div>
            <h4 className="text-xs sm:text-sm font-extrabold text-pink-500 mb-2 sm:mb-3">What's Included:</h4>
            <ul className="text-xs sm:text-sm text-gray-700 space-y-1 sm:space-y-2">
              {features.map((feature, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="text-pink-500 flex-shrink-0">•</span>
                  <span className="font-semibold">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Description */}
      {description && (
        <div className="mb-4">
          <p className="text-sm sm:text-base text-gray-600 mb-2" style={{ whiteSpace: 'pre-wrap' }}>{displayText}</p>
          {shouldTruncate && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs sm:text-sm text-primary font-semibold hover:underline"
            >
              {isExpanded ? 'Read less' : 'Read more'}
            </button>
          )}
        </div>
      )}

      {/* Button */}
      {buttonLink ? (
        <Link
          href={buttonLink}
          className="block w-full bg-primary hover:bg-opacity-90 text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors text-sm sm:text-base text-center"
        >
          Get your estimate
        </Link>
      ) : (
        <button
          onClick={onAddToBasket}
          className="w-full bg-primary hover:bg-opacity-90 text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors text-sm sm:text-base"
        >
          Get your estimate
        </button>
      )}
    </div>
  );
}
