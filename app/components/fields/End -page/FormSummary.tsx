'use client';

import React, { useState, useMemo } from 'react';
import { formSteps } from '@/app/config/formConfig';
import { calculateQuote, QuoteStats } from '@/app/utils/quoteCalculation';
import Banner from '@/app/components/Banner';
import FeedbackWidget from '@/app/components/FeedbackWidget';
import WhatsNextButton from '@/app/components/WhatsNextButton';

interface FormSummaryProps {
  formData: Record<string, any>;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (stepId: number) => void;
  isModal?: boolean;
  saveStatus?: 'idle' | 'success' | 'error';
}

export default function FormSummary({
  formData,
  isOpen,
  onClose,
  onEdit,
  isModal = true,
  saveStatus = 'idle',
}: FormSummaryProps) {
  if (!isOpen) return null;

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'Service Details': true,
    'Preferences': true,
    'Contact Information': true,
  });

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);

  // Calculate quote based on form data
  const quoteStats: QuoteStats | null = useMemo(() => {
    try {
      const frequency = formData.frequency || 'one-off';
      return calculateQuote(formData, frequency);
    } catch (error) {
      console.error('Error calculating quote:', error);
      return null;
    }
  }, [formData]);

  const toggleSection = (title: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const getFieldLabel = (stepId: number, fieldId: string): string => {
    const step = formSteps.find((s) => s.id === stepId);
    if (!step) return fieldId;
    const field = step.fields.find((f) => f.id === fieldId);
    const fieldName = field?.name || fieldId;
    
    // Custom display names for summary
    const displayNameMap: Record<string, string> = {
      'floors': 'The Staircase'
    };
    
    const customName = displayNameMap[fieldId] || fieldName;
    
    // Convert snake_case to Title Case
    return customName
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const getDisplayValue = (value: any, fieldId?: string): string => {
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    
    // Custom display mappings for specific fields
    if (fieldId === 'contact_permission') {
      if (value === 'yes') return 'Happy to be contacted';
      if (value === 'no') return 'No contact';
    }

    // Special handling for other_spaces to show only the number
    if (fieldId === 'other_spaces' && typeof value === 'object' && value !== null) {
      const count = Object.values(value)[0];
      return String(count);
    }
    
    if (typeof value === 'object' && value !== null) {
      if (typeof value === 'object' && !Array.isArray(value)) {
        return Object.entries(value)
          .filter(([, v]) => v !== 0 && v !== '')
          .map(([k, v]) => `${k}: ${v}`)
          .join(', ');
      }
      return JSON.stringify(value);
    }
    const str = String(value);
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const getFieldIcon = (fieldId: string): React.ReactElement | null => {
    const iconMap: Record<string, React.ReactElement> = {
      'name': <span className="mr-2">👤</span>,
      'telephone': <span className="mr-2">📞</span>,
      'email': <span className="mr-2">✉️</span>,
      'address': <span className="mr-2">📍</span>,
      'property_type': <span className="mr-2">🏠</span>,
      'service_type': <span className="mr-2">🧹</span>,
      'cleaning_products': <span className="mr-2">🧴</span>,
      'frequency': <span className="mr-2">📅</span>,
      'pet_friendly': <span className="mr-2">🐾</span>,
    };
    
    return iconMap[fieldId] || null;
  };

  const getSummaryGroups = () => {
    return [
      {
        title: 'Service Details',
        fields: ['bedrooms', 'bathrooms', 'ensuite', 'cloakroom', 'floors', 'kitchen', 'utility', 'living_rooms', 'dining_rooms', 'studies', 'other_spaces'],
      },
      {
        title: 'Preferences',
        fields: ['property_type', 'service_type', 'frequency', 'pet_friendly', 'cleaning_products'],
      },
      {
        title: 'Contact Information',
        fields: ['name', 'telephone', 'email', 'address', 'contact_permission'],
      },
    ];
  };

  // Render pricing cards
  const PricingCards = () => (
    <>
      {!quoteStats ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
          <p className="font-semibold">Unable to calculate quote</p>
          <p className="text-xs">Please complete all required fields</p>
        </div>
      ) : (
        <>
          {/* Your First Clean */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6 relative">
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex gap-2">
              <button
                onClick={() => setShowDetailsModal(true)}
                title="View estimate details"
                className="px-3 sm:px-4 py-2 sm:py-2 text-white text-xs sm:text-sm font-medium rounded-lg transition font-heading flex-shrink-0" style={{backgroundColor: '#48546A'}} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#374151'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#48546A'}
              >
                Estimate Details
              </button>
              <button
                onClick={() => setShowPricingModal(true)}
                title="View what comes next"
                className="px-3 sm:px-4 py-2 sm:py-2 text-white text-xs sm:text-sm font-medium rounded-lg transition font-heading flex-shrink-0" style={{backgroundColor: '#48546A'}} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#374151'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#48546A'}
              >
                What Comes Next?
              </button>
            </div>
            <div className="flex flex-col justify-between items-start gap-2 sm:gap-4 mb-3 sm:mb-4">
              <h3 className="text-lg sm:text-2xl font-bold font-heading" style={{color: '#4B5368'}}>Your First Clean</h3>
              <p className="text-3xl sm:text-4xl font-bold flex-shrink-0" style={{color: '#4B5368'}}>£{isFinite(quoteStats.firstCleanPrice) ? quoteStats.firstCleanPrice.toFixed(2) : '0.00'}</p>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-semibold mb-2 sm:mb-3" style={{color: '#4B5368'}}>What's Included</p>
              <p className="text-xs sm:text-sm mb-3 sm:mb-4" style={{color: '#4B5368'}}>A comprehensive clean of all rooms in your property, including dusting, vacuuming, mopping, and bathroom facilities. We'll customize the service to your preferences and complete it within the estimated time.</p>
            </div>
            <div>
              <p className="text-xs sm:text-sm" style={{color: '#4B5368'}}>The time will be dependent on the team size. Larger teams can complete your clean faster, while smaller teams may take longer - quality is kept to the highest priority.</p>
            </div>
            <div className="hidden">
              <p className="text-xs sm:text-sm font-semibold mb-1 sm:mb-2" style={{color: '#4B5368'}}>Estimated Cleaning Time</p>
              <p className="text-lg sm:text-2xl font-bold mb-2 sm:mb-3" style={{color: '#4B5368'}}>{quoteStats.firstCleanHours || 0}h {quoteStats.firstCleanMinutes || 0}m</p>
              <p className="text-xs sm:text-sm" style={{color: '#4B5368'}}>This is our estimated time to complete your cleaning based on your requirements. Actual time may vary slightly.</p>
            </div>
          </div>

          {/* Maintenance Price - only show if not one-off */}
          {(formData.frequency || 'one-off') !== 'one-off' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 sm:p-6">
              <div className="flex flex-col justify-between items-start gap-2 sm:gap-4 mb-3 sm:mb-4">
                <h3 className="text-lg sm:text-2xl font-bold font-heading" style={{color: '#4B5368'}}>Maintenance Price</h3>
                <p className="text-3xl sm:text-4xl font-bold flex-shrink-0" style={{color: '#4B5368'}}>£{isFinite(quoteStats.maintenancePrice) ? quoteStats.maintenancePrice.toFixed(2) : '0.00'}</p>
              </div>
              <div className="mb-3 sm:mb-4">
                <p className="text-xs sm:text-sm font-semibold mb-1" style={{color: '#4B5368'}}>Per clean going forward</p>
                <p className="text-xs sm:text-sm" style={{color: '#4B5368'}}>Regular price for each scheduled cleaning ({formData.frequency || 'one-off'})</p>
              </div>
              <div className="hidden">
                <p className="text-xs sm:text-sm font-semibold mb-2" style={{color: '#4B5368'}}>Estimated Maintenance Time</p>
                <p className="text-base sm:text-lg font-bold" style={{color: '#4B5368'}}>{quoteStats.maintenanceHours || 0}h {quoteStats.maintenanceMinutes || 0}m</p>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );

  return (
    <>
      {isModal ? (
        // Modal View
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-end sm:items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-t-lg sm:rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] sm:max-h-[95vh] overflow-y-auto">
            <div className="p-6 sm:p-8 space-y-4 sm:space-y-6">
              {/* Price Summary Section */}
              <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                <PricingCards />
              </div>

              {/* Feedback Widget */}
              <div className="mb-6 sm:mb-8">
                <FeedbackWidget />
              </div>

              {/* Banner */}
              <div className="mb-6 sm:mb-8">
                <Banner imageSrc="/images/banner.jpg" alt="Promotional Banner" />
              </div>

              {/* Optional Services */}
              {getSummaryGroups().map((group) => {
                if (group.title !== 'Optional Services') return null;

                let groupData: Array<{fieldId: string; value: any; displayName?: string; isExtra?: boolean}> = group.fields
                  .map((fieldId) => ({
                    fieldId,
                    value: formData[fieldId],
                  }))
                  .filter(({ value }) => value !== undefined && value !== '' && value !== null && (typeof value !== 'object' || Object.keys(value).length > 0));

                groupData = groupData.flatMap((item) => {
                  if ((item.fieldId === 'extras' || item.fieldId === 'windows' || item.fieldId === 'doors') && typeof item.value === 'object') {
                    return Object.entries(item.value)
                      .filter(([, v]) => v === 1 || (typeof v === 'number' && v > 0))
                      .map(([key]) => ({
                        fieldId: `${item.fieldId}_${key}`,
                        displayName: key === 'doors' ? 'External Doors' : key.charAt(0).toUpperCase() + key.slice(1),
                        value: item.value[key],
                        isExtra: true,
                      }));
                  }
                  return [item];
                });

                if (groupData.length === 0) return null;

                return (
                  <div key={group.title} className="border-b border-gray-200 pb-4 sm:pb-6 last:border-b-0">
                    <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2 font-heading" style={{color: '#4B5368'}}>
                      <div className="w-1 h-6 rounded" style={{backgroundColor: '#9CA3AF'}}></div>
                      {group.title}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                      {groupData.map(({ fieldId, value, displayName, isExtra }: any) => (
                        <div key={fieldId} className="flex flex-col justify-between bg-gray-50 p-2 rounded-lg hover:bg-gray-100 transition w-full h-full">
                          <p className="text-sm font-medium" style={{color: '#4B5368'}}>
                            {displayName}: <span className="text-sm font-semibold ml-2" style={{color: '#4B5368'}}>
                              {fieldId.startsWith('windows_') || fieldId.startsWith('doors_') ? `${value}` : '✓'}
                            </span>
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* What Happens Next Button */}
              <WhatsNextButton />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-full px-6 sm:px-8 py-3 sm:py-4 text-white font-medium rounded-lg transition font-heading" style={{backgroundColor: '#48546A'}} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#374151'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#48546A'}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Page View
        <div className="h-screen bg-white overflow-hidden flex flex-col" style={{ marginTop: '20px' }}>
          {/* Full-width Banner */}
          <div className="flex-shrink-0">
            <Banner imageSrc="/icons/Untitled design.png" logoSrc="/icons/WW635.jpg" logoAlt="Logo" height="h-96 sm:screen-3/4" additionalHeight="10px" />
          </div>

          <div className="flex-1 pb-6 sm:pb-8 px-6 sm:px-8 max-w-4xl mx-auto space-y-4 sm:space-y-6 overflow-hidden w-full">
            {/* Price Summary Section */}
            <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8 relative z-20">
              <PricingCards />
            </div>

            {/* Feedback Widget */}
            <div className="mb-6 sm:mb-8">
              <FeedbackWidget />
            </div>

            {/* Banner */}
            <div className="mb-6 sm:mb-8">
              <Banner imageSrc="/images/banner.jpg" alt="Promotional Banner" />
            </div>

            {/* Optional Services */}
            {getSummaryGroups().map((group) => {
              if (group.title !== 'Optional Services') return null;

              let groupData: Array<{fieldId: string; value: any; displayName?: string; isExtra?: boolean}> = group.fields
                .map((fieldId) => ({
                  fieldId,
                  value: formData[fieldId],
                }))
                .filter(({ value }) => value !== undefined && value !== '' && value !== null && (typeof value !== 'object' || Object.keys(value).length > 0));

              groupData = groupData.flatMap((item) => {
                if ((item.fieldId === 'extras' || item.fieldId === 'windows' || item.fieldId === 'doors') && typeof item.value === 'object') {
                  return Object.entries(item.value)
                    .filter(([, v]) => v === 1 || (typeof v === 'number' && v > 0))
                    .map(([key]) => ({
                      fieldId: `${item.fieldId}_${key}`,
                      displayName: key === 'doors' ? 'External Doors' : key.charAt(0).toUpperCase() + key.slice(1),
                      value: item.value[key],
                      isExtra: true,
                    }));
                }
                return [item];
              });

              if (groupData.length === 0) return null;

              return (
                <div key={group.title} className="border-b border-gray-200 pb-4 sm:pb-6 last:border-b-0">
                  <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2 font-heading" style={{color: '#4B5368'}}>
                    <div className="w-1 h-6 rounded" style={{backgroundColor: '#9CA3AF'}}></div>
                    {group.title}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                    {groupData.map(({ fieldId, value, displayName, isExtra }: any) => (
                      <div key={fieldId} className="flex flex-col justify-between bg-gray-50 p-2 rounded-lg hover:bg-gray-100 transition w-full h-full">
                        <p className="text-sm font-medium" style={{color: '#4B5368'}}>
                          {displayName}: <span className="text-sm font-semibold ml-2" style={{color: '#4B5368'}}>
                            {fieldId.startsWith('windows_') || fieldId.startsWith('doors_') ? `${value}` : '✓'}
                          </span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

          </div>

          {/* Details Modal */}
          {showDetailsModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-[10000] flex items-end sm:items-center justify-center p-3 sm:p-4">
              <div className="bg-white rounded-t-lg sm:rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] sm:max-h-[95vh] overflow-y-auto">
                <div className="sticky top-0 text-white px-6 sm:px-8 py-5 sm:py-6 flex justify-between items-center" style={{backgroundColor: '#48546A'}}>
                  <h2 className="text-lg sm:text-2xl font-bold font-heading">Estimate Details</h2>
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="text-white rounded-full w-10 h-10 flex items-center justify-center transition" style={{backgroundColor: '#48546A'}} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#374151'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#48546A'}
                  >
                    ✕
                  </button>
                </div>
                <div className="p-6 sm:p-8 space-y-4 sm:space-y-6">
                  {/* Contact Information */}
                  <div className="border-b border-gray-200 pb-4 sm:pb-6">
                    <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2 font-heading" style={{color: '#4B5368'}}>
                      <span className="text-xl">👤</span>
                      Contact Information
                    </h3>
                    <div className="space-y-2">
                      <p style={{color: '#4B5368'}}>Name: <span className="font-semibold">{formData.name || '-'}</span></p>
                      <p style={{color: '#4B5368'}}>Phone: <span className="font-semibold">{formData.telephone || '-'}</span></p>
                      <p style={{color: '#4B5368'}}>Email: <span className="font-semibold">{formData.email || '-'}</span></p>
                      <p style={{color: '#4B5368'}}>Address: <span className="font-semibold">{typeof formData.address === 'object' ? `${formData.address?.street}, ${formData.address?.city}` : formData.address || '-'}</span></p>
                    </div>
                  </div>

                  {/* Preferences */}
                  <div className="border-b border-gray-200 pb-4 sm:pb-6">
                    <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2 font-heading" style={{color: '#4B5368'}}>
                      <span className="text-xl">⚙️</span>
                      Preferences
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div><p style={{color: '#4B5368'}}>Type: <span className="font-semibold">{formData.property_type || '-'}</span></p></div>
                      <div><p style={{color: '#4B5368'}}>Service: <span className="font-semibold">{formData.service_type || '-'}</span></p></div>
                      <div><p style={{color: '#4B5368'}}>Frequency: <span className="font-semibold">{formData.frequency || '-'}</span></p></div>
                      <div><p style={{color: '#4B5368'}}>Pet Friendly: <span className="font-semibold">{formData.pet_friendly ? 'Yes' : 'No'}</span></p></div>
                    </div>
                  </div>

                  {/* Service Details */}
                  <div className="border-b border-gray-200 pb-4 sm:pb-6">
                    <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2 font-heading" style={{color: '#4B5368'}}>
                      <span className="text-xl">🏠</span>
                      Service Details
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b-2 border-gray-300 bg-gray-50">
                            <th className="text-left p-2 font-semibold" style={{color: '#4B5368'}}>Room/Area</th>
                            <th className="text-right p-2 font-semibold" style={{color: '#4B5368'}}>Count</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-200">
                            <td className="p-2" style={{color: '#4B5368'}}>Bedrooms</td>
                            <td className="text-right p-2 font-semibold" style={{color: '#4B5368'}}>{formData.bedrooms || 0}</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="p-2" style={{color: '#4B5368'}}>Bathrooms</td>
                            <td className="text-right p-2 font-semibold" style={{color: '#4B5368'}}>{formData.bathrooms || 0}</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="p-2" style={{color: '#4B5368'}}>En-suite</td>
                            <td className="text-right p-2 font-semibold" style={{color: '#4B5368'}}>{formData.ensuite || 0}</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="p-2" style={{color: '#4B5368'}}>Cloakroom</td>
                            <td className="text-right p-2 font-semibold" style={{color: '#4B5368'}}>{formData.cloakroom || 0}</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="p-2" style={{color: '#4B5368'}}>Staircase</td>
                            <td className="text-right p-2 font-semibold" style={{color: '#4B5368'}}>{formData.floors || 0}</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="p-2" style={{color: '#4B5368'}}>Kitchen</td>
                            <td className="text-right p-2 font-semibold" style={{color: '#4B5368'}}>{formData.kitchen || 0}</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="p-2" style={{color: '#4B5368'}}>Utility</td>
                            <td className="text-right p-2 font-semibold" style={{color: '#4B5368'}}>{formData.utility || 0}</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="p-2" style={{color: '#4B5368'}}>Living Rooms</td>
                            <td className="text-right p-2 font-semibold" style={{color: '#4B5368'}}>{formData.living_rooms || 0}</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="p-2" style={{color: '#4B5368'}}>Dining Rooms</td>
                            <td className="text-right p-2 font-semibold" style={{color: '#4B5368'}}>{formData.dining_rooms || 0}</td>
                          </tr>
                          <tr>
                            <td className="p-2" style={{color: '#4B5368'}}>Studies</td>
                            <td className="text-right p-2 font-semibold" style={{color: '#4B5368'}}>{formData.studies || 0}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Add-ons & Extras */}
                  <div className="border-b border-gray-200 pb-4 sm:pb-6">
                    <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2 font-heading" style={{color: '#4B5368'}}>
                      <span className="text-xl">✨</span>
                      Add-ons & Extras
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b-2 border-gray-300 bg-gray-50">
                            <th className="text-left p-2 font-semibold" style={{color: '#4B5368'}}>Service</th>
                            <th className="text-right p-2 font-semibold" style={{color: '#4B5368'}}>Quantity</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-200">
                            <td className="p-2" style={{color: '#4B5368'}}>Deep Clean Oven</td>
                            <td className="text-right p-2 font-semibold" style={{color: '#4B5368'}}>{formData.extras?.oven || 0}</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="p-2" style={{color: '#4B5368'}}>Fridge Cleaning</td>
                            <td className="text-right p-2 font-semibold" style={{color: '#4B5368'}}>{formData.extras?.fridge || 0}</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="p-2" style={{color: '#4B5368'}}>Windows</td>
                            <td className="text-right p-2 font-semibold" style={{color: '#4B5368'}}>{formData.windows?.windows || 0}</td>
                          </tr>
                          <tr>
                            <td className="p-2" style={{color: '#4B5368'}}>Door Cleaning</td>
                            <td className="text-right p-2 font-semibold" style={{color: '#4B5368'}}>{formData.windows?.doors || 0}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Details Modal - for Modal View */}
      {isModal && showDetailsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[10000] flex items-end sm:items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-t-lg sm:rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] sm:max-h-[95vh] overflow-y-auto">
            <div className="sticky top-0 text-white px-6 sm:px-8 py-5 sm:py-6 flex justify-between items-center" style={{backgroundColor: '#48546A'}}>
              <h2 className="text-lg sm:text-2xl font-bold font-heading">Estimate Details</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-white rounded-full w-10 h-10 flex items-center justify-center transition" style={{backgroundColor: '#48546A'}} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#374151'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#48546A'}
              >
                ✕
              </button>
            </div>
            <div className="p-6 sm:p-8 space-y-4 sm:space-y-6">
              {/* Contact Information */}
              <div className="border-b border-gray-200 pb-4 sm:pb-6">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2 font-heading" style={{color: '#4B5368'}}>
                  <span className="text-xl">👤</span>
                  Contact Information
                </h3>
                <div className="space-y-2">
                  <p style={{color: '#4B5368'}}>Name: <span className="font-semibold">{formData.name || '-'}</span></p>
                  <p style={{color: '#4B5368'}}>Phone: <span className="font-semibold">{formData.telephone || '-'}</span></p>
                  <p style={{color: '#4B5368'}}>Email: <span className="font-semibold">{formData.email || '-'}</span></p>
                  <p style={{color: '#4B5368'}}>Address: <span className="font-semibold">{typeof formData.address === 'object' ? `${formData.address?.street}, ${formData.address?.city}` : formData.address || '-'}</span></p>
                </div>
              </div>

              {/* Preferences */}
              <div className="border-b border-gray-200 pb-4 sm:pb-6">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2 font-heading" style={{color: '#4B5368'}}>
                  <span className="text-xl">⚙️</span>
                  Preferences
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div><p style={{color: '#4B5368'}}>Type: <span className="font-semibold">{formData.property_type || '-'}</span></p></div>
                  <div><p style={{color: '#4B5368'}}>Service: <span className="font-semibold">{formData.service_type || '-'}</span></p></div>
                  <div><p style={{color: '#4B5368'}}>Frequency: <span className="font-semibold">{formData.frequency || '-'}</span></p></div>
                  <div><p style={{color: '#4B5368'}}>Pet Friendly: <span className="font-semibold">{formData.pet_friendly ? 'Yes' : 'No'}</span></p></div>
                </div>
              </div>

              {/* Service Details */}
              <div className="border-b border-gray-200 pb-4 sm:pb-6">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2 font-heading" style={{color: '#4B5368'}}>
                  <span className="text-xl">🏠</span>
                  Service Details
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-gray-300 bg-gray-50">
                        <th className="text-left p-2 font-semibold" style={{color: '#4B5368'}}>Room/Area</th>
                        <th className="text-right p-2 font-semibold" style={{color: '#4B5368'}}>Count</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="p-2" style={{color: '#4B5368'}}>Bedrooms</td>
                        <td className="text-right p-2 font-semibold" style={{color: '#4B5368'}}>{formData.bedrooms || 0}</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="p-2" style={{color: '#4B5368'}}>Bathrooms</td>
                        <td className="text-right p-2 font-semibold" style={{color: '#4B5368'}}>{formData.bathrooms || 0}</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="p-2" style={{color: '#4B5368'}}>En-suite</td>
                        <td className="text-right p-2 font-semibold" style={{color: '#4B5368'}}>{formData.ensuite || 0}</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="p-2" style={{color: '#4B5368'}}>Cloakroom</td>
                        <td className="text-right p-2 font-semibold" style={{color: '#4B5368'}}>{formData.cloakroom || 0}</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="p-2" style={{color: '#4B5368'}}>Staircase</td>
                        <td className="text-right p-2 font-semibold" style={{color: '#4B5368'}}>{formData.floors || 0}</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="p-2" style={{color: '#4B5368'}}>Kitchen</td>
                        <td className="text-right p-2 font-semibold" style={{color: '#4B5368'}}>{formData.kitchen || 0}</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="p-2" style={{color: '#4B5368'}}>Utility</td>
                        <td className="text-right p-2 font-semibold" style={{color: '#4B5368'}}>{formData.utility || 0}</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="p-2" style={{color: '#4B5368'}}>Living Rooms</td>
                        <td className="text-right p-2 font-semibold" style={{color: '#4B5368'}}>{formData.living_rooms || 0}</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="p-2" style={{color: '#4B5368'}}>Dining Rooms</td>
                        <td className="text-right p-2 font-semibold" style={{color: '#4B5368'}}>{formData.dining_rooms || 0}</td>
                      </tr>
                      <tr>
                        <td className="p-2" style={{color: '#4B5368'}}>Studies</td>
                        <td className="text-right p-2 font-semibold" style={{color: '#4B5368'}}>{formData.studies || 0}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Add-ons & Extras */}
              <div className="border-b border-gray-200 pb-4 sm:pb-6">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2 font-heading" style={{color: '#4B5368'}}>
                  <span className="text-xl">✨</span>
                  Add-ons & Extras
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-gray-300 bg-gray-50">
                        <th className="text-left p-2 font-semibold" style={{color: '#4B5368'}}>Service</th>
                        <th className="text-right p-2 font-semibold" style={{color: '#4B5368'}}>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="p-2" style={{color: '#4B5368'}}>Deep Clean Oven</td>
                        <td className="text-right p-2 font-semibold" style={{color: '#4B5368'}}>{formData.extras?.oven || 0}</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="p-2" style={{color: '#4B5368'}}>Fridge Cleaning</td>
                        <td className="text-right p-2 font-semibold" style={{color: '#4B5368'}}>{formData.extras?.fridge || 0}</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="p-2" style={{color: '#4B5368'}}>Windows</td>
                        <td className="text-right p-2 font-semibold" style={{color: '#4B5368'}}>{formData.windows?.windows || 0}</td>
                      </tr>
                      <tr>
                        <td className="p-2" style={{color: '#4B5368'}}>Door Cleaning</td>
                        <td className="text-right p-2 font-semibold" style={{color: '#4B5368'}}>{formData.windows?.doors || 0}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* What Happens Next Button */}
            <WhatsNextButton />
          </div>

        </div>
      )}

      {/* Pricing Modal - for Modal View */}
      {isModal && showPricingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[10000] flex items-end sm:items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-t-lg sm:rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] sm:max-h-[95vh] overflow-y-auto">
            <div className="sticky top-0 text-white px-6 sm:px-8 py-5 sm:py-6 flex justify-between items-center" style={{backgroundColor: '#48546A'}}>
              <h2 className="text-lg sm:text-2xl font-bold font-heading">Pricing Breakdown</h2>
              <button
                onClick={() => setShowPricingModal(false)}
                className="text-white rounded-full w-10 h-10 flex items-center justify-center transition" style={{backgroundColor: '#48546A'}} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#374151'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#48546A'}
              >
                ✕
              </button>
            </div>
            <div className="p-6 sm:p-8 space-y-4 sm:space-y-6">
              {/* What Comes Next */}
              <div className="border-b border-gray-200 pb-4 sm:pb-6">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2 font-heading" style={{color: '#4B5368'}}>
                  <span className="text-xl">📋</span>
                  What Comes Next
                </h3>
                <div className="space-y-3">
                  <div className="flex gap-3 items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white" style={{backgroundColor: '#48546A'}}>1</div>
                    <div>
                      <p className="font-semibold" style={{color: '#4B5368'}}>Estimate Confirmation</p>
                      <p className="text-sm" style={{color: '#4B5368'}}>Your quote has been generated and saved with all your details.</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white" style={{backgroundColor: '#48546A'}}>2</div>
                    <div>
                      <p className="font-semibold" style={{color: '#4B5368'}}>We'll Contact You</p>
                      <p className="text-sm" style={{color: '#4B5368'}}>A member of our team will reach out within 24 hours to confirm your booking and answer any questions.</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white" style={{backgroundColor: '#48546A'}}>3</div>
                    <div>
                      <p className="font-semibold" style={{color: '#4B5368'}}>Schedule Your Service</p>
                      <p className="text-sm" style={{color: '#4B5368'}}>We'll find a time that works best for you and confirm all the details of your cleaning appointment.</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white" style={{backgroundColor: '#48546A'}}>4</div>
                    <div>
                      <p className="font-semibold" style={{color: '#4B5368'}}>Professional Cleaning</p>
                      <p className="text-sm" style={{color: '#4B5368'}}>Our trained team will arrive on the scheduled date and provide the high-quality cleaning service you've selected.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* How It Works */}
              <div className="border-b border-gray-200 pb-4 sm:pb-6">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2 font-heading" style={{color: '#4B5368'}}>
                  <span className="text-xl">⚙️</span>
                  How It Works
                </h3>
                <div className="space-y-2">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-semibold text-sm" style={{color: '#4B5368'}}>Access & Key</p>
                    <p className="text-xs mt-1" style={{color: '#4B5368'}}>We'll discuss access arrangements during our confirmation call. You can provide a key or arrange to be present during the cleaning.</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-semibold text-sm" style={{color: '#4B5368'}}>Team & Equipment</p>
                    <p className="text-xs mt-1" style={{color: '#4B5368'}}>Our professional team brings all necessary cleaning equipment and supplies. We use eco-friendly products unless otherwise specified.</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-semibold text-sm" style={{color: '#4B5368'}}>Quality Guarantee</p>
                    <p className="text-xs mt-1" style={{color: '#4B5368'}}>We stand behind our work. If you're not satisfied, we're happy to address any concerns within 48 hours of your cleaning.</p>
                  </div>
                </div>
              </div>

              {/* Important Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm font-semibold mb-2" style={{color: '#4B5368'}}>📞 Need to Make Changes?</p>
                <p className="text-xs" style={{color: '#4B5368'}}>
                  If you need to modify your estimate or have any questions before we contact you, please let us know immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pricing Modal - for Page View */}
      {!isModal && showPricingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[10000] flex items-end sm:items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-t-lg sm:rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] sm:max-h-[95vh] overflow-y-auto">
            <div className="sticky top-0 text-white px-6 sm:px-8 py-5 sm:py-6 flex justify-between items-center" style={{backgroundColor: '#48546A'}}>
              <h2 className="text-lg sm:text-2xl font-bold font-heading">Pricing Breakdown</h2>
              <button
                onClick={() => setShowPricingModal(false)}
                className="text-white rounded-full w-10 h-10 flex items-center justify-center transition" style={{backgroundColor: '#48546A'}} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#374151'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#48546A'}
              >
                ✕
              </button>
            </div>
            <div className="p-6 sm:p-8 space-y-4 sm:space-y-6">
              {/* What Comes Next */}
              <div className="border-b border-gray-200 pb-4 sm:pb-6">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2 font-heading" style={{color: '#4B5368'}}>
                  <span className="text-xl">📋</span>
                  What Comes Next
                </h3>
                <div className="space-y-3">
                  <div className="flex gap-3 items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white" style={{backgroundColor: '#48546A'}}>1</div>
                    <div>
                      <p className="font-semibold" style={{color: '#4B5368'}}>Estimate Confirmation</p>
                      <p className="text-sm" style={{color: '#4B5368'}}>Your quote has been generated and saved with all your details.</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white" style={{backgroundColor: '#48546A'}}>2</div>
                    <div>
                      <p className="font-semibold" style={{color: '#4B5368'}}>We'll Contact You</p>
                      <p className="text-sm" style={{color: '#4B5368'}}>A member of our team will reach out within 24 hours to confirm your booking and answer any questions.</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white" style={{backgroundColor: '#48546A'}}>3</div>
                    <div>
                      <p className="font-semibold" style={{color: '#4B5368'}}>Schedule Your Service</p>
                      <p className="text-sm" style={{color: '#4B5368'}}>We'll find a time that works best for you and confirm all the details of your cleaning appointment.</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white" style={{backgroundColor: '#48546A'}}>4</div>
                    <div>
                      <p className="font-semibold" style={{color: '#4B5368'}}>Professional Cleaning</p>
                      <p className="text-sm" style={{color: '#4B5368'}}>Our trained team will arrive on the scheduled date and provide the high-quality cleaning service you've selected.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* How It Works */}
              <div className="border-b border-gray-200 pb-4 sm:pb-6">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2 font-heading" style={{color: '#4B5368'}}>
                  <span className="text-xl">⚙️</span>
                  How It Works
                </h3>
                <div className="space-y-2">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-semibold text-sm" style={{color: '#4B5368'}}>Access & Key</p>
                    <p className="text-xs mt-1" style={{color: '#4B5368'}}>We'll discuss access arrangements during our confirmation call. You can provide a key or arrange to be present during the cleaning.</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-semibold text-sm" style={{color: '#4B5368'}}>Team & Equipment</p>
                    <p className="text-xs mt-1" style={{color: '#4B5368'}}>Our professional team brings all necessary cleaning equipment and supplies. We use eco-friendly products unless otherwise specified.</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-semibold text-sm" style={{color: '#4B5368'}}>Quality Guarantee</p>
                    <p className="text-xs mt-1" style={{color: '#4B5368'}}>We stand behind our work. If you're not satisfied, we're happy to address any concerns within 48 hours of your cleaning.</p>
                  </div>
                </div>
              </div>

              {/* Important Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm font-semibold mb-2" style={{color: '#4B5368'}}>📞 Need to Make Changes?</p>
                <p className="text-xs" style={{color: '#4B5368'}}>
                  If you need to modify your estimate or have any questions before we contact you, please let us know immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
