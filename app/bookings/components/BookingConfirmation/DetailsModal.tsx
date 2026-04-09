'use client';

import React from 'react';
import CustomerDetailsSection from './CustomerDetailsSection';
import ConfirmationCheckbox from './ConfirmationCheckbox';
import SubmitButton from './SubmitButton';
import ErrorMessage from './ErrorMessage';
import { BookingFormData, FormErrors } from './types';

interface DetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: BookingFormData;
  formErrors: FormErrors;
  isSubmitting: boolean;
  confirmationChecked: boolean;
  onFieldChange: (fieldName: string, value: string) => void;
  onConfirmationChange: (checked: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function DetailsModal({
  isOpen,
  onClose,
  formData,
  formErrors,
  isSubmitting,
  confirmationChecked,
  onFieldChange,
  onConfirmationChange,
  onSubmit,
}: DetailsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full sm:max-w-lg h-screen sm:h-auto sm:max-h-[90vh] overflow-y-auto rounded-t-lg sm:rounded-lg shadow-2xl">
        <div className="p-4 sm:p-8 space-y-6">
          {/* Close button */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="heading-h3 font-bold text-primary">Your Details</h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-xl"
            >
              ✕
            </button>
          </div>

          <p className="text-base text-gray-600 mb-6">
            Just double-check everything looks right. Feel free to edit anything that needs changing. Then confirm your booking.
          </p>

          <form onSubmit={onSubmit} className="space-y-6">
            <CustomerDetailsSection
              formData={formData}
              formErrors={formErrors}
              isSubmitting={isSubmitting}
              onFieldChange={onFieldChange}
            />

            <ConfirmationCheckbox
              checked={confirmationChecked}
              onChange={onConfirmationChange}
              error={formErrors.confirmation}
              disabled={isSubmitting}
            />

            {formErrors.submit && (
              <ErrorMessage message={formErrors.submit} isSubmitError={true} />
            )}

            <SubmitButton isSubmitting={isSubmitting} />
          </form>
        </div>
      </div>
    </div>
  );
}
