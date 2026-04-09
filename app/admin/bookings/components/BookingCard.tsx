import React, { useState } from 'react';
import BookingCardHeader from './BookingCardHeader';
import StatusBadge from './StatusBadge';
import BookingDetailsModal from './BookingDetailsModal';

interface EstimateData {
  rooms?: number;
  serviceType?: string;
  frequency?: string;
  firstCleanPrice?: number;
  maintenancePrice?: number;
  firstCleanHours?: number;
  firstCleanMinutes?: number;
  maintenanceHours?: number;
  maintenanceMinutes?: number;
}

interface Booking {
  id: string;
  customer_name: string;
  email: string;
  telephone: string;
  address: string;
  property_type?: string;
  form_data?: Record<string, any>;
  status: string;
  created_at: string;
  estimate_data?: EstimateData;
}

interface BookingCardProps {
  booking: Booking;
  statusOptions: Array<{ value: string; label: string }>;
  statusColors: Record<string, string>;
  onStatusChange: (bookingId: string, newStatus: string) => void;
  formatDate: (date: string) => string;
}

export default function BookingCard({
  booking,
  statusOptions,
  statusColors,
  onStatusChange,
  formatDate,
}: BookingCardProps) {
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-300 hover:shadow-lg transition overflow-hidden">
        <BookingCardHeader
          customerName={booking.customer_name}
          createdAt={booking.created_at}
          formatDate={formatDate}
        />

        <div className="p-3 sm:p-4 space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg sm:text-xl font-bold text-primary">
                £{booking.estimate_data?.firstCleanPrice?.toFixed(2) || '0.00'}
              </p>
            </div>
            <button
              onClick={() => setShowDetailsModal(true)}
              className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:opacity-90 transition"
            >
              View Details
            </button>
          </div>
        </div>
      </div>

      <BookingDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        booking={booking}
        statusOptions={statusOptions}
        onStatusChange={onStatusChange}
      />
    </>
  );
}
