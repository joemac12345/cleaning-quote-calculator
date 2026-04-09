'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { formSteps } from '@/app/config/formConfig';
import { calculateEstimate } from '@/app/utils/estimateCalculation';
import { saveEstimateToDatabase } from '@/app/utils/estimateService';
import FormStepRenderer from './FormStepRenderer';
import FormNavigation from './FormNavigation';

interface EstimateCalculatorProps {
  onFormDataChange?: (formData: Record<string, any>) => void;
}

export default function EstimateCalculator({ onFormDataChange }: EstimateCalculatorProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  // Disable body scroll on mount, re-enable on unmount
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Initialize form data with all field initial values
  const [formData, setFormData] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    formSteps.forEach((step) => {
      step.fields.forEach((field) => {
        initial[field.id] = field.initialValue;
      });
    });
    return initial;
  });

  // Sync form data changes to parent
  useEffect(() => {
    onFormDataChange?.(formData);
  }, [formData, onFormDataChange]);

  // Calculate estimate whenever form data changes
  const estimate = useMemo(() => {
    return calculateEstimate(formData, formData.frequency || 'one-off');
  }, [formData]);

  // Get current step
  const currentStepData = formSteps.find((s) => s.id === currentStep);

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleNext = () => {
    if (currentStep < formSteps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    console.log('Form submitted:', {
      ...formData,
      estimate,
    });

    try {
      // Save estimate to database
      const estimateResult = await saveEstimateToDatabase(formData);
      
      if (estimateResult.success && estimateResult.id) {
        // Store form data, calculation results, and estimate ID in sessionStorage
        sessionStorage.setItem('estimateFormData', JSON.stringify({
          ...formData,
          // Include all calculated fields for booking page
          first_clean_price: estimate?.firstCleanPrice,
          maintenance_price: estimate?.maintenancePrice,
          first_clean_hours: estimate?.firstCleanHours,
          first_clean_minutes: estimate?.firstCleanMinutes,
          maintenance_hours: estimate?.maintenanceHours,
          maintenance_minutes: estimate?.maintenanceMinutes,
        }));
        sessionStorage.setItem('estimateId', estimateResult.id);
        
        // Navigate to booking page with estimate ID as query param
        router.push(`/bookings?estimateId=${estimateResult.id}`);
      } else {
        console.error('Failed to save estimate:', estimateResult.error);
        // Still allow navigation even if save fails
        sessionStorage.setItem('estimateFormData', JSON.stringify({
          ...formData,
          first_clean_price: estimate?.firstCleanPrice,
          maintenance_price: estimate?.maintenancePrice,
          first_clean_hours: estimate?.firstCleanHours,
          first_clean_minutes: estimate?.firstCleanMinutes,
          maintenance_hours: estimate?.maintenanceHours,
          maintenance_minutes: estimate?.maintenanceMinutes,
        }));
        router.push('/bookings');
      }
    } catch (error) {
      console.error('Error during form submission:', error);
      // Still allow navigation as fallback
      sessionStorage.setItem('estimateFormData', JSON.stringify({
        ...formData,
        first_clean_price: estimate?.firstCleanPrice,
        maintenance_price: estimate?.maintenancePrice,
        first_clean_hours: estimate?.firstCleanHours,
        first_clean_minutes: estimate?.firstCleanMinutes,
        maintenance_hours: estimate?.maintenanceHours,
        maintenance_minutes: estimate?.maintenanceMinutes,
      }));
      router.push('/bookings');
    }
  };

  if (!currentStepData) {
    return <div>Error: Invalid step</div>;
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Main Content - Adjusted for fixed navbar */}
      <div className="max-w-2xl mx-auto px-3 sm:px-4 pt-4 sm:pt-6 pb-24 sm:pb-28">
        {/* Step Content */}
        <div className="mb-8 sm:mb-12">
          <FormStepRenderer
            step={currentStepData}
            formData={formData}
            onFieldChange={handleFieldChange}
          />
        </div>

        {/* Navigation */}
        <FormNavigation
          currentStep={currentStep}
          totalSteps={formSteps.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
          isLastStep={currentStep === formSteps.length}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
