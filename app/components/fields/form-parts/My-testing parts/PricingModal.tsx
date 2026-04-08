'use client';

import React, { useMemo } from 'react';
import { calculateEstimate, EstimateStats } from '@/app/utils/estimateCalculation';

interface PricingModalProps {
  formData: Record<string, any>;
}

export default function PricingModal({ formData }: PricingModalProps) {
  const estimateStats: EstimateStats | null = useMemo(() => {
    try {
      const frequency = formData.frequency || 'one-off';
      const stats = calculateEstimate(formData, frequency);
      return stats;
    } catch (error) {
      console.error('Error calculating estimate:', error);
      return null;
    }
  }, [formData]);

  const frequency = formData.frequency || 'one-off';
  const isRecurring = frequency !== 'one-off';
  const displayPrice = estimateStats ? (isRecurring ? estimateStats.maintenancePrice : estimateStats.firstCleanPrice) : 0;
  const displayHours = estimateStats ? (isRecurring ? estimateStats.maintenanceHours : estimateStats.firstCleanHours) : 0;
  const displayMinutes = estimateStats ? (isRecurring ? estimateStats.maintenanceMinutes : estimateStats.firstCleanMinutes) : 0;

  return (
    <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-300 z-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4">
        {/* Left: Service Type */}
        <div className="flex-1">
          <p className="text-xs sm:text-sm text-gray-600 uppercase tracking-wide">
            {isRecurring ? `${frequency} cleaning` : 'one-off cleaning'}
          </p>
        </div>

        {/* Center: Time Estimate */}
        <div className="flex-1 text-center">
          <p className="text-xs sm:text-sm text-gray-600">Estimated Time</p>
          <p className="text-lg sm:text-xl font-bold" style={{ color: '#4B5368' }}>
            {displayHours}h {displayMinutes}m
          </p>
        </div>

        {/* Right: Current Price */}
        <div className="flex-1 text-right">
          <p className="text-xs sm:text-sm text-gray-600">Current Price</p>
          <p className="text-2xl sm:text-3xl font-bold text-[#48546A]">
            £{isFinite(displayPrice) ? displayPrice.toFixed(2) : '0.00'}
          </p>
        </div>
      </div>
    </div>
  );
}
