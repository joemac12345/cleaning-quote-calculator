'use client';

import { useState } from 'react';

interface ProductCardProps {
  title: string;
  price: string;
  rating?: number;
  reviewCount?: number;
  badge?: string;
  description?: string;
  features?: string[];
  image?: string;
  imagePosition?: string;
  onAddToBasket?: () => void;
}

export default function ProductCard({
  title,
  price,
  rating = 4.5,
  reviewCount = 12,
  badge,
  description,
  features = [],
  image,
  imagePosition = '50% 20%',
  onAddToBasket,
}: ProductCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const charLimit = 120;
  const shouldTruncate = description && description.length > charLimit;
  const displayText = isExpanded || !shouldTruncate ? description : description?.substring(0, charLimit) + '...';

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 relative">
      {/* Badge */}
      <div className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-4">
        Most popular
      </div>

      {/* Title */}
      <h3 className="heading-h3 text-primary mb-4">{title}</h3>

      {/* Rating */}
      <div className="flex items-center gap-2 mb-6">
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={i < Math.floor(rating) ? '★' : i < rating ? '★' : '☆'}>
              ★
            </span>
          ))}
        </div>
        <span className="text-sm text-blue-600 font-medium">({reviewCount})</span>
      </div>

      {/* Image and Features - Two Column */}
      <div className="grid gap-6 mb-6" style={{ gridTemplateColumns: '100px 1fr' }}>
        {/* Left - Image */}
        {image && (
          <div>
            <div className="bg-gray-100 rounded overflow-hidden w-full h-32">
              <img src={image} alt={title} className="w-full h-full object-cover object-center" style={{ objectPosition: imagePosition }} />
            </div>
          </div>
        )}

        {/* Right - Features */}
        {features.length > 0 && (
          <div>
            <h4 className="text-sm font-extrabold text-pink-500 mb-3">What's Included:</h4>
            <ul className="text-sm text-gray-700 space-y-2">
              {features.map((feature, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="text-pink-500">•</span>
                  <span className="font-semibold">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Full Width Button */}
      {description && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">{displayText}</p>
          {shouldTruncate && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-sm text-primary font-semibold hover:underline"
            >
              {isExpanded ? 'Read less' : 'Read more'}
            </button>
          )}
        </div>
      )}
      <button
        onClick={onAddToBasket}
        className="w-full bg-primary hover:bg-opacity-90 text-white font-bold py-3 px-6 rounded-lg transition-colors"
      >
        Get your estimate
      </button>
    </div>
  );
}
