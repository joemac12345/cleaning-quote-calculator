'use client';

import { useState, useRef } from 'react';

export interface CarouselCard {
  id: string;
  icon?: React.ReactNode;
  title: string;
  description?: string;
}

interface CarouselProps {
  cards: CarouselCard[];
  title?: string;
  subtitle?: string;
}

export default function Carousel({ cards, title, subtitle }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const isDragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    isDragging.current = true;
    if ('targetTouches' in e) {
      touchStartX.current = e.targetTouches[0].clientX;
    } else {
      touchStartX.current = e.clientX;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;

    let touchEndX = 0;
    if ('changedTouches' in e) {
      touchEndX = e.changedTouches[0].clientX;
    } else if ('clientX' in e) {
      touchEndX = (e as React.MouseEvent).clientX;
    }

    const diff = touchStartX.current - touchEndX;
    const swipeThreshold = 20;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swiped left, go to next
        setCurrentIndex((prev) => Math.min(prev + 1, cards.length - 1));
      } else {
        // Swiped right, go to previous
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  if (!cards || cards.length === 0) {
    return null;
  }

  return (
    <div className="w-full py-8 px-4 bg-white relative z-20">
      <div className="max-w-[700px] mx-auto">
        {/* Title and Subtitle */}
        {(title || subtitle) && (
          <div className="mb-8">
            {title && (
              <h2 className="text-2xl font-bold text-gray-900 mb-2 font-poppins">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-gray-600 font-inter">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Cards Container */}
        <div
          ref={containerRef}
          className="relative overflow-hidden cursor-grab active:cursor-grabbing"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleTouchStart}
          onMouseUp={handleTouchEnd}
          onMouseLeave={() => {
            isDragging.current = false;
          }}
        >
          {/* Cards - translate based on current index */}
          <div
            className="flex transition-transform duration-500 ease-out gap-4"
            style={{
              transform: `translateX(-${currentIndex * 316}px)`,
            }}
          >
            {cards.map((card) => (
              <div
                key={card.id}
                className="flex-shrink-0 w-[300px] select-none"
              >
                <div className="bg-gray-100 rounded-lg shadow p-5 h-full flex items-center gap-3">
                  {/* Icon Section */}
                  {card.icon && (
                    <div className="flex-shrink-0 text-3xl">
                      {card.icon}
                    </div>
                  )}

                  {/* Content Section */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-gray-900 mb-0.5 font-poppins">
                      {card.title}
                    </h3>
                    {card.description && (
                      <p className="text-xs text-gray-600 font-inter">
                        {card.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
