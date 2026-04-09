import React from 'react';

interface BookingContactInfoProps {
  email: string;
  telephone: string;
  address: string;
}

export default function BookingContactInfo({ email, telephone, address }: BookingContactInfoProps) {
  return (
    <>
      {/* Email */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase">Email</p>
        <p className="text-xs sm:text-sm text-gray-700 break-all">{email}</p>
      </div>

      {/* Phone */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase">Phone</p>
        <p className="text-xs sm:text-sm text-gray-700">{telephone}</p>
      </div>

      {/* Address */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase">Address</p>
        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs sm:text-sm text-info hover:text-info underline break-words"
        >
          {address}
        </a>
      </div>
    </>
  );
}
