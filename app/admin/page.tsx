'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { getEstimates, searchEstimates, deleteEstimate, updateEstimateStatus } from '@/app/utils/estimateService';
import { NotesModal } from '@/app/components/admin/NotesModal';
import { StatusSelector } from '@/app/components/admin/job-status/StatusSelector';
import { StatusFilter } from '@/app/components/admin/job-status/StatusFilter';
import { AdminNavigation } from '@/app/components/admin/nav-admin';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [frequencyFilter, setFrequencyFilter] = useState('');
  const [propertyTypeFilter, setPropertyTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('new');
  const [selectedEstimate, setSelectedEstimate] = useState<Estimate | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [statusCounts, setStatusCounts] = useState<Record<string, number>>({});
  const itemsPerPage = 10;

  useEffect(() => {
    fetchEstimates();
    fetchStatusCounts();
  }, [page]);

  const fetchStatusCounts = async () => {
    const counts: Record<string, number> = {};
    for (const status of STATUS_OPTIONS) {
      const result = await searchEstimates('', {
        status: status.value,
      });
      counts[status.value] = result.success ? result.count : 0;
    }
    setStatusCounts(counts);
  };

  const fetchEstimates = async () => {
    setLoading(true);
    // Fetch with "new" status filter by default
    const result = await searchEstimates('', {
      status: 'new',
    });
    if (result.success) {
      setEstimates(result.data as Estimate[]);
      setTotalCount(result.count);
    }
    setLoading(false);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPage(1);
    
    const result = await searchEstimates(searchTerm, {
      frequency: frequencyFilter || undefined,
      property_type: propertyTypeFilter || undefined,
      status: statusFilter || undefined,
    });
    
    if (result.success) {
      setEstimates(result.data as Estimate[]);
      setTotalCount(result.count);
    }
    setLoading(false);
  };

  const handleReset = () => {
    setSearchTerm('');
    setFrequencyFilter('');
    setPropertyTypeFilter('');
    setStatusFilter('');
    setPage(1);
    fetchEstimates();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this estimate?')) {
      const result = await deleteEstimate(id);
      if (result.success) {
        setEstimates(estimates.filter(e => e.id !== id));
        if (showModal) setShowModal(false);
        alert('Estimate deleted successfully');
      } else {
        alert('Error deleting estimate: ' + result.error);
      }
    }
  };

  const handleStatusToggle = async (id: string, newStatus?: string) => {
    // If a specific status is provided (from dropdown), use it directly
    // Otherwise, cycle to the next status
    let statusToSet: string = newStatus || '';
    const estimate = estimates.find(e => e.id === id);
    const oldStatus = estimate?.status || 'new';
    
    if (!newStatus) {
      const statusValues = STATUS_OPTIONS.map(opt => opt.value);
      const currentIndex = statusValues.indexOf(oldStatus);
      const nextIndex = (currentIndex + 1) % statusValues.length;
      statusToSet = statusValues[nextIndex];
    }
    
    const result = await updateEstimateStatus(id, statusToSet as 'new' | 'reviewed' | 'quoted' | 'accepted' | 'scheduled' | 'completed' | 'cancelled');
    if (result.success) {
      // Update the estimates list immediately
      const updatedEstimates = estimates.map(e => 
        e.id === id ? { ...e, status: statusToSet as any } : e
      );
      
      // If a status filter is active and the estimate no longer matches, filter it out
      let finalEstimates = updatedEstimates;
      if (statusFilter && statusFilter !== statusToSet) {
        finalEstimates = updatedEstimates.filter(e => e.status === statusFilter);
      }
      
      setEstimates(finalEstimates);
      
      // Update the status counts immediately
      setStatusCounts(prev => ({
        ...prev,
        [oldStatus]: Math.max(0, (prev[oldStatus] || 0) - 1),
        [statusToSet]: (prev[statusToSet] || 0) + 1
      }));
    }
  };

  const handleOpenNotes = (estimate: Estimate) => {
    setSelectedEstimate(estimate);
    setShowNotesModal(true);
  };

  const handleNotesUpdate = (updatedNotes: any) => {
    if (selectedEstimate) {
      const updatedEstimate = { ...selectedEstimate, notes: updatedNotes };
      setSelectedEstimate(updatedEstimate);
      setEstimates(estimates.map(e =>
        e.id === selectedEstimate.id ? updatedEstimate : e
      ));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-UK', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="p-3 sm:p-6 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold font-heading mb-1 sm:mb-2" style={{color: '#4B5368'}}>
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
          <StatusFilter
            value={statusFilter}
            onChange={(newStatus) => {
              setStatusFilter(newStatus);
              setPage(1);
              // Auto-filter to this status
              searchEstimates('', {
                status: newStatus || undefined,
              }).then(result => {
                if (result.success) {
                  setEstimates(result.data as Estimate[]);
                  setTotalCount(result.count);
                }
              });
            }}
            options={STATUS_OPTIONS}
            includeAllOption={true}
            counts={statusCounts}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="p-3 sm:p-6">
        <div className="max-w-7xl mx-auto">
        {/* Estimates Cards */}
        {loading ? (
          <div className="p-6 text-center text-gray-600">Loading...</div>
        ) : estimates.length === 0 ? (
          <div className="p-6 text-center text-gray-600">No estimates found</div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 mb-6">
              {estimates.map((estimate) => (
                <div key={estimate.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
                  {/* Card Header */}
                  <div className="px-3 sm:px-4 py-3 border-b border-gray-200">
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-semibold truncate" style={{color: '#4B5368'}}>
                          {estimate.customer_name}
                        </h3>
                      </div>
                      <select
                        value={estimate.status || 'new'}
                        onChange={(e) => handleStatusToggle(estimate.id, e.target.value as any)}
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
                      <p className="text-xs text-gray-600">{formatDate(estimate.created_at)}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleOpenNotes(estimate)}
                          className="text-white w-8 h-8 sm:w-9 sm:h-9 rounded-full transition flex items-center justify-center hover:opacity-80"
                          style={{backgroundColor: '#4B5368'}}
                          title="View and edit notes"
                        >
                          <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                          </svg>
                        </button>
                        <a
                          href={`mailto:${estimate.email}`}
                          className="text-white w-8 h-8 sm:w-9 sm:h-9 rounded-full transition flex items-center justify-center hover:opacity-80"
                          style={{backgroundColor: '#4B5368'}}
                          title={estimate.email}
                        >
                          <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                          </svg>
                        </a>
                        <a
                          href={`tel:${estimate.telephone}`}
                          className="text-white w-8 h-8 sm:w-9 sm:h-9 rounded-full transition flex items-center justify-center hover:opacity-80"
                          style={{backgroundColor: '#4B5368'}}
                          title={estimate.telephone}
                        >
                          <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                          </svg>
                        </a>
                        <button
                          onClick={() => handleDelete(estimate.id)}
                          className="text-white w-8 h-8 sm:w-9 sm:h-9 rounded-full transition flex items-center justify-center hover:opacity-80"
                          style={{backgroundColor: '#4B5368'}}
                          title="Delete estimate"
                        >
                          <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-3 sm:p-4 space-y-3">
                    {/* Address */}
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase">Address</p>
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(estimate.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm text-blue-500 hover:text-blue-600 underline break-words"
                      >
                        {estimate.address}
                      </a>
                    </div>

                    {/* Room Details Summary */}
                    {estimate.form_data && (
                      <div className="border-t border-gray-200 pt-3 mt-3">
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Property Details</p>
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          <span className="bg-gray-200 rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-xs text-gray-700">
                            {estimate.service_type === 'deep' ? 'Deep Cleaning' : estimate.service_type === 'spring' ? 'Spring Cleaning' : estimate.service_type}
                          </span>
                          <span className="bg-gray-200 rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-xs text-gray-700 capitalize">{estimate.property_type}</span>
                          <span className="bg-gray-200 rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-xs text-gray-700 capitalize">{estimate.frequency}</span>
                          {estimate.form_data.bedrooms > 0 && (
                            <span className="bg-gray-200 rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-xs text-gray-700">{estimate.form_data.bedrooms} bed{estimate.form_data.bedrooms !== 1 ? 's' : ''}</span>
                          )}
                          {estimate.form_data.bathrooms > 0 && (
                            <span className="bg-gray-200 rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-xs text-gray-700">{estimate.form_data.bathrooms} bath{estimate.form_data.bathrooms !== 1 ? 's' : ''}</span>
                          )}
                          {estimate.form_data.ensuite > 0 && (
                            <span className="bg-gray-200 rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-xs text-gray-700">{estimate.form_data.ensuite} en suite{estimate.form_data.ensuite !== 1 ? 's' : ''}</span>
                          )}
                          {estimate.form_data.kitchen > 0 && (
                            <span className="bg-gray-200 rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-xs text-gray-700">{estimate.form_data.kitchen} kitchen{estimate.form_data.kitchen !== 1 ? 's' : ''}</span>
                          )}
                          {estimate.form_data.pet_friendly === 'yes' && (
                            <span className="bg-gray-200 rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-xs text-gray-700">🐾 Pets</span>
                          )}
                          {estimate.form_data.cleaning_products && (
                            <span className="bg-gray-200 rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-xs text-gray-700">{estimate.form_data.cleaning_products === 'supply' ? 'Supply' : 'Customer'} products</span>
                          )}
                          {estimate.form_data.extras?.oven > 0 && (
                            <span className="bg-gray-200 rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-xs text-gray-700">Oven Cleaning</span>
                          )}
                          {estimate.form_data.extras?.fridge > 0 && (
                            <span className="bg-gray-200 rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-xs text-gray-700">Fridge Cleaning</span>
                          )}
                          {estimate.form_data.windows?.windows > 0 && (
                            <span className="bg-gray-200 rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-xs text-gray-700">{estimate.form_data.windows.windows} Window{estimate.form_data.windows.windows !== 1 ? 's' : ''}</span>
                          )}
                          {estimate.form_data.windows?.doors > 0 && (
                            <span className="bg-gray-200 rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-xs text-gray-700">{estimate.form_data.windows.doors} Door{estimate.form_data.windows.doors !== 1 ? 's' : ''}</span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Notes Section */}
                    {estimate.notes && (
                      (() => {
                        let notesList = [];
                        if (Array.isArray(estimate.notes)) {
                          notesList = estimate.notes;
                        } else if (typeof estimate.notes === 'string' && estimate.notes.trim().startsWith('[')) {
                          try {
                            let parsed = estimate.notes;
                            let depth = 0;
                            while (typeof parsed === 'string' && parsed.trim().startsWith('[') && depth < 3) {
                              try {
                                parsed = JSON.parse(parsed);
                                depth++;
                              } catch (e) {
                                break;
                              }
                            }
                            if (Array.isArray(parsed)) {
                              notesList = parsed;
                            }
                          } catch (e) {
                            // silently fail
                          }
                        } else if (typeof estimate.notes === 'string' && estimate.notes.trim()) {
                          notesList = [{ text: estimate.notes }];
                        }
                        
                        const lastNote = notesList.length > 0 ? notesList[notesList.length - 1] : null;
                        
                        return notesList.length > 0 ? (
                          <button
                            onClick={() => handleOpenNotes(estimate)}
                            className="w-full border-t border-b border-gray-200 pt-3 mt-4 mb-4 text-left hover:bg-gray-50 p-3 rounded-lg transition -m-4 px-4 py-3"
                          >
                            <p className="text-sm font-semibold text-gray-500 uppercase mb-2">
                              Latest Note ({notesList.length} total)
                            </p>
                            {lastNote && (
                              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 hover:border-blue-300 transition">
                                <p className="text-sm text-gray-700 line-clamp-3">{lastNote.text}</p>
                              </div>
                            )}
                            {notesList.length > 1 && (
                              <p className="text-sm text-gray-500 mt-1">+{notesList.length - 1} more note{notesList.length - 1 !== 1 ? 's' : ''}</p>
                            )}
                          </button>
                        ) : null;
                      })()
                    )}

                    {/* Pricing */}
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-gray-600">First Clean:</span>
                        <span className="font-bold" style={{color: '#4B5368'}}>£{estimate.first_clean_price.toFixed(2)}</span>
                      </div>
                      {estimate.frequency !== 'one-off' && (
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs font-semibold text-gray-600">Maintenance:</span>
                          <span className="font-bold" style={{color: '#4B5368'}}>£{estimate.maintenance_price.toFixed(2)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer - Actions */}
                  {/* Delete button moved to header */}
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-white rounded-lg shadow-md px-3 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                <div className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
                  Showing {(page - 1) * itemsPerPage + 1} to {Math.min(page * itemsPerPage, totalCount)} of {totalCount}
                </div>
                <div className="flex gap-1 sm:gap-2 flex-wrap justify-center">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 rounded disabled:opacity-50 transition"
                  >
                    Previous
                  </button>
                  <span className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm text-gray-600 bg-gray-100 rounded">Page {page} of {totalPages}</span>
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 rounded disabled:opacity-50 transition"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
        </div>
      </div>

      {/* Details Modal */}
      {showModal && selectedEstimate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 text-white px-6 py-4 flex justify-between items-center" style={{backgroundColor: '#4B5368'}}>
              <h2 className="text-2xl font-bold font-heading">Estimate Details</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-white hover:opacity-80 rounded-full w-10 h-10 flex items-center justify-center transition"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2" style={{color: '#4B5368'}}>
                  <div className="w-1 h-6 rounded" style={{backgroundColor: '#4B5368'}}></div>
                  Customer Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-semibold" style={{color: '#4B5368'}}>{selectedEstimate.customer_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold" style={{color: '#4B5368'}}>{selectedEstimate.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-semibold" style={{color: '#4B5368'}}>{selectedEstimate.telephone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="font-semibold" style={{color: '#4B5368'}}>{selectedEstimate.address}</p>
                  </div>
                </div>
              </div>

              {/* Service Details */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2" style={{color: '#4B5368'}}>
                  <div className="w-1 h-6 rounded" style={{backgroundColor: '#4B5368'}}></div>
                  Service Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Property Type</p>
                    <p className="font-semibold" style={{color: '#4B5368'}}>{selectedEstimate.property_type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Service Type</p>
                    <p className="font-semibold" style={{color: '#4B5368'}}>{selectedEstimate.service_type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Frequency</p>
                    <p className="font-semibold" style={{color: '#4B5368'}}>{selectedEstimate.frequency}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Created</p>
                    <p className="font-semibold" style={{color: '#4B5368'}}>{formatDate(selectedEstimate.created_at)}</p>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2" style={{color: '#4B5368'}}>
                  <div className="w-1 h-6 rounded" style={{backgroundColor: '#4B5368'}}></div>
                  Pricing
                </h3>
                <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span style={{color: '#4B5368'}}>First Clean Price:</span>
                    <span className="font-semibold" style={{color: '#4B5368'}}>£{selectedEstimate.first_clean_price.toFixed(2)}</span>
                  </div>
                  {selectedEstimate.frequency !== 'one-off' && (
                    <div className="flex justify-between">
                      <span style={{color: '#4B5368'}}>Maintenance Price:</span>
                      <span className="font-semibold" style={{color: '#4B5368'}}>£{selectedEstimate.maintenance_price.toFixed(2)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium rounded-lg transition"
                >
                  Close
                </button>
                <button
                  onClick={() => handleDelete(selectedEstimate.id)}
                  className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition"
                >
                  Delete Estimate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filter Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full">
            <div className="sticky top-0 text-white px-6 py-4 flex justify-between items-center" style={{backgroundColor: '#4B5368'}}>
              <h2 className="text-xl font-bold font-heading">Search & Filter</h2>
              <button
                onClick={() => setShowSearchModal(false)}
                className="text-white hover:opacity-80 rounded-full w-10 h-10 flex items-center justify-center transition"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <form onSubmit={(e) => {
                handleSearch(e);
                setShowSearchModal(false);
              }} className="space-y-4">
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                  <input
                    type="text"
                    placeholder="Name, email, phone, address..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none" style={{borderColor: '#4B5368'}}
                    onFocus={(e) => e.target.style.borderColor = '#4B5368'}
                  />
                </div>

                {/* Frequency Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
                  <select
                    value={frequencyFilter}
                    onChange={(e) => setFrequencyFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
                    style={{borderColor: '#4B5368'}}
                  >
                    <option value="">All</option>
                    <option value="one-off">One-off</option>
                    <option value="weekly">Weekly</option>
                    <option value="fortnightly">Fortnightly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                {/* Property Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                  <select
                    value={propertyTypeFilter}
                    onChange={(e) => setPropertyTypeFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
                    style={{borderColor: '#4B5368'}}
                  >
                    <option value="">All</option>
                    <option value="Flat">Flat</option>
                    <option value="House">House</option>
                    <option value="Bungalow">Bungalow</option>
                  </select>
                </div>

                {/* Status Filter */}
                <StatusSelector
                  value={statusFilter}
                  onChange={setStatusFilter}
                  options={STATUS_OPTIONS}
                  label="Status"
                />

                {/* Buttons */}
                <div className="flex gap-2 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 text-white font-medium rounded-lg transition hover:opacity-90" style={{backgroundColor: '#4B5368'}}
                  >
                    Search
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handleReset();
                      setShowSearchModal(false);
                    }}
                    className="flex-1 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium rounded-lg transition"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Notes Modal */}
      <NotesModal
        isOpen={showNotesModal}
        estimateId={selectedEstimate?.id || ''}
        customerName={selectedEstimate?.customer_name || ''}
        notes={selectedEstimate?.notes}
        onClose={() => setShowNotesModal(false)}
        onNotesUpdate={handleNotesUpdate}
      />

      {/* Admin Navigation */}
      <AdminNavigation />
    </div>
  );
}
