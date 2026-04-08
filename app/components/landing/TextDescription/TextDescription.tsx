'use client';

import { useState } from 'react';
import { landingConfig } from '@/app/config/landingConfig';

export default function TextDescription() {
  const [isExpanded, setIsExpanded] = useState(false);
  const textConfig = (landingConfig as any).textDescription || {};
  const { title = '', description = '' } = textConfig;
  
  const previewLength = 150;
  const isLong = description.length > previewLength;
  const displayText = isExpanded ? description : description.slice(0, previewLength);

  return (
    <section className="py-2 sm:py-3 px-3 sm:px-4 bg-white">
      <div className="max-w-2xl mx-auto">
        <h2 className="heading-h2 mb-4 sm:mb-6">
          {title}
        </h2>
        <p className="body-text leading-relaxed">
          {displayText}
          {isLong && !isExpanded && '...'}
        </p>
        {isLong && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 text-primary font-semibold hover:underline text-sm sm:text-base"
          >
            {isExpanded ? 'Read less' : 'Read more'}
          </button>
        )}
      </div>
    </section>
  );
}
