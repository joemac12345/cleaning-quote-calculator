import React, { useState } from 'react';
import EstimateDetailsModal from './EstimateDetailsModal';

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

interface EstimateCardProps {
  estimate: Estimate;
  statusOptions: Array<{ value: string; label: string }>;
  onStatusChange: (estimateId: string, newStatus: string) => void;
  onDelete: (estimateId: string) => void;
  formatDate: (date: string) => string;
}

export default function EstimateCard({
  estimate,
  statusOptions,
  onStatusChange,
  onDelete,
  formatDate,
}: EstimateCardProps) {
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const estimateData: EstimateData = {
    rooms: undefined,
    serviceType: estimate.service_type,
    frequency: estimate.frequency,
    firstCleanPrice: estimate.first_clean_price,
    maintenancePrice: estimate.maintenance_price,
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-300 hover:shadow-lg transition overflow-hidden">
        {/* Header */}
        <div className="px-3 sm:px-4 py-3 sm:py-4 border-b border-gray-200">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                {estimate.customer_name}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {formatDate(estimate.created_at)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={estimate.status || 'new'}
                onChange={(e) => onStatusChange(estimate.id, e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded text-xs font-medium bg-white hover:bg-gray-50 focus:outline-none text-primary"
              >
                {statusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to delete this estimate?')) {
                    onDelete(estimate.id);
                  }
                }}
                className="px-3 py-1 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-3 sm:p-4 space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg sm:text-xl font-bold text-primary">
                £{estimate.first_clean_price?.toFixed(2) || '0.00'}
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

      <EstimateDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        estimate={estimate}
      />
    </>
  );
}
