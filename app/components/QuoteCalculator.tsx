'use client';

import { useState, useMemo } from 'react';
import { formSteps } from '@/app/config/formConfig';
import { calculateQuote } from '@/app/utils/quoteCalculation';
import FormStepRenderer from './FormStepRenderer';
import FormNavigation from './FormNavigation';
import QuoteModal from './QuoteModal';

export default function QuoteCalculator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  // Calculate quote whenever form data changes
  const quote = useMemo(() => {
    return calculateQuote(formData, formData.frequency || 'one-off');
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

  const handleSubmit = () => {
    console.log('Form submitted:', {
      ...formData,
      quote,
    });
    // TODO: Connect to backend/email service
    setIsSubmitted(true);
  };

  if (!currentStepData) {
    return <div>Error: Invalid step</div>;
  }

  return (
    <div className="h-screen overflow-hidden bg-white text-gray-900 flex flex-col">
      {/* Main Form */}
      <div className="max-w-2xl mx-auto px-3 sm:px-4 pt-3 sm:pt-6 pb-6 sm:pb-12 flex-1 overflow-y-auto">
        {/* Step Content */}
        <div className="mb-8 sm:mb-12">
          <FormStepRenderer
            step={currentStepData}
            formData={formData}
            onFieldChange={handleFieldChange}
          />
        </div>

        {/* Quote Modal */}
        <QuoteModal
          isOpen={showQuoteModal || isSubmitted}
          onClose={() => {
            setShowQuoteModal(false);
            setIsSubmitted(false);
          }}
          formData={formData}
          quote={quote}
        />

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
