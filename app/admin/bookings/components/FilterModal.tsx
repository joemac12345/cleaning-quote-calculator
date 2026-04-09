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
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold" style={{ color: '#4B5368' }}>
            Filter Bookings
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-xs font-semibold text-gray-500 uppercase mb-4">Status</p>
          <div className="space-y-2">
            <button
              onClick={() => onFilterChange('all')}
              className={`w-full px-4 py-3 rounded-lg text-left font-medium transition ${
                filter === 'all'
                  ? 'text-white'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
              style={filter === 'all' ? { backgroundColor: '#4B5368' } : {}}
            >
              All Bookings
            </button>
            {statusOptions.map((status) => (
              <button
                key={status.value}
                onClick={() => onFilterChange(status.value)}
                className={`w-full px-4 py-3 rounded-lg text-left font-medium transition ${
                  filter === status.value
                    ? 'text-white'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
                style={filter === status.value ? { backgroundColor: '#4B5368' } : {}}
              >
                <div className="flex justify-between">
                  <span>{status.label}</span>
                  <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                    {statusCounts[status.value] || 0}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
