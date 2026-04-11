'use client';

import { Star } from 'lucide-react';

interface TrustpilotBadgeProps {
  rating?: number;
  reviewCount?: number;
  ratingText?: string;
  platform?: string;
}

export default function TrustpilotBadge({
  rating = 5,
  reviewCount = 47000,
  ratingText = 'Rated',
  platform = 'Trustpilot',
}: TrustpilotBadgeProps) {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
      <span className="font-semibold text-gray-900 text-xs sm:text-sm" style={{ fontSize: 'clamp(11px, 3vw, 14px)' }}>
        {ratingText}
      </span>

      {/* Star Rating */}
      <div className="flex gap-0.5">
        {[...Array(rating)].map((_, i) => (
          <div
            key={i}
            className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded flex items-center justify-center flex-shrink-0"
          >
            <Star className="w-2 h-2 sm:w-3 sm:h-3 text-white fill-white" strokeWidth={0} />
          </div>
        ))}
      </div>

      {/* Review Text */}
      <span className="text-gray-700 text-[10px] sm:text-xs font-regular">
        5-star on Google, Facebook
      </span>

      {/* Platform Badge */}
      {platform && (
        <div className="flex items-center gap-0.5 flex-shrink-0">
          <Star className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 fill-green-500" strokeWidth={0} />
          <span className="font-semibold text-gray-900 text-xs sm:text-sm">{platform}</span>
        </div>
      )}
    </div>
  );
}
