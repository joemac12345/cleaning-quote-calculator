'use client';

import React from 'react';
import { extractRoomBreakdown, formatPropertyType, formatServiceType } from '../utils/roomBreakdown';

interface BookingDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: {
    id: string;
    customer_name: string;
    email: string;
    telephone: string;
    address: string;
    status: string;
    property_type?: string;
    service_type?: string;
    frequency?: string;
    form_data?: Record<string, any>;
    estimate_data?: {
      rooms?: number;
      serviceType?: string;
      frequency?: string;
      firstCleanPrice?: number;
      maintenancePrice?: number;
      firstCleanHours?: number;
      firstCleanMinutes?: number;
      maintenanceHours?: number;
      maintenanceMinutes?: number;
    };
  };
  statusOptions?: Array<{ value: string; label: string }>;
  onStatusChange?: (bookingId: string, newStatus: string) => void;
}

export default function BookingDetailsModal({
  isOpen,
  onClose,
  booking,
  statusOptions = [],
  onStatusChange,
}: BookingDetailsModalProps) {
  if (!isOpen) return null;

  const roomBreakdown = booking.form_data ? extractRoomBreakdown(booking.form_data) : null;
  const estimate = booking.estimate_data;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full h-screen sm:h-auto sm:max-w-2xl sm:max-h-[90vh] overflow-y-auto rounded-none sm:rounded-lg shadow-2xl">
        <div className="p-4 sm:p-6 sm:p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-poppins font-light text-primary">Booking Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl focus:outline-none"
              aria-label="Close booking details"
            >
              ✕
            </button>
          </div>

          {/* Status Section */}
          {statusOptions.length > 0 && (
            <div className="mb-6 border-t border-gray-200 pt-6">
              <p className="text-xs font-semibold text-gray-500 uppercase mb-3">Status</p>
              <select
                value={booking.status}
                onChange={(e) => onStatusChange?.(booking.id, e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-sm font-medium"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="space-y-6">
            {/* Customer Contact */}
            <section>
              <h3 className="text-lg sm:text-xl font-poppins font-normal text-primary mb-4">Customer Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-gray-300 rounded-lg p-4 col-span-2 sm:col-span-1">
                  <p className="text-xs font-poppins font-semibold text-gray-500 uppercase mb-2">Name</p>
                  <p className="text-sm font-inter font-normal text-gray-900">{booking.customer_name}</p>
                </div>
                <div className="border border-gray-300 rounded-lg p-4">
                  <p className="text-xs font-poppins font-semibold text-gray-500 uppercase mb-2">Email</p>
                  <a href={`mailto:${booking.email}`} className="text-sm font-inter font-normal text-info hover:underline focus:outline-none focus:ring-2 focus:ring-info rounded px-1">
                    {booking.email}
                  </a>
                </div>
                <div className="border border-gray-300 rounded-lg p-4">
                  <p className="text-xs font-poppins font-semibold text-gray-500 uppercase mb-2">Phone</p>
                  <a href={`tel:${booking.telephone}`} className="text-sm font-inter font-normal text-info hover:underline focus:outline-none focus:ring-2 focus:ring-info rounded px-1">
                    {booking.telephone}
                  </a>
                </div>
                <div className="border border-gray-300 rounded-lg p-4 col-span-2">
                  <p className="text-xs font-poppins font-semibold text-gray-500 uppercase mb-2">Address</p>
                  <p className="text-sm font-inter font-normal text-gray-900">{booking.address}</p>
                </div>
              </div>
            </section>

            {/* Property & Rooms */}
            <section className="border-t border-gray-300 pt-6">
              <h3 className="text-lg sm:text-xl font-poppins font-normal text-primary mb-4">Property Details</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {(booking.property_type || booking.form_data?.property_type) && (
                    <div className="border border-gray-300 rounded-lg p-4">
                      <p className="text-xs font-poppins font-semibold text-gray-500 uppercase mb-2">Property Type</p>
                      <p className="text-sm font-inter font-normal text-gray-900">
                        {formatPropertyType(booking.property_type || booking.form_data?.property_type)}
                      </p>
                    </div>
                  )}
                  <div className="border border-gray-300 rounded-lg p-4">
                    <p className="text-xs font-poppins font-semibold text-gray-500 uppercase mb-2">Service Type</p>
                    <p className="text-sm font-inter font-normal text-gray-900">{booking.service_type || 'N/A'}</p>
                  </div>
                  <div className="border border-gray-300 rounded-lg p-4">
                    <p className="text-xs font-poppins font-semibold text-gray-500 uppercase mb-2">Frequency</p>
                    <p className="text-sm font-inter font-normal text-gray-900">{booking.frequency || 'N/A'}</p>
                  </div>
                </div>
                <div className="border border-gray-300 rounded-lg p-4">
                  <p className="text-xs font-poppins font-semibold text-gray-500 uppercase mb-3">
                    Rooms Included
                  </p>
                  {roomBreakdown && roomBreakdown.totalRooms > 0 && (
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
                  )}
                </div>
              </div>
            </section>

            {/* Pricing & Time */}
            {estimate && (
              <section className="border-t border-gray-300 pt-6">
                <h3 className="text-lg sm:text-xl font-poppins font-normal text-primary mb-4">Estimated Costs and Hours</h3>
                <div className="grid grid-cols-2 gap-4">
                  {/* First Clean */}
                  <div className="border border-gray-300 rounded-lg p-4">
                    <h4 className="text-sm font-poppins font-semibold text-primary mb-2">Your First Clean</h4>
                    <p className="text-2xl font-poppins font-bold text-primary mb-2">
                      £{estimate.firstCleanPrice?.toFixed(2) || '0.00'}
                    </p>
                    <p className="text-xs font-inter font-normal text-gray-600 mb-2">Fixed Cost</p>
                    <p className="text-xs font-inter font-semibold text-warning">
                      {estimate.firstCleanHours}h {estimate.firstCleanMinutes}m
                    </p>
                  </div>

                  {/* Maintenance */}
                  {estimate.maintenancePrice && estimate.maintenancePrice > 0 && (
                    <div className="border border-gray-300 rounded-lg p-4">
                      <h4 className="text-sm font-poppins font-semibold text-primary mb-2">Maintenance Price</h4>
                      <p className="text-2xl font-poppins font-bold text-primary mb-2">
                        £{estimate.maintenancePrice?.toFixed(2) || '0.00'}
                      </p>
                      <p className="text-xs font-inter font-normal text-gray-600 mb-2">
                        {booking.frequency ? `${booking.frequency.replace(/_/g, ' ').charAt(0).toUpperCase() + booking.frequency.replace(/_/g, ' ').slice(1)}` : 'Flexible'}
                      </p>
                      <p className="text-xs font-inter font-semibold text-warning">
                        {estimate.maintenanceHours}h {estimate.maintenanceMinutes}m
                      </p>
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>

          {/* Close Button */}
          <div className="border-t border-gray-300 mt-6 pt-6">
            <button
              onClick={onClose}
              className="w-full px-6 py-3 bg-gray-100 text-gray-900 font-poppins font-medium rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-primary focus:outline-none transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
