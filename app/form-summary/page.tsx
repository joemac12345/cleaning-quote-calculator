'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FormSummary from '@/app/components/fields/End -page/FormSummary';

export default function FormSummaryPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<Record<string, any> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get form data from sessionStorage
    const storedData = sessionStorage.getItem('quoteFormData');
    if (storedData) {
      try {
        setFormData(JSON.parse(storedData));
      } catch (error) {
        console.error('Failed to parse form data:', error);
        router.push('/');
      }
    } else {
      // Redirect back to form if no data
      router.push('/');
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600">Loading your quote...</div>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600">No quote data found. Redirecting...</div>
      </div>
    );
  }

  return (
    <FormSummary
      formData={formData}
      isOpen={true}
      onClose={() => router.push('/')}
      onEdit={(stepId) => {
        sessionStorage.removeItem('quoteFormData');
        router.push(`/?step=${stepId}`);
      }}
      isModal={false}
    />
  );
}
