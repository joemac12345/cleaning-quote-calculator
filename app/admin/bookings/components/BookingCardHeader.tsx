import React from 'react';

interface BookingCardHeaderProps {
  customerName: string;
  email: string;
  telephone: string;
  status: string;
  createdAt: string;
  onStatusChange: (newStatus: string) => void;
  statusOptions: Array<{ value: string; label: string }>;
  formatDate: (date: string) => string;
}

export default function BookingCardHeader({
  customerName,
  email,
  telephone,
  status,
  createdAt,
  onStatusChange,
  statusOptions,
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
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="text-xs px-3 py-1.5 rounded-md border border-primary focus:outline-none flex-shrink-0"
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-xs text-gray-600">{formatDate(createdAt)}</p>
        <div className="flex gap-2">
          <a
            href={`mailto:${email}`}
            className="text-white w-8 h-8 sm:w-9 sm:h-9 rounded-full transition flex items-center justify-center hover:opacity-80 bg-primary"
            title={email}
          >
            <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
            </svg>
          </a>
          <a
            href={`tel:${telephone}`}
            className="text-white w-8 h-8 sm:w-9 sm:h-9 rounded-full transition flex items-center justify-center hover:opacity-80 bg-primary"
            title={telephone}
          >
            <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
