'use client';

import { useRef, useState } from 'react';

interface StatusOption {
  value: string;
  label: string;
  icon?: string;
}

interface StatusFilterProps {
  value: string;
  onChange: (value: string) => void;
  options: StatusOption[];
  includeAllOption?: boolean;
}

export function StatusFilter({
  value,
  onChange,
  options,
  includeAllOption = true,
}: StatusFilterProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 200;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {/* Left Arrow - Mobile Only */}
      <button
        onClick={() => scroll('left')}
        disabled={!canScrollLeft}
        className="hidden sm:hidden md:flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-30 transition"
      >
        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScroll}
        onTouchEnd={checkScroll}
        className="flex gap-2 overflow-x-auto flex-1 pb-2 scrollbar-hide"
        style={{
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <style>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {includeAllOption && (
          <button
            onClick={() => onChange('')}
            className={`px-4 py-3 rounded-lg font-semibold transition text-sm whitespace-nowrap flex-shrink-0 ${
              value === ''
                ? 'text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            style={{
              backgroundColor: value === '' ? '#4B5368' : undefined,
            }}
          >
            All
          </button>
        )}

        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`px-4 py-3 rounded-lg font-semibold transition text-sm whitespace-nowrap flex-shrink-0 ${
              value === option.value
                ? 'text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            style={{
              backgroundColor: value === option.value ? '#4B5368' : undefined,
            }}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Right Arrow - Mobile Only */}
      <button
        onClick={() => scroll('right')}
        disabled={!canScrollRight}
        className="hidden sm:hidden md:flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-30 transition"
      >
        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
