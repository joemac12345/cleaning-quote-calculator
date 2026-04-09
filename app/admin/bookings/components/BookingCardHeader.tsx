import React from 'react';

interface BookingCardHeaderProps {
  customerName: string;
  email: string;
  telephone: string;
  createdAt: string;
  formatDate: (date: string) => string;
}

export default function BookingCardHeader({
  customerName,
  createdAt,
  formatDate,
}: BookingCardHeaderProps) {
  return (
    <div className="px-3 sm:px-4 py-3 border-b border-gray-200">
      <div className="flex justify-between items-start gap-4 mb-2">
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-semibold truncate text-primary">
            {customerName}
          </h3>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-xs text-gray-600">{formatDate(createdAt)}</p>
      </div>
    </div>
  );
}
