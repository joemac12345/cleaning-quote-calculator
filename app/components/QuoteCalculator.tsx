'use client';

import { useState, useMemo } from 'react';
import { formSteps } from '@/app/config/formConfig';
import { calculateQuote } from '@/app/utils/quoteCalculation';
import FormStepRenderer from './FormStepRenderer';
import FormNavigation from './FormNavigation';

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
    <div className="min-h-screen bg-white text-gray-900">
      {/* Main Form */}
      <div className="max-w-2xl mx-auto px-3 sm:px-4 pt-3 sm:pt-6 pb-6 sm:pb-12">
        {/* Step Content */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-3xl font-medium mb-3 sm:mb-2">{currentStepData.title}</h2>
          <FormStepRenderer
            step={currentStepData}
            formData={formData}
            onFieldChange={handleFieldChange}
          />
        </div>

        {/* Submit Button (shown only on final step when contact info is filled) */}
        {currentStep === formSteps.length && formData.name && formData.telephone && formData.email && !isSubmitted && (
          <div className="mb-8">
            <button
              onClick={handleSubmit}
              className="w-full px-6 py-3 bg-[#48546A] text-white rounded-lg hover:bg-[#3a3f52] font-medium transition"
            >
              Submit & View Quote
            </button>
          </div>
        )}

        {/* Quote Modal - Auto-shown after submission */}
        {(showQuoteModal || isSubmitted) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-lg p-4 sm:p-8 max-w-2xl w-full my-8">
              <h3 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-8 text-gray-900">Your Quote</h3>
              
              {/* Summary Section */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-3 max-h-64 overflow-y-auto">
                <h4 className="font-bold text-gray-900 mb-3">Your Selections:</h4>
                
                {formData.service_type && (
                  <div className="text-sm">
                    <span className="text-gray-600">Service Type:</span>
                    <span className="font-semibold text-gray-900 ml-2 capitalize">{formData.service_type}</span>
                  </div>
                )}
                
                {formData.bedrooms > 0 && (
                  <div className="text-sm">
                    <span className="text-gray-600">Bedrooms:</span>
                    <span className="font-semibold text-gray-900 ml-2">{formData.bedrooms}</span>
                  </div>
                )}
                
                {formData.floors > 0 && (
                  <div className="text-sm">
                    <span className="text-gray-600">Floors:</span>
                    <span className="font-semibold text-gray-900 ml-2">{formData.floors}</span>
                  </div>
                )}
                
                {formData.bathrooms > 0 && (
                  <div className="text-sm">
                    <span className="text-gray-600">Bathrooms:</span>
                    <span className="font-semibold text-gray-900 ml-2">{formData.bathrooms}</span>
                  </div>
                )}
                
                {formData.cloakroom > 0 && (
                  <div className="text-sm">
                    <span className="text-gray-600">Cloakrooms:</span>
                    <span className="font-semibold text-gray-900 ml-2">{formData.cloakroom}</span>
                  </div>
                )}
                
                {formData.receptions > 0 && (
                  <div className="text-sm">
                    <span className="text-gray-600">Receptions:</span>
                    <span className="font-semibold text-gray-900 ml-2">{formData.receptions}</span>
                  </div>
                )}
                
                {formData.utility > 0 && (
                  <div className="text-sm">
                    <span className="text-gray-600">Utility Rooms:</span>
                    <span className="font-semibold text-gray-900 ml-2">{formData.utility}</span>
                  </div>
                )}
                
                {formData.box_room > 0 && (
                  <div className="text-sm">
                    <span className="text-gray-600">Box Rooms:</span>
                    <span className="font-semibold text-gray-900 ml-2">{formData.box_room}</span>
                  </div>
                )}
                
                {formData.hall > 0 && (
                  <div className="text-sm">
                    <span className="text-gray-600">Halls:</span>
                    <span className="font-semibold text-gray-900 ml-2">{formData.hall}</span>
                  </div>
                )}
                
                {formData.pet_friendly && (
                  <div className="text-sm">
                    <span className="text-gray-600">Pet Friendly Setup:</span>
                    <span className="font-semibold text-gray-900 ml-2 capitalize">{formData.pet_friendly}</span>
                  </div>
                )}
                
                {formData.extras && Object.keys(formData.extras).some(key => formData.extras[key] > 0) && (
                  <div className="text-sm">
                    <span className="text-gray-600">Add-ons:</span>
                    <div className="ml-2">
                      {formData.extras.oven > 0 && <span className="font-semibold text-gray-900">Oven ({formData.extras.oven}), </span>}
                      {formData.extras.fridge > 0 && <span className="font-semibold text-gray-900">Fridge ({formData.extras.fridge}), </span>}
                      {formData.extras.windows > 0 && <span className="font-semibold text-gray-900">Windows ({formData.extras.windows})</span>}
                    </div>
                  </div>
                )}
                
                <div className="text-sm">
                  <span className="text-gray-600">Frequency:</span>
                  <span className="font-semibold text-gray-900 ml-2 capitalize">{formData.frequency}</span>
                </div>
              </div>
              
              {/* Cleaning Type */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Cleaning Type</p>
                <p className="text-base sm:text-lg font-bold text-[#48546A] capitalize">
                  {formData.frequency === 'one-off' ? 'One-off Cleaning' : 
                   formData.frequency === 'weekly' ? 'Weekly Cleaning' :
                   formData.frequency === 'fortnightly' ? 'Fortnightly Cleaning' :
                   formData.frequency === 'monthly' ? 'Monthly Cleaning' : 'One-off Cleaning'}
                </p>
              </div>

              {/* Time Summary */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Estimated Cleaning Time</p>
                <p className="text-lg sm:text-2xl font-bold text-[#48546A]">
                  {quote.hours}h {quote.minutes}m
                </p>
                <p className="text-xs text-gray-500 mt-1">@ £22/hour</p>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Base Price</span>
                  <span className="font-semibold text-gray-900">£{quote.basePrice}</span>
                </div>
                
                {quote.maintenanceDiscount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Maintenance Discount <span className="text-xs">(-15%)</span></span>
                    <span className="font-semibold text-green-600">-£{quote.maintenanceDiscount.toFixed(2)}</span>
                  </div>
                )}
                
                {quote.serviceMultiplierPercent !== 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Service Premium <span className="text-xs">({quote.serviceMultiplierPercent.toFixed(0)}%)</span></span>
                    <span className="font-semibold text-[#48546A]">+£{quote.servicePremium}</span>
                  </div>
                )}
                
                {quote.discountPercent !== 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Frequency Discount <span className="text-xs">({quote.discountPercent.toFixed(0)}%)</span></span>
                    <span className={quote.discountPercent < 0 ? 'font-semibold text-green-600' : 'font-semibold text-orange-600'}>
                      {quote.discountPercent < 0 ? '-' : '+'}£{quote.saving}
                    </span>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="border-t-2 border-gray-200 pt-3 sm:pt-4 mb-4 sm:mb-6">
                {quote.isRecurring ? (
                  <div className="space-y-3">
                    <div className="flex justify-between items-start sm:items-center gap-2">
                      <span className="text-base sm:text-lg font-bold text-gray-900">First Payment</span>
                      <p className="text-2xl sm:text-3xl font-bold text-[#48546A]">
                        £{quote.firstCleanPrice}
                      </p>
                    </div>
                    <div className="flex justify-between items-start sm:items-center gap-2 bg-blue-50 p-2 sm:p-3 rounded-lg">
                      <span className="text-base sm:text-lg font-bold text-gray-900">Maintenance Price</span>
                      <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                        £{quote.maintenancePrice}
                      </p>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 text-center">Per clean going forward</p>
                  </div>
                ) : (
                  <div className="flex justify-between items-start sm:items-center gap-2">
                    <span className="text-base sm:text-lg font-bold text-gray-900">Total Price</span>
                    <p className="text-3xl sm:text-4xl font-bold text-[#48546A]">
                      £{quote.totalPrice}
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={() => setShowQuoteModal(false)}
                className="w-full px-4 py-3 bg-[#48546A] text-white rounded-lg hover:bg-[#3a3f52] font-medium transition"
              >
                Close
              </button>
            </div>
          </div>
        )}

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
