'use client';

import React, { useMemo } from 'react';
import { calculateQuote, QuoteStats } from '@/app/utils/quoteCalculation';

interface PricingModalProps {
  formData: Record<string, any>;
  isOpen: boolean;
  onClose: () => void;
}

export default function PricingModal({ formData, isOpen, onClose }: PricingModalProps) {
  if (!isOpen) return null;

  const quoteStats: QuoteStats | null = useMemo(() => {
    try {
      const frequency = formData.frequency || 'one-off';
      const stats = calculateQuote(formData, frequency);
      console.log('Quote stats:', stats, 'FormData:', formData);
      return stats;
    } catch (error) {
      console.error('Error calculating quote:', error);
      return null;
    }
  }, [formData]);

  if (!quoteStats) {
    return null;
  }



  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[9998] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6 sm:p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold font-heading" style={{ color: '#4B5368' }}>
            Current Quote
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="space-y-4 mb-6">
          {/* First Clean */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold mb-2" style={{ color: '#4B5368' }}>
              Your First Clean
            </h3>
            <p className="text-sm mb-1" style={{ color: '#4B5368' }}>
              Time: {quoteStats.firstCleanHours}h {quoteStats.firstCleanMinutes}m
            </p>
            <p className="text-xs text-gray-600">One-time first appointment</p>
          </div>

          {/* Maintenance Price - only show if not one-off */}
          {(formData.frequency || 'one-off') !== 'one-off' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2" style={{ color: '#4B5368' }}>
                Maintenance Price
              </h3>
              <p className="text-sm mb-1" style={{ color: '#4B5368' }}>
                Time: {quoteStats.maintenanceHours}h {quoteStats.maintenanceMinutes}m
              </p>
              <p className="text-xs text-gray-600">Per clean going forward ({formData.frequency || 'one-off'})</p>
            </div>
          )}
        </div>



        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-2 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-lg transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
