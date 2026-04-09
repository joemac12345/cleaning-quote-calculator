'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/app/utils/supabase';
import Link from 'next/link';
import { AdminNavigation } from '@/app/admin/components/Founders';
import BookingCard from './components/BookingCard';
import FilterModal from './components/FilterModal';

interface Booking {
  id: string;
  estimate_id: string;
  customer_name: string;
  email: string;
  telephone: string;
  address: string;
  property_type?: string;
  status: string;
  created_at: string;
  confirmed_at: string | null;
  rooms?: number;
  service_type?: string;
  frequency?: string;
  first_clean_price?: number;
  maintenance_price?: number;
  first_clean_hours?: number;
  first_clean_minutes?: number;
  maintenance_hours?: number;
  maintenance_minutes?: number;
  form_data?: Record<string, any>;
  estimate_data?: {
    rooms?: number;
    serviceType?: string;
    frequency?: string;
    firstCleanPrice?: number;
    maintenancePrice?: number;
    firstCleanHours?: number;
    firstCleanMinutes?: number;
    maintenanceHours?: number;
    maintenanceMinutes?: number;
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
  const [showFilterModal, setShowFilterModal] = useState(false);

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
          firstCleanPrice: booking.first_clean_price || 0,
          maintenancePrice: booking.maintenance_price || 0,
          firstCleanHours: booking.first_clean_hours || 0,
          firstCleanMinutes: booking.first_clean_minutes || 0,
          maintenanceHours: booking.maintenance_hours || 0,
          maintenanceMinutes: booking.maintenance_minutes || 0,
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

      {/* Filter Bar */}
      <div className="bg-white border-b border-gray-200 py-3 sm:py-4 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-gray-600 font-medium">
              Status: <span style={{ color: '#4B5368' }} className="font-semibold">
                {filter === 'all' ? 'All' : STATUS_OPTIONS.find(s => s.value === filter)?.label || filter}
              </span>
            </p>
            <button
              onClick={() => setShowFilterModal(true)}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white transition hover:opacity-90"
              style={{ backgroundColor: '#4B5368' }}
            >
              Filter Bookings
            </button>
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
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  statusOptions={STATUS_OPTIONS}
                  statusColors={statusColors}
                  onStatusChange={updateBookingStatus}
                  formatDate={formatDate}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Admin Navigation */}
      <AdminNavigation />

      {/* Filter Modal */}
      <FilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        filter={filter}
        onFilterChange={(newFilter) => {
          setFilter(newFilter);
          setShowFilterModal(false);
          setLoading(true);
        }}
        statusOptions={STATUS_OPTIONS}
        statusCounts={statusCounts}
      />
    </div>
  );
}
