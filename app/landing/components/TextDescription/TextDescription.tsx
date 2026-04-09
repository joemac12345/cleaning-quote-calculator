'use client';

import { useState } from 'react';

export default function TextDescription() {
  const [isExpanded, setIsExpanded] = useState(false);
  const title = 'Your Company Name';
  const description = 'Professional cleaning services provider in London offering a wide range of high-quality cleaning services tailored to meet your needs.Professional cleaning services provider in London offering a wide range of high-quality cleaning services tailored to meet your needs';
  
  const previewLength = 150;
  const isLong = description.length > previewLength;
  const displayText = isExpanded ? description : description.slice(0, previewLength);

  return (
    <section className="py-2 sm:py-3 px-3 sm:px-4">
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
