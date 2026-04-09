'use client';

import React, { useState, useEffect } from 'react';
import { createBooking, sendBookingEmails } from '@/app/bookings/utils/bookingService';
import { BookingFormData, BookingConfirmationProps, FormErrors } from './types';
import { validateForm, isFormValid } from './utils';
import FormHeader from './FormHeader';
import ServiceSummary from './ServiceSummary';
import PricingSummary from './PricingSummary';
import DetailsModal from './DetailsModal';

export default function BookingConfirmation({
  estimateData,
  estimateId,
  onSuccess,
  onError,
}: BookingConfirmationProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmationChecked, setConfirmationChecked] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Pre-fill form data from estimate
  const [formData, setFormData] = useState<BookingFormData>({
    customer_name: estimateData?.name || '',
    email: estimateData?.email || '',
    telephone: estimateData?.telephone || '',
    address: typeof estimateData?.address === 'object'
      ? `${estimateData.address?.street || ''}, ${estimateData.address?.city || ''} ${estimateData.address?.postcode || ''}`.trim()
      : estimateData?.address || '',
  });

  const handleFieldChange = (fieldName: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
    // Clear error for this field when user starts typing
    if (formErrors[fieldName]) {
      setFormErrors((prev) => ({
        ...prev,
        [fieldName]: '',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm(formData, confirmationChecked);
    if (!isFormValid(errors)) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Create booking record with estimate details
      const bookingResult = await createBooking({
        estimate_id: estimateId || '',
        customer_name: formData.customer_name,
        email: formData.email,
        telephone: formData.telephone,
        address: formData.address,
        rooms: estimateData?.rooms,
        service_type: estimateData?.service_type,
        frequency: estimateData?.frequency,
        estimated_price: estimateData?.estimated_price,
      });

      if (!bookingResult.success) {
        throw new Error(bookingResult.error || 'Failed to create booking');
      }

      // Send confirmation emails
      await sendBookingEmails(
        {
          id: bookingResult.id || '',
          estimate_id: estimateId || '',
          customer_name: formData.customer_name,
          email: formData.email,
          telephone: formData.telephone,
          address: formData.address,
        },
        estimateData
      );

      if (onSuccess) {
        onSuccess(bookingResult.id || '');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setFormErrors({ submit: errorMessage });
      if (onError) {
        onError(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormHeader />

        <ServiceSummary formData={estimateData} />

        <PricingSummary formData={estimateData} />

        <h2 className="heading-h3 font-black">
          Ready to book
        </h2>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setShowDetailsModal(true)}
            className="flex-1 btn-primary rounded-lg px-6 py-3"
          >
            Book the Service
          </button>
        </div>

        <p className="text-small text-gray-500 text-left">
          Final Step: Confirm your booking and hear from one of the team within 24 hours to discuss the finer details.
        </p>
      </form>

      {/* Details Modal */}
      <DetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        formData={formData}
        formErrors={formErrors}
        isSubmitting={isSubmitting}
        confirmationChecked={confirmationChecked}
        onFieldChange={handleFieldChange}
        onConfirmationChange={setConfirmationChecked}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
