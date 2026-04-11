'use client';

import React from 'react';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filter: string;
  onFilterChange: (newFilter: string) => void;
  statusOptions: Array<{ value: string; label: string }>;
  statusCounts: Record<string, number>;
}

export default function FilterModal({
  isOpen,
  onClose,
  filter,
  onFilterChange,
  statusOptions,
  statusCounts,
}: FilterModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="pt-6 px-4 sm:px-6 pb-4 border-b border-gray-200 flex justify-between items-start sm:items-center gap-2">
          <h2 className="text-lg sm:text-xl font-semibold break-words text-primary">
            Filter Bookings
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-primary rounded"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="pt-6 px-4 sm:px-6 pb-6">
          <p className="text-xs font-semibold text-gray-500 uppercase mb-4">Status</p>
          <div className="space-y-2">
            <button
              onClick={() => onFilterChange('all')}
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-left text-sm sm:text-base font-medium transition break-words ${
                filter === 'all'
                  ? 'text-white bg-primary'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
                <div className="flex justify-between items-center gap-2">
                  <span className="break-words">All Bookings</span>
                </div>
            </button>
            {statusOptions.map((status) => (
              <button
                key={status.value}
                onClick={() => onFilterChange(status.value)}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-left text-sm sm:text-base font-medium transition break-words ${
                  filter === status.value
                    ? 'text-white bg-primary'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-center gap-2">
                  <span className="break-words">{status.label}</span>
                  <span className="text-xs bg-gray-200 px-2 py-1 rounded flex-shrink-0">
                    {statusCounts[status.value] || 0}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-6 px-4 sm:px-6 pb-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 sm:py-3 bg-gray-100 text-gray-800 text-sm sm:text-base font-medium rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
