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

  const frequencyMap: Record<string, string> = {
    weekly: 'Weekly',
    'bi-weekly': 'Bi-weekly',
    'tri-weekly': 'Tri-weekly',
    monthly: 'Monthly',
    'one-off': 'One-off',
  };

  const frequencyLabel = frequencyMap[frequency] || frequency;

  return (
    <div className="mb-8">
      <h2 className="heading-h2 font-bold text-primary mb-4">Estimated costs and hours</h2>
      <div className="flex gap-4">
      {/* Your First Clean */}
      <div className="flex-1 border border-gray-300 rounded-lg p-3 sm:p-4">
        <h3 className="text-sm font-semibold text-primary mb-2">Your First Clean</h3>
        <div className="flex items-baseline gap-2">
          <p className="text-xl sm:text-2xl font-bold text-primary">
            £{isFinite(estimateStats.firstCleanPrice) ? estimateStats.firstCleanPrice.toFixed(2) : '0.00'}
          </p>
        </div>
        <p className="text-xs text-gray-600 mt-1 mb-2">
          Fixed cost
        </p>
        <p className="text-xs text-warning font-semibold">
          {estimateStats.firstCleanHours || 0}h {estimateStats.firstCleanMinutes || 0}m
        </p>
      </div>

      {/* Maintenance Price - only show if not one-off */}
      {frequency !== 'one-off' && (
        <div className="flex-1 border border-gray-300 rounded-lg p-3 sm:p-4">
          <h3 className="text-sm font-semibold text-primary mb-2">Maintenance Price</h3>
          <div className="flex items-baseline gap-2">
            <p className="text-xl sm:text-2xl font-bold text-primary">
              £{isFinite(estimateStats.maintenancePrice) ? estimateStats.maintenancePrice.toFixed(2) : '0.00'}
            </p>
          </div>
          <div className="flex gap-2 text-xs text-gray-600 mt-1 mb-2">
            <p>Flexible</p>
            <p>•</p>
            <p>{frequencyLabel}</p>
          </div>
          <p className="text-xs text-warning font-semibold">
            {estimateStats.maintenanceHours || 0}h {estimateStats.maintenanceMinutes || 0}m
          </p>
        </div>
      )}
      </div>
    </div>
  );
}
