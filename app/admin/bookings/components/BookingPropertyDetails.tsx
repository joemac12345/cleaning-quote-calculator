import React from 'react';
import { extractRoomBreakdown, formatPropertyType } from '../utils/roomBreakdown';

interface BookingPropertyDetailsProps {
  propertyType?: string;
  formData?: Record<string, any>;
}

export default function BookingPropertyDetails({ propertyType, formData }: BookingPropertyDetailsProps) {
  const roomBreakdown = formData ? extractRoomBreakdown(formData) : null;

  if (!propertyType && !roomBreakdown) {
    return null;
  }

  return (
    <div className="pt-3 border-t border-gray-200 space-y-3">
      {/* Property Type */}
      {propertyType && (
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase">Property Type</p>
          <p className="text-xs sm:text-sm text-gray-700">{formatPropertyType(propertyType)}</p>
        </div>
      )}

      {/* Room Breakdown */}
      {roomBreakdown && roomBreakdown.totalRooms > 0 && (
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <p className="text-xs font-semibold text-gray-500 uppercase">Rooms</p>
            <p className="text-xs sm:text-sm font-semibold text-primary">{roomBreakdown.totalRooms} Total</p>
          </div>
          <div className="space-y-1">
            {roomBreakdown.rooms.map((room) => (
              <div key={room.label} className="flex justify-between items-center text-xs sm:text-sm">
                <span className="text-gray-600">{room.label}</span>
                <span className="font-semibold text-primary">{room.count}x</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
