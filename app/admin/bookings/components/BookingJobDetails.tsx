import React from 'react';

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

interface BookingJobDetailsProps {
  estimateData: EstimateData | null;
}

export default function BookingJobDetails({ estimateData }: BookingJobDetailsProps) {
  if (!estimateData) return null;

  return (
    <div className="pt-3 border-t border-gray-200 space-y-2">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase">Rooms</p>
          <p className="text-xs sm:text-sm text-gray-700">{estimateData.rooms || 'N/A'}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase">Service Type</p>
          <p className="text-xs sm:text-sm text-gray-700">{estimateData.serviceType || 'N/A'}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase">Frequency</p>
          <p className="text-xs sm:text-sm text-gray-700">{estimateData.frequency || 'N/A'}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase">Time Estimate</p>
          <p className="text-xs sm:text-sm text-gray-700">
            First: {estimateData.firstCleanHours}h {estimateData.firstCleanMinutes}m
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-100">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase">First Clean</p>
          <p className="text-xs sm:text-sm font-semibold text-primary">
            £{estimateData.firstCleanPrice?.toFixed(2) || '0.00'}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase">Maintenance</p>
          <p className="text-xs sm:text-sm font-semibold text-primary">
            £{estimateData.maintenancePrice?.toFixed(2) || '0.00'}
          </p>
        </div>
      </div>
    </div>
  );
}
