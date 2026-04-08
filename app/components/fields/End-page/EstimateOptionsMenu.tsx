'use client';

import { useState, useRef, useEffect } from 'react';

interface EstimateOptionsMenuProps {
  onEstimateDetails: () => void;
  onWhatComesNext: () => void;
}

export default function EstimateOptionsMenu({
  onEstimateDetails,
  onWhatComesNext,
}: EstimateOptionsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleEstimateDetails = () => {
    onEstimateDetails();
    setIsOpen(false);
  };

  const handleWhatComesNext = () => {
    onWhatComesNext();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 hover:bg-gray-100 rounded-lg transition"
        title="Options"
        aria-label="Open options menu"
      >
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          style={{ color: '#4B5368' }}
        >
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <button
            onClick={handleEstimateDetails}
            className="w-full text-left px-4 py-3 hover:bg-gray-50 transition font-poppins text-sm font-semibold rounded-t-lg"
            style={{ color: '#4B5368' }}
          >
            Estimate Details
          </button>
          <button
            onClick={handleWhatComesNext}
            className="w-full text-left px-4 py-3 hover:bg-gray-50 transition font-poppins text-sm font-semibold rounded-b-lg border-t border-gray-200"
            style={{ color: '#4B5368' }}
          >
            What Comes Next?
          </button>
        </div>
      )}
    </div>
  );
}
