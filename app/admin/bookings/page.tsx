'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/app/utils/supabase';
import Link from 'next/link';

interface Booking {
  id: string;
  estimate_id: string;
  customer_name: string;
  email: string;
  telephone: string;
  address: string;
  status: string;
  created_at: string;
  confirmed_at: string | null;
}

export default function BookingsAdmin() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchBookings();
  }, [filter]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError('');
      
      let query = supabase.from('bookings').select('*');
      
      if (filter !== 'all') {
        query = query.eq('status', filter);
      }
      
      const { data, error: fetchError } = await query.order('created_at', { ascending: false });
      
      if (fetchError) {
        throw fetchError;
      }
      
      setBookings(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch bookings');
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (id: string, newStatus: string) => {
    try {
      const { error: updateError } = await supabase
        .from('bookings')
        .update({ 
          status: newStatus,
          confirmed_at: newStatus === 'confirmed' ? new Date().toISOString() : null
        })
        .eq('id', id);
      
      if (updateError) throw updateError;
      
      // Update local state
      setBookings(bookings.map(b => 
        b.id === id ? { ...b, status: newStatus } : b
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update booking');
    }
  };

  const filteredBookings = bookings.filter(b =>
    b.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    completed: 'bg-blue-100 text-blue-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="heading-h1 text-primary mb-2">Bookings</h1>
          <p className="body-text">Manage and track all customer bookings</p>
        </div>

        {/* Back Link */}
        <Link href="/admin" className="text-primary hover:opacity-80 mb-6 inline-block">
          ← Back to Admin
        </Link>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700 text-small">{error}</p>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-small font-medium text-gray-700 mb-2">
                Filter by Status
              </label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block text-small font-medium text-gray-700 mb-2">
                Search by Name or Email
              </label>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Bookings Grid - Card Based */}
        <div>
          {loading ? (
            <div className="text-center py-12 text-gray-500">
              Loading bookings...
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No bookings found
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBookings.map((booking) => (
                <div key={booking.id} className="bg-white rounded-lg border border-gray-300 p-6 hover:shadow-lg transition">
                  {/* Header with Status */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="heading-h3 text-gray-900 mb-1">
                        {booking.customer_name}
                      </h3>
                      <p className="text-small text-gray-500">
                        {formatDate(booking.created_at)}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ml-2 ${statusColors[booking.status] || 'bg-gray-100 text-gray-800'}`}>
                      {booking.status}
                    </span>
                  </div>

                  {/* Contact Details */}
                  <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Email</p>
                      <p className="text-small text-gray-900 break-all">{booking.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Phone</p>
                      <p className="text-small text-gray-900">{booking.telephone}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Address</p>
                      <p className="text-small text-gray-900">{booking.address}</p>
                    </div>
                  </div>

                  {/* Status Selector */}
                  <div>
                    <label className="block text-xs text-gray-600 uppercase tracking-wide mb-2">
                      Update Status
                    </label>
                    <select
                      value={booking.status}
                      onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stats */}
        {!loading && bookings.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-sm text-gray-600 mb-1">Total Bookings</p>
              <p className="text-2xl font-bold text-primary">{bookings.length}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-sm text-gray-600 mb-1">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {bookings.filter(b => b.status === 'pending').length}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-sm text-gray-600 mb-1">Confirmed</p>
              <p className="text-2xl font-bold text-green-600">
                {bookings.filter(b => b.status === 'confirmed').length}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-sm text-gray-600 mb-1">Completed</p>
              <p className="text-2xl font-bold text-blue-600">
                {bookings.filter(b => b.status === 'completed').length}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
