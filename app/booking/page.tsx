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
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg font-inter">Loading...</p>
      </div>
    );
  }

  // Success state
  if (bookingSuccess) {
    return (
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 py-12 sm:py-16">
          {/* Success Message */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-3xl">✓</span>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-green-700 font-poppins mb-4">
              Booking Confirmed!
            </h1>
            <p className="text-gray-600 text-base sm:text-lg font-inter mb-8">
              Thank you for your booking. Our team will contact you within 24 hours to arrange a date and time.
            </p>

            {/* Booking Reference */}
            {bookingId && (
              <div className="p-6 mb-8 inline-block">
                <p className="text-sm text-gray-600 font-inter mb-2">Booking Reference</p>
                <p className="text-2xl font-bold text-primary font-poppins">{bookingId}</p>
              </div>
            )}

            {/* Next Steps */}
            <div className="p-6 mb-8 text-left max-w-2xl mx-auto">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 font-poppins">What Happens Next?</h2>
              <ol className="space-y-3 text-sm sm:text-base text-gray-700 font-inter">
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.href = '/'}
                className="btn-primary px-8 py-3 font-poppins font-semibold rounded-lg transition"
              >
                Return Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Booking form state - no estimate data
  if (!estimateData) {
    return (
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 py-12 sm:py-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary font-poppins mb-4">
            No Estimate Found
          </h1>
          <p className="text-gray-600 text-base sm:text-lg font-inter mb-8">
            Please complete an estimate first before proceeding to book.
          </p>
          <button
            onClick={() => window.location.href = '/01-estimate'}
            className="btn-primary px-8 py-3 font-poppins font-semibold rounded-lg transition"
          >
            Start Estimate
          </button>
        </div>
      </div>
    );
  }

  // Booking form state - with estimate data
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 py-12 sm:py-16">
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
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-600 text-lg font-inter">Loading...</p>
        </div>
      }
    >
      <BookingPageContent />
    </Suspense>
  );
}
