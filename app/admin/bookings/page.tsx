'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/app/utils/supabase';
import Link from 'next/link';
import { AdminNavigation } from '@/app/admin/components/Founders';

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
  rooms?: number;
  service_type?: string;
  frequency?: string;
  estimated_price?: number;
  estimate_data?: {
    rooms?: number;
    serviceType?: string;
    frequency?: string;
    estimatedPrice?: number;
  };
}

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

export default function BookingsAdmin() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('pending');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [statusCounts, setStatusCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    fetchBookings();
    fetchStatusCounts();
  }, [filter]);

  const fetchStatusCounts = async () => {
    try {
      const counts: Record<string, number> = {};
      for (const status of STATUS_OPTIONS) {
        const { count } = await supabase
          .from('bookings')
          .select('*', { count: 'exact', head: true })
          .eq('status', status.value);
        counts[status.value] = count || 0;
      }
      setStatusCounts(counts);
    } catch (err) {
      console.error('Error fetching status counts:', err);
    }
  };

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError('');
      
      let query = supabase.from('bookings').select('*');
      
      if (filter && filter !== 'all') {
        query = query.eq('status', filter);
      }
      
      const { data, error: fetchError } = await query.order('created_at', { ascending: false });
      
      if (fetchError) {
        throw fetchError;
      }
      
      // Map the booking data, extracting estimate details from booking record
      const bookingsWithEstimates = (data || []).map((booking) => ({
        ...booking,
        estimate_data: {
          rooms: booking.rooms || 0,
          serviceType: booking.service_type || 'N/A',
          frequency: booking.frequency || 'N/A',
          estimatedPrice: booking.estimated_price || 0,
        },
      }));
      
      setBookings(bookingsWithEstimates);
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

      // Update status counts
      const oldBooking = bookings.find(b => b.id === id);
      if (oldBooking) {
        setStatusCounts(prev => ({
          ...prev,
          [oldBooking.status]: Math.max(0, (prev[oldBooking.status] || 0) - 1),
          [newStatus]: (prev[newStatus] || 0) + 1
        }));
      }
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
      year: 'numeric'
    });
  };

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    completed: 'bg-blue-100 text-blue-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="p-3 sm:p-6 border-b border-gray-300">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-poppins font-thin mb-1 sm:mb-2" style={{color: '#4B5368'}}>
                Bookings
              </h1>
              <p className="text-xs sm:text-sm text-gray-600">Manage and track all customer bookings</p>
            </div>
          </div>
        </div>
      </div>

      {/* Status Filter Bar */}
      <div className="sticky top-0 bg-white border-b border-gray-200 py-3 sm:py-4 px-3 sm:px-6 z-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2 overflow-x-auto">
            <button
              onClick={() => {
                setFilter('all');
                setLoading(true);
              }}
              className={`px-4 py-2 rounded-md text-sm whitespace-nowrap font-medium transition ${
                filter === 'all'
                  ? 'text-white'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
              style={filter === 'all' ? { backgroundColor: '#4B5368' } : {}}
            >
              All
            </button>
            {STATUS_OPTIONS.map((status) => (
              <button
                key={status.value}
                onClick={() => setFilter(status.value)}
                className={`px-4 py-2 rounded-md text-sm whitespace-nowrap font-medium transition ${
                  filter === status.value
                    ? 'text-white'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
                style={filter === status.value ? { backgroundColor: '#4B5368' } : {}}
              >
                {status.label} ({statusCounts[status.value] || 0})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-3 sm:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Search */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-sm"
            />
          </div>

          {/* Bookings Cards */}
          {loading ? (
            <div className="text-center py-12 text-gray-500">
              Loading bookings...
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No bookings found
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredBookings.map((booking) => (
                <div key={booking.id} className="bg-white rounded-lg border border-gray-300 hover:shadow-lg transition overflow-hidden">
                  {/* Card Header */}
                  <div className="px-3 sm:px-4 py-3 border-b border-gray-200">
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-semibold truncate" style={{color: '#4B5368'}}>
                          {booking.customer_name}
                        </h3>
                      </div>
                      <select
                        value={booking.status}
                        onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                        className="text-xs px-3 py-1.5 rounded-md border border-gray-300 focus:outline-none flex-shrink-0"
                        style={{ borderColor: '#4B5368' }}
                      >
                        {STATUS_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-gray-600">{formatDate(booking.created_at)}</p>
                      <div className="flex gap-2">
                        <a
                          href={`mailto:${booking.email}`}
                          className="text-white w-8 h-8 sm:w-9 sm:h-9 rounded-full transition flex items-center justify-center hover:opacity-80"
                          style={{backgroundColor: '#4B5368'}}
                          title={booking.email}
                        >
                          <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                          </svg>
                        </a>
                        <a
                          href={`tel:${booking.telephone}`}
                          className="text-white w-8 h-8 sm:w-9 sm:h-9 rounded-full transition flex items-center justify-center hover:opacity-80"
                          style={{backgroundColor: '#4B5368'}}
                          title={booking.telephone}
                        >
                          <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-3 sm:p-4 space-y-3">
                    {/* Email */}
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase">Email</p>
                      <p className="text-xs sm:text-sm text-gray-700 break-all">{booking.email}</p>
                    </div>

                    {/* Phone */}
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase">Phone</p>
                      <p className="text-xs sm:text-sm text-gray-700">{booking.telephone}</p>
                    </div>

                    {/* Address */}
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase">Address</p>
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(booking.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm text-blue-500 hover:text-blue-600 underline break-words"
                      >
                        {booking.address}
                      </a>
                    </div>

                    {/* Job Details */}
                    {booking.estimate_data && (
                      <div className="pt-3 border-t border-gray-200 space-y-2">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase">Rooms</p>
                            <p className="text-xs sm:text-sm text-gray-700">{booking.estimate_data.rooms || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase">Service Type</p>
                            <p className="text-xs sm:text-sm text-gray-700">{booking.estimate_data.serviceType || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase">Frequency</p>
                            <p className="text-xs sm:text-sm text-gray-700">{booking.estimate_data.frequency || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase">Quote Price</p>
                            <p className="text-xs sm:text-sm font-semibold" style={{color: '#4B5368'}}>
                              £{booking.estimate_data.estimatedPrice?.toFixed(2) || '0.00'}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Status Badge */}
                    {booking.status && (
                      <div className="pt-2 border-t border-gray-200">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[booking.status] || 'bg-gray-100 text-gray-800'}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Admin Navigation */}
      <AdminNavigation />
    </div>
  );
}
