'use client';

import React from 'react';
import { extractRoomBreakdown } from '../bookings/utils/roomBreakdown';

interface Estimate {
  id: string;
  customer_name: string;
  email: string;
  telephone: string;
  address: string;
  property_type: string;
  service_type: string;
  frequency: string;
  first_clean_price: number;
  maintenance_price: number;
  created_at: string;
  status?: string;
  notes?: any;
  form_data?: Record<string, any>;
}

interface EstimateDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  estimate: Estimate;
}

export default function EstimateDetailsModal({
  isOpen,
  onClose,
  estimate,
}: EstimateDetailsModalProps) {
  if (!isOpen) return null;

  const formatPropertyType = (type: string) => {
    const typeMap: Record<string, string> = {
      house: 'House',
      flat: 'Flat',
      other: 'Other',
    };
    return typeMap[type?.toLowerCase()] || type || 'N/A';
  };

  const roomBreakdown = estimate.form_data ? extractRoomBreakdown(estimate.form_data) : null;

  const formatServiceType = (type: string) => {
    const typeMap: Record<string, string> = {
      deep: 'Deep Clean',
      spring: 'Spring Clean',
    };
    return typeMap[type?.toLowerCase()] || type || 'N/A';
  };

  const formatFrequency = (freq: string) => {
    if (!freq) return 'N/A';
    return freq.replace(/_/g, ' ').charAt(0).toUpperCase() + freq.replace(/_/g, ' ').slice(1);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full h-screen sm:h-auto sm:max-w-2xl sm:max-h-[90vh] overflow-y-auto rounded-none sm:rounded-lg shadow-2xl">
        <div className="pt-6 px-4 sm:px-6 sm:px-8 pb-6">
          {/* Header */}
          <div className="flex justify-between items-start sm:items-center mb-6 gap-2">
            <h2 className="heading-h2 text-xl sm:text-2xl">Estimate Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-primary rounded"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <div className="space-y-6">
            {/* Customer Information */}
            <section>
              <h3 className="heading-h3 mb-4 text-lg sm:text-xl">Customer Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-gray-300 rounded-lg p-3 sm:p-4 sm:col-span-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Name</p>
                  <p className="text-sm sm:text-base font-medium text-gray-700 break-words">{estimate.customer_name}</p>
                </div>
                <div className="border border-gray-300 rounded-lg p-3 sm:p-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Email</p>
                  <a href={`mailto:${estimate.email}`} className="text-xs sm:text-sm font-medium text-info hover:underline break-all focus:outline-none focus:ring-2 focus:ring-info rounded px-1">
                    {estimate.email}
                  </a>
                </div>
                <div className="border border-gray-300 rounded-lg p-3 sm:p-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Phone</p>
                  <a href={`tel:${estimate.telephone}`} className="text-xs sm:text-sm font-medium text-info hover:underline break-all focus:outline-none focus:ring-2 focus:ring-info rounded px-1">
                    {estimate.telephone}
                  </a>
                </div>
                <div className="border border-gray-300 rounded-lg p-3 sm:p-4 col-span-1 sm:col-span-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Address</p>
                  <p className="text-sm sm:text-base font-medium text-gray-700 break-words">{estimate.address}</p>
                </div>
              </div>
            </section>

            {/* Property Details */}
            <section className="border-t border-gray-200 pt-6">
              <h3 className="heading-h3 mb-4 text-lg sm:text-xl">Property Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="border border-gray-300 rounded-lg p-3 sm:p-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Property Type</p>
                  <p className="text-sm sm:text-base font-medium text-gray-700 break-words">
                    {formatPropertyType(estimate.property_type)}
                  </p>
                </div>
                <div className="border border-gray-300 rounded-lg p-3 sm:p-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Service Type</p>
                  <p className="text-sm sm:text-base font-medium text-gray-700 break-words">
                    {formatServiceType(estimate.service_type)}
                  </p>
                </div>
                <div className="border border-gray-300 rounded-lg p-3 sm:p-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Frequency</p>
                  <p className="text-sm sm:text-base font-medium text-gray-700 break-words">
                    {formatFrequency(estimate.frequency)}
                  </p>
                </div>
              </div>
            </section>

            {/* Rooms */}
            {roomBreakdown && roomBreakdown.totalRooms > 0 && (
              <section className="border-t border-gray-200 pt-6">
                <h3 className="heading-h3 mb-4">Rooms Included</h3>
                <div className="flex flex-wrap gap-2">
                  {roomBreakdown.rooms.map((room) => (
                    <span
                      key={room.label}
                      className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-xs font-inter font-medium text-primary"
                    >
                      {room.count}x {room.label}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Pricing */}
            <section className="border-t border-gray-200 pt-6">
              <h3 className="heading-h3 mb-4 text-lg sm:text-xl">Estimate Pricing</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-gray-300 rounded-lg p-3 sm:p-4">
                  <h4 className="text-xs sm:text-sm font-semibold text-primary mb-2 uppercase">First Clean</h4>
                  <p className="text-xl sm:text-2xl font-bold text-primary">
                    £{estimate.first_clean_price?.toFixed(2) || '0.00'}
                  </p>
                </div>
                {estimate.maintenance_price > 0 && (
                  <div className="border border-gray-300 rounded-lg p-3 sm:p-4">
                    <h4 className="text-xs sm:text-sm font-semibold text-primary mb-2 uppercase">Maintenance</h4>
                    <p className="text-xl sm:text-2xl font-bold text-primary">
                      £{estimate.maintenance_price?.toFixed(2) || '0.00'}
                    </p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Close Button */}
          <div className="border-t border-gray-200 mt-6 pt-6">
            <button
              onClick={onClose}
              className="w-full btn-secondary px-4 sm:px-6 py-3 text-sm sm:text-base"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
