'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { searchEstimates, updateEstimateStatus, deleteEstimate } from '@/app/utils/estimateService';
import { AdminNavigation } from '@/app/admin/components/Founders';
import EstimateCard from '@/app/admin/components/EstimateCard';

const STATUS_OPTIONS = [
  { value: 'new', label: 'New' },
  { value: 'reviewed', label: 'Reviewed' },
  { value: 'quoted', label: 'Quoted' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

interface Estimate {
  id: string;
  customer_name: string;
  email: string;
  telephone: string;
  address: string;
  property_type: string;
  service_type: string;
  frequency: string;
  first_clean_price: number;
  maintenance_price: number;
  created_at: string;
  status?: 'new' | 'reviewed' | 'quoted' | 'accepted' | 'scheduled' | 'completed' | 'cancelled';
  notes?: any;
  form_data?: Record<string, any>;
}

export default function AdminPage() {
  const [estimates, setEstimates] = useState<Estimate[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('new');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusCounts, setStatusCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    fetchEstimates();
    fetchStatusCounts();
  }, [filter]);

  const fetchStatusCounts = async () => {
    try {
      const counts: Record<string, number> = {};
      for (const status of STATUS_OPTIONS) {
        const result = await searchEstimates('', { status: status.value });
        counts[status.value] = result.success ? result.count : 0;
      }
      setStatusCounts(counts);
    } catch (err) {
      console.error('Error fetching status counts:', err);
    }
  };

  const fetchEstimates = async () => {
    try {
      setLoading(true);
      const result = await searchEstimates('', {
        status: filter === 'all' ? undefined : filter,
      });
      if (result.success) {
        setEstimates(result.data as Estimate[]);
      }
    } catch (err) {
      console.error('Error fetching estimates:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const result = await updateEstimateStatus(
        id,
        newStatus as 'new' | 'reviewed' | 'quoted' | 'accepted' | 'scheduled' | 'completed' | 'cancelled'
      );
      if (result.success) {
        // Update the estimates list immediately
        const updatedEstimates = estimates.map((e) =>
          e.id === id ? { ...e, status: newStatus as any } : e
        );

        // Filter if needed
        let finalEstimates = updatedEstimates;
        if (filter !== 'all' && filter !== newStatus) {
          finalEstimates = updatedEstimates.filter((e) => e.status === filter);
        }

        setEstimates(finalEstimates);

        // Update status counts
        const oldEstimate = estimates.find((e) => e.id === id);
        if (oldEstimate?.status) {
          setStatusCounts((prev) => ({
            ...prev,
            [oldEstimate.status as string]: Math.max(0, (prev[oldEstimate.status as string] || 0) - 1),
            [newStatus as string]: (prev[newStatus as string] || 0) + 1,
          }));
        }
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const result = await deleteEstimate(id);
      if (result.success) {
        const deletedEstimate = estimates.find((e) => e.id === id);
        setEstimates(estimates.filter((e) => e.id !== id));
        
        // Update status counts
        if (deletedEstimate?.status) {
          setStatusCounts((prev) => ({
            ...prev,
            [deletedEstimate.status as string]: Math.max(0, (prev[deletedEstimate.status as string] || 0) - 1),
          }));
        }
      }
    } catch (err) {
      console.error('Error deleting estimate:', err);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const filteredEstimates = estimates.filter(
    (e) =>
      e.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="p-3 sm:p-6 border-b border-gray-300">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-poppins font-thin mb-1 sm:mb-2 text-primary">
                Incoming Estimates
              </h1>
              <p className="text-xs sm:text-sm text-gray-600">Manage and review all customer estimates</p>
            </div>
          </div>
        </div>
      </div>

      {/* Status Filter Bar */}
      <div className="sticky top-0 bg-white border-b border-gray-200 py-3 sm:py-4 px-3 sm:px-6 z-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2 overflow-x-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md text-sm whitespace-nowrap font-medium transition ${
                filter === 'all'
                  ? 'text-white bg-primary'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              All
            </button>
            {STATUS_OPTIONS.map((status) => (
              <button
                key={status.value}
                onClick={() => setFilter(status.value)}
                className={`px-4 py-2 rounded-md text-sm whitespace-nowrap font-medium transition ${
                  filter === status.value
                    ? 'text-white bg-primary'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
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

          {/* Estimates Cards */}
          {loading ? (
            <div className="text-center py-12 text-gray-500">
              Loading estimates...
            </div>
          ) : filteredEstimates.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No estimates found
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredEstimates.map((estimate) => (
                <EstimateCard
                  key={estimate.id}
                  estimate={estimate}
                  statusOptions={STATUS_OPTIONS}
                  onStatusChange={handleStatusChange}
                  onDelete={handleDelete}
                  formatDate={formatDate}
                />
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
