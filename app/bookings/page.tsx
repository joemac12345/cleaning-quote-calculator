'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import BookingConfirmation from './components/BookingConfirmation';

function BookingPageContent() {
  const searchParams = useSearchParams();
  const [estimateData, setEstimateData] = useState<Record<string, any> | null>(null);
  const [estimateId, setEstimateId] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get estimate data from sessionStorage
    const storedData = sessionStorage.getItem('estimateFormData');
    const storedEstimateId = sessionStorage.getItem('estimateId');
    
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setEstimateData(parsedData);
      } catch (error) {
        console.error('Failed to parse estimate data:', error);
      }
    }

    if (storedEstimateId) {
      setEstimateId(storedEstimateId);
    }

    setIsLoading(false);
  }, []);

  const handleBookingSuccess = (newBookingId: string) => {
    setBookingId(newBookingId);
    setBookingSuccess(true);
  };

  const handleBackToSummary = () => {
    window.history.back();
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="mt-[50px] min-h-screen flex items-center justify-center">
        <p className="body-text">Loading...</p>
      </div>
    );
  }

  // Success state
  if (bookingSuccess) {
    return (
      <div className="mt-[50px]">
        {/* Success Message */}
        <div className="text-left mb-12">
          <div className="flex mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-3xl">✓</span>
            </div>
          </div>
          <h1 className="heading-h1 text-success mb-4">
            Booking Confirmed!
          </h1>
          <p className="body-text text-gray-600 mb-8">
            Thank you for your booking. Our team will contact you within 24 hours to arrange a date and time.
          </p>

          {/* Booking Reference */}
          {bookingId && (
            <div className="mb-8">
              <p className="text-small text-gray-600">
                Booking Reference: <span className="font-bold text-primary">{bookingId}</span>
              </p>
            </div>
          )}

          {/* Next Steps */}
          <div className="mb-8 text-left">
            <h2 className="heading-h3 mb-4">What Happens Next?</h2>
            <ol className="space-y-3 text-small text-gray-600">
              <li className="flex gap-3">
                <span className="font-bold">1.</span>
                <span>Our team will review your booking</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold">2.</span>
                <span>We'll contact you to confirm the date and time</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold">3.</span>
                <span>You'll receive a confirmation email with all details</span>
              </li>
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => window.location.href = '/'}
              className="btn-primary px-8 py-3 transition"
            >
              Return Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Booking form state - no estimate data
  if (!estimateData) {
    return (
      <div className="mt-[50px]">
        <h1 className="heading-h1 text-primary mb-4">
          No Estimate Found
        </h1>
        <p className="body-text text-gray-600 mb-8">
          Please complete an estimate first before proceeding to book.
        </p>
        <button
          onClick={() => window.location.href = '/01-estimate'}
          className="btn-primary px-8 py-3 transition"
        >
          Start Estimate
        </button>
      </div>
    );
  }

  // Booking form state - with estimate data
  return (
    <div className="mt-[50px]">
      {/* Booking Confirmation Form */}
      <div>
        <BookingConfirmation
          estimateData={estimateData}
          estimateId={estimateId || ''}
          onSuccess={handleBookingSuccess}
          onError={(error) => console.error('Booking error:', error)}
        />
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="mt-[50px] min-h-screen flex items-center justify-center">
          <p className="body-text">Loading...</p>
        </div>
      }
    >
      <BookingPageContent />
    </Suspense>
  );
}
