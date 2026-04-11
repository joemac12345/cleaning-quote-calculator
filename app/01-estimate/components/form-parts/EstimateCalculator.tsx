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
  const [validationError, setValidationError] = useState('');

  // Scroll management (don't disable body scroll)
  useEffect(() => {
    // Body scroll is enabled - no lock needed
    return () => {
      // Cleanup if needed
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
    // Validate required fields in current step
    const currentStepFields = currentStepData?.fields || [];
    const requiredFields = currentStepFields.filter(field => field.required);
    
    // Check if all required fields are filled
    const unfilled = requiredFields.filter(field => {
      const value = formData[field.id];
      
      // Handle empty strings, null, undefined
      if (value === '' || value === null || value === undefined) return true;
      
      // Handle empty objects (for address type)
      if (typeof value === 'object' && Object.keys(value).every(k => !value[k])) return true;
      
      return false;
    });

    if (unfilled.length > 0) {
      setValidationError('Please fill in all required fields');
      return;
    }

    setValidationError('');
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

    // Calculate total rooms from all room types
    const totalRooms = 
      (formData.bedrooms || 0) +
      (formData.bathrooms || 0) +
      (formData.ensuite || 0) +
      (formData.cloakroom || 0) +
      (formData.kitchen || 0) +
      (formData.utility || 0) +
      (formData.living_rooms || 0) +
      (formData.dining_rooms || 0) +
      (formData.studies || 0) +
      ((formData.other_spaces?.other_rooms) || 0);

    try {
      // Save estimate to database
      const estimateResult = await saveEstimateToDatabase(formData);
      
      if (estimateResult.success && estimateResult.id) {
        // Store form data, calculation results, and estimate ID in sessionStorage
        sessionStorage.setItem('estimateFormData', JSON.stringify({
          ...formData,
          // Include all calculated fields for booking page
          rooms: totalRooms,
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
          rooms: totalRooms,
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
        rooms: totalRooms,
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
        {/* Validation Error Message */}
        {validationError && (
          <div className="mb-6 p-4 bg-error/10 border border-error rounded text-error text-sm font-inter font-normal">
            {validationError}
          </div>
        )}

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
