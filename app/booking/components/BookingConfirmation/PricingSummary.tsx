import { useMemo } from 'react';
import { calculateEstimate, EstimateStats } from '@/app/utils/estimateCalculation';

interface PricingSummaryProps {
  formData: Record<string, any>;
}

export default function PricingSummary({ formData }: PricingSummaryProps) {
  const estimateStats: EstimateStats | null = useMemo(() => {
    try {
      const frequency = formData.frequency || 'one-off';
      return calculateEstimate(formData, frequency);
    } catch (error) {
      console.error('Error calculating estimate:', error);
      return null;
    }
  }, [formData]);

  if (!estimateStats) {
    return null;
  }

  const frequency = formData.frequency || 'one-off';

  return (
    <div className="flex gap-4 mb-8">
      {/* Your First Clean */}
      <div className="flex-1 border border-gray-200 rounded-lg p-3 sm:p-4">
        <h3 className="text-sm font-semibold text-primary font-poppins mb-2">Your First Clean</h3>
        <div className="flex items-baseline gap-2">
          <p className="text-xl sm:text-2xl font-bold text-primary font-poppins">
            £{isFinite(estimateStats.firstCleanPrice) ? estimateStats.firstCleanPrice.toFixed(2) : '0.00'}
          </p>
        </div>
        <p className="text-xs text-pink-500 font-inter font-semibold mt-2">
          3hr +
        </p>
      </div>

      {/* Maintenance Price - only show if not one-off */}
      {frequency !== 'one-off' && (
        <div className="flex-1 border border-gray-200 rounded-lg p-3 sm:p-4">
          <h3 className="text-sm font-semibold text-primary font-poppins mb-2">Maintenance Price</h3>
          <div className="flex items-baseline gap-2">
            <p className="text-xl sm:text-2xl font-bold text-primary font-poppins">
              £{isFinite(estimateStats.maintenancePrice) ? estimateStats.maintenancePrice.toFixed(2) : '0.00'}
            </p>
          </div>
          <p className="text-xs text-pink-500 font-inter font-semibold mt-2">
            {estimateStats.maintenanceHours || 0}h {estimateStats.maintenanceMinutes || 0}m
          </p>
        </div>
      )}
    </div>
  );
}
