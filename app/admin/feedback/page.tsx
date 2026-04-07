'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/app/utils/supabase';
import { AdminNavigation } from '@/app/components/admin/nav-admin';

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState<Array<{ id: string; rating: boolean; created_at: string }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [thumbsUp, setThumbsUp] = useState(0);
  const [thumbsDown, setThumbsDown] = useState(0);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setFeedback(data || []);

      const upCount = data?.filter(f => f.rating === true).length || 0;
      const downCount = data?.filter(f => f.rating === false).length || 0;

      setThumbsUp(upCount);
      setThumbsDown(downCount);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteFeedback = async (id: string) => {
    try {
      const { error } = await supabase.from('feedback').delete().eq('id', id);
      if (error) throw error;
      setFeedback(feedback.filter(f => f.id !== id));
      // Recalculate counts
      const upCount = feedback.filter(f => f.rating === true && f.id !== id).length;
      const downCount = feedback.filter(f => f.rating === false && f.id !== id).length;
      setThumbsUp(upCount);
      setThumbsDown(downCount);
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 sm:p-8">
        <p className="text-gray-600">Loading feedback...</p>
      </div>
    );
  }

  const total = thumbsUp + thumbsDown;
  const thumbsUpPercentage = total > 0 ? ((thumbsUp / total) * 100).toFixed(1) : 0;

  return (
    <div className="p-6 sm:p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8" style={{ color: '#48546A' }}>
        Price Feedback
      </h1>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-4xl mb-2">👍</div>
          <div className="text-2xl font-bold mb-1" style={{ color: '#48546A' }}>
            {thumbsUp}
          </div>
          <div className="text-sm text-gray-600">Positive feedback</div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-4xl mb-2">👎</div>
          <div className="text-2xl font-bold mb-1" style={{ color: '#48546A' }}>
            {thumbsDown}
          </div>
          <div className="text-sm text-gray-600">Negative feedback</div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-4xl mb-2">📊</div>
          <div className="text-2xl font-bold mb-1" style={{ color: '#48546A' }}>
            {thumbsUpPercentage}%
          </div>
          <div className="text-sm text-gray-600">Satisfaction rate</div>
        </div>
      </div>

      {/* Feedback List */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold" style={{ color: '#48546A' }}>
            All Feedback ({total})
          </h2>
        </div>

        {feedback.length === 0 ? (
          <div className="p-6 text-gray-600 text-center">
            No feedback yet
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {feedback.map((item) => (
              <div key={item.id} className="p-6 flex items-center justify-between hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">
                    {item.rating ? '👍' : '👎'}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      {new Date(item.created_at).toLocaleDateString()} {new Date(item.created_at).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => deleteFeedback(item.id)}
                  className="text-sm px-4 py-2 text-red-600 hover:bg-red-50 rounded transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Admin Navigation */}
      <AdminNavigation />
    </div>
  );
}
