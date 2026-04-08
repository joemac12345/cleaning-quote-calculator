'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import FormSummary from '@/app/components/fields/End-page/FormSummary';
import { saveEstimateToDatabase } from '@/app/utils/estimateService';

export default function FormSummaryPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<Record<string, any> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const hasAttemptedSave = useRef(false);

  useEffect(() => {
    // Get form data from sessionStorage
    const storedData = sessionStorage.getItem('estimateFormData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setFormData(parsedData);
        // Auto-save to database (only once)
        if (!hasAttemptedSave.current) {
          hasAttemptedSave.current = true;
          saveEstimate(parsedData);
        }
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

  const saveEstimate = async (data: Record<string, any>) => {
    setIsSaving(true);
    const result = await saveEstimateToDatabase(data);
    if (result.success) {
      setSaveStatus('success');
      console.log('Estimate saved successfully:', result.id);
    } else {
      setSaveStatus('error');
      console.error('Failed to save estimate:', result.error);
    }
    setIsSaving(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600">Loading your estimate...</div>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600">No estimate data found. Redirecting...</div>
      </div>
    );
  }

  return (
    <>
      {/* Save Status Indicator */}
      {isSaving && (
        <div className="fixed top-4 right-4 bg-primary text-white px-4 py-2 rounded-lg font-poppins font-thin">
          Saving estimate...
        </div>
      )}
      {saveStatus === 'error' && (
        <div className="fixed top-4 right-4 bg-primary text-white px-4 py-2 rounded-lg font-poppins font-thin">
          ✕ Failed to save estimate
        </div>
      )}

      <FormSummary
        formData={formData}
        isOpen={true}
        onClose={() => router.push('/')}
        onEdit={(stepId) => {
          sessionStorage.removeItem('estimateFormData');
          router.push(`/?step=${stepId}`);
        }}
        isModal={false}
        saveStatus={saveStatus}
      />
    </>
  );
}
