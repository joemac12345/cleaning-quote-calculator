import React from 'react';
import BookingCardHeader from './BookingCardHeader';
import BookingContactInfo from './BookingContactInfo';
import BookingPropertyDetails from './BookingPropertyDetails';
import BookingJobDetails from './BookingJobDetails';
import StatusBadge from './StatusBadge';

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
  return (
    <div className="bg-white rounded-lg border border-gray-300 hover:shadow-lg transition overflow-hidden">
      <BookingCardHeader
        customerName={booking.customer_name}
        email={booking.email}
        telephone={booking.telephone}
        status={booking.status}
        createdAt={booking.created_at}
        onStatusChange={(newStatus) => onStatusChange(booking.id, newStatus)}
        statusOptions={statusOptions}
        formatDate={formatDate}
      />

      <div className="p-3 sm:p-4 space-y-3">
        <BookingContactInfo
          email={booking.email}
          telephone={booking.telephone}
          address={booking.address}
        />

        <BookingPropertyDetails
          propertyType={booking.property_type}
          formData={booking.form_data}
        />

        <BookingJobDetails estimateData={booking.estimate_data || null} />

        <StatusBadge status={booking.status} statusColors={statusColors} />
      </div>
    </div>
  );
}
