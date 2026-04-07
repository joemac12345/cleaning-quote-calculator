'use client';

import { useState } from 'react';
import { supabase } from '@/app/utils/supabase';

export default function FeedbackWidget() {
  const [hasRated, setHasRated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFeedback = async (isPositive: boolean) => {
    setIsLoading(true);
    try {
      await supabase.from('feedback').insert([
        {
          rating: isPositive,
          created_at: new Date().toISOString(),
        },
      ]);
      setHasRated(true);
      setTimeout(() => setHasRated(false), 3000);
    } catch (error) {
      console.error('Error saving feedback:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (hasRated) {
    return (
      <div className="text-sm text-gray-600">
        ✓ Thank you for your feedback! We really appreciate your input on our pricing.
      </div>
    );
  }

  return (
    <div className="py-4">
      <p className="text-sm text-gray-700 mb-3">
        <span className="font-semibold">Your feedback matters to us.</span> We're constantly working to offer fair pricing for quality service. How did you feel about the price?
      </p>
      <div className="flex items-center gap-4">
        <button
          onClick={() => handleFeedback(true)}
          disabled={isLoading}
          className="text-3xl hover:scale-110 transition disabled:opacity-50"
          title="Yes, fair price"
        >
          👍
        </button>
        <button
          onClick={() => handleFeedback(false)}
          disabled={isLoading}
          className="text-3xl hover:scale-110 transition disabled:opacity-50"
          title="No, not fair"
        >
          👎
        </button>
      </div>
    </div>
  );
}
